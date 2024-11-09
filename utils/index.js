const api = `https://api.agrifarm.site`;

//Format number
export function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Format date
export function formatDate(timestamp, formatType) {
  const date = new Date(timestamp);
  if (formatType === 0) {
    // Format to "DD/MM/YYYY"
    const formattedDDMMYYYY = date.toLocaleDateString("en-GB");
    return formattedDDMMYYYY;
  } else if (formatType === 1) {
    // Format to "YYYY/MM/DD"
    const formattedYYYYMMDD = date.toLocaleDateString("en-CA");
    return formattedYYYYMMDD;
  } else {
    return timestamp;
  }
}

//Calculate number of months between two timestamp
export function calculateMonthsBetween(date1, date2) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  if (startDate > endDate) {
    // Swap dates if startDate is later
    [startDate, endDate] = [endDate, startDate];
  }

  const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
  const monthsDifference = endDate.getMonth() - startDate.getMonth();

  let totalMonthsDifference = yearsDifference * 12 + monthsDifference;

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const dayDifference = endDay - startDay;

  // If the day difference is greater or equal 0 will add an extra month
  if (dayDifference >= 0) {
    totalMonthsDifference = totalMonthsDifference + 1;
  }

  return totalMonthsDifference;
}

//Shorten string
export function shortenText(description, limit) {
  // Check if the description is already within the limit
  if (description.length <= limit) {
    return description;
  }

  // Cut the text to the limit and add "..."
  return description.slice(0, limit) + "...";
}

// CONVERT HTTP TO HTTPS
export function convertHttpToHttps(url) {
  if (url && url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
}

// 2024-06-09T03:11:56.622Z to  Output: "3:11 AM"
export function convertTo12HourFormat(isoString) {
  // Create a Date object from the ISO string
  const date = new Date(isoString);

  // Get the hours and minutes
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to always have two digits
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;

  // Return the formatted time
  return `${hours}:${minutesFormatted} ${ampm}`;
}
//Functions will reuse here

// 1200000 to 1.200.000
export function formatNumberToVND(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function convertImageURL(relativePath) {
  const formattedPath = relativePath.startsWith("/")
    ? relativePath
    : `/${relativePath}`;
  return `${api}${formattedPath}`;
}
