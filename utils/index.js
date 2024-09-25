//Format number
export function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
