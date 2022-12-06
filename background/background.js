const intervals = ["year", "month", "week_day", "day", "hour"]


// recursive function so all usage from a frames of a website will be added to same url not to the frame's
function findOrginOfFrame(requestDetails)
{
    if (requestDetails["frameId"])
    {
        return findOrginOfFrame(requestDetails.frameAncestors[0]);
    }
    else
    {
        if (requestDetails["originUrl"])
        {
            return (new URL(requestDetails["originUrl"])).hostname;
        }
        else
        {
            return (new URL(requestDetails["url"])).hostname;
        }
    }
}


// Formats request details so that it removes uncessary details and keeping usefull data in an orginzed way to be easy accisable
function format(requestDetails)
{
    let formatedRecord = {};
    formatedRecord["request_size"] = requestDetails["requestSize"];
    formatedRecord["response_size"] = requestDetails["responseSize"];

    formatedRecord["domain"] = findOrginOfFrame(requestDetails)
    // Formating the date so it's easily searchable
    formatedRecord["time"] = {};
    const date = new Date(requestDetails["timeStamp"]);
    const year = date.getFullYear().toString();
    // tmprearru to simulate privase day usage
    const month = date.getMonth().toString();
    const week_day = date.getDay().toString();
    const day = date.getDate().toString();
    const hour = date.getHours().toString();


    // TODO: add a way to change month beging
    // maybe add a new store where it has only 
    // months and records based on a change

    formatedRecord["time"]["year"] = year;
    formatedRecord["time"]["month"] = year + month;
    formatedRecord["time"]["week_day"] = year + month + week_day;
    formatedRecord["time"]["day"] = year + month + week_day + day;
    formatedRecord["time"]["hour"] = year + month + week_day + day + hour;

    return formatedRecord;
}


var db = new Dexie('hrlp');

db.version(1).stores(
{
    year: '++id, time.year, [domain+time.year]',
    month: '++id, time.month, [domain+time.month]',
    week_day: '++id, time.week_day, [domain+time.week_day]',
    day: '++id, time.day, [domain+time.day]',
    hour: '++id, time.hour, [domain+time.hour]'
});
const tables = [db.year, db.month, db.week_day, db.day, db.hour];
db.month.bulkPut([
    {domain: "Josephine", time: {month: 21}, name: "Per", age: 75 },
    {name: "Per", age: 75 },
  ])


// Stores all trafic/usage
async function storeData(requestDetails)
{

    if (requestDetails.requestSize != 0 || requestDetails.responseSize != 0)
    {
        const formated = format(requestDetails);
        tables.forEach(async (table, index) =>
        {


            // Checks if recored of same domain near same time (5 min) is there if so updates it and doesn't make a new one 
            const checkifexist = await table.where(["domain", "time."+ intervals[index]]).equals([formated.domain, formated["time"][intervals[index]]]).first();
            if (checkifexist)
            {
                checkifexist.request_size += formated["request_size"];
                checkifexist.response_size += formated["response_size"];
                await table.put(checkifexist);
                console.log("found");
            }
            else
            {
                await table.add(formated);
                console.log("not found");
            }
            
        });
    }


}
browser.webRequest.onCompleted.addListener(
    storeData,
    {
        urls: ["<all_urls>"]
    }, ["responseHeaders"]
);