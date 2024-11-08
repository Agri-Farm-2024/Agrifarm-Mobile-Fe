const api = `https://api.agrifarm.site`;

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
  const date = new Date(isoString);
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; 
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${minutesFormatted} ${ampm}`;
}

// 2024-11-07T11:21:22.263Z  => 07/11/2024
export function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Example usage
const formattedDate = formatDateToDDMMYYYY("2024-11-07T11:21:22.263Z");
console.log(formattedDate); // Output: "07/11/2024"

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
