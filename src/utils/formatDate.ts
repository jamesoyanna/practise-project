const FormatDate = (date: Date): string => {
    // Define an array of month abbreviations
    const months: string[] = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  
    // Define an array of day abbreviations
    const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    // Get the day of the week, month, and year from the Date object
    const dayOfWeek: string = days[date.getDay()];
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();
  
    // Get the day of the month and time from the Date object
    const dayOfMonth: number | string = date.getDate();
    let hours: number = date.getHours();
    const minutes: number = date.getMinutes();
  
    // Convert hours to 12-hour format and determine AM or PM
    const amOrPm: string = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
  
    // Add leading zero to minutes if less than 10
    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
  
    // Format the date string
    const formattedDateAndTime = `${dayOfWeek} ${dayOfMonth}, ${month} ${year} ${hours}:${formattedMinutes} ${amOrPm}`;
    // const formatedDate = `${dayOfWeek} ${dayOfMonth}, ${month} ${year}`;
    // const formattedTime = `${hours}:${formattedMinutes} ${amOrPm}`;
    
    return formattedDateAndTime;
};

export const formattedDateAndTime = (date: Date): string => {
    return FormatDate(date);
};

export const formattedDate = (date: Date): string => {
    // Define an array of month abbreviations
    const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    // Define an array of day abbreviations
    const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    // Get the day of the week, month, and year from the Date object
    const dayOfWeek: string = days[date.getDay()];
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();
  
    // Get the day of the month from the Date object
    const dayOfMonth: number = date.getDate();

    // Format the date string
    return `${dayOfWeek.slice(0, 3)}, ${month.slice(0, 3)} ${dayOfMonth} ${year}`;
};


export const formattedTime = (date: Date): string => {
    const formattedDateString = FormatDate(date);
    const timeOnly = formattedDateString.split(' ')[1]; // Extracting only the time part
    return timeOnly;
};

export default FormatDate;
