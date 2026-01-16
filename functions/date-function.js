const date = new Date();

const options = {
    month: 'short', // full name of the month (e.g., "December")
    day: 'numeric', // day of the month (e.g., "20")
    year: 'numeric', // full year (e.g., "2025")
    hour: 'numeric', // hour (e.g., "5" or "5 PM")
    minute: 'numeric', // minute (e.g., "42")
    hour12: true // use 24-hour format (optional, defaults depend on locale)
};
const formattedDate = 
new Intl.DateTimeFormat('en-US', options).format(date);
// Example output for the time of this response: "December 20, 2025 at 5:42 PM"

const ALSO_THIS;

const date2 = new Date();

const formatter1 = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
});

const formatter2 = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true // Use 12-hour time with AM/PM
});

function dateOverTime() { 
        return formatter1.format(date2) + "<br>" +
               formatter2.format(date2) ; }

