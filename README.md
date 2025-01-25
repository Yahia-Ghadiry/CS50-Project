# Bandwidth Analyzer

## Video Demo

[Watch the Video Demo](https://www.youtube.com/watch?v=cpV7uTdiLvQ)

## Description

The Bandwidth Analyzer is a browser add-on designed to track and analyze bandwidth usage. This tool is particularly useful for users in countries with internet data caps, as it provides detailed insights into data consumption.

### Key Features

- **Bandwidth Tracking**: Utilizes the `webRequest` API to capture request and response details, including source URLs, request sizes, and response sizes.
- **Data Formatting**: Formats URLs into domains and adjusts dates for easier identification. Dates are converted into strings that include the year, month, weekday, day of the month, and hour.
- **Efficient Data Storage**: Employs six different "tables" to store data at various intervals (year, month, weekday, day of the month, and hour). This approach optimizes data retrieval speed by reducing the need to sum values from smaller intervals.
- **Usage Visualization**:
  - **Popup Display**: Shows monthly usage data, comparing current and past months, and daily usage based on the average of the previous 30 days.
  - **Detailed Tab**: Provides a comprehensive view of usage data, categorized by the top 3 domains or total usage within a specified time interval.
- **Customizable Charts**: The `getChartData()` function generates chart data based on specified parameters, allowing for flexible visualization of bandwidth usage.

### Technical Details

- **APIs Used**:
  - **Chart.js**: For rendering detailed charts in the detailed tab.
  - **Dexie.js**: For efficient data storage and retrieval.
- **Data Storage**: The add-on uses a multi-table approach to store bandwidth data, ensuring quick access to aggregated data while maintaining detailed records for more granular analysis.
- **Customization**: The `getChartData()` function is highly customizable, allowing users to specify the time interval, data type (total or detailed), and date offset for the charts.

### Usage

1. **Install the Add-on**: Add the Bandwidth Analyzer to your browser.
2. **Monitor Usage**: The popup will display your current and past bandwidth usage.
3. **View Detailed Reports**: Click the button in the popup to open the detailed tab, where you can see usage broken down by domain or total usage over time.
4. **Customize Charts**: Adjust the parameters in the `getChartData()` function to generate custom charts based on your needs.

### Important Notes

- **Manual Parameter Adjustment**: Currently, the parameters for `getChartData()` need to be adjusted manually in the code. There is no user interface for changing these parameters at this time.
- **Third-Party Resources**:
  - The popup button style was adapted from an external website, credited in the stylesheet.
  - The add-on icon was sourced from a free PNG website.

### Future Enhancements

- **User Interface for Chart Customization**: Plan to add a user interface for adjusting chart parameters without modifying the code.
- **Upload/Download Graph**: Consider adding a third chart type to visualize upload vs. download data.

## Credits

- **Chart.js**: For chart rendering.
- **Dexie.js**: For database management.
- **External Resources**:
  - Popup button style adapted from an external source.
  - Icon sourced from a free PNG website.

For any questions or contributions, please open an issue or submit a pull request. We welcome feedback and contributions to improve the Bandwidth Analyzer!
