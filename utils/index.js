const api = `https://api.agrifarm.site`;

//Format number
export function formatNumber(number) {
  const numberformated = number
    ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : number;
  return numberformated;
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
  } else if (formatType === 2) {
    // Format to "DD/MM"
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
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

// 2024-11-07T11:21:22.263Z  => Ngày 7 tháng 11 năm 2024
export function formatDateToVN(isoDateString) {
  const date = new Date(isoDateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `Ngày ${day} tháng ${month} năm ${year}`;
}

// 1200000 to 1.200.000
export function formatNumberToVND(number) {
  if (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return number;
}

// export function convertImageURL(relativePath) {
//   const formattedPath = relativePath.startsWith("/")
//     ? relativePath
//     : `/${relativePath}`;
//   return `${api}${formattedPath}`;
// }

export function convertImageURL(relativePath) {
  console.log(relativePath);
  return `${api}${relativePath}`;
}

//compare the date with current date to exact the future date
export const isFutureDate = (date1) => {
  const dateObj1 = new Date(date1);
  const currentDate = Date.now();
  console.log("date1: " + date1);
  if (dateObj1 > currentDate) {
    console.log("Date in future");
    return true;
  } else {
    return false;
  }
  return false;
};

export function capitalizeFirstLetter(string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
}

export function formatTimeViewLand(timestamp) {
  if (!timestamp) {
    return timestamp;
  }
  const date = new Date(timestamp);
  // Format time
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC", // Adjust if needed
  };
  const time = date.toLocaleTimeString("en-GB", optionsTime);
  // Format date
  const formattedDate = date.toLocaleDateString("en-GB");
  return `${time} - ${formattedDate}`;
}
