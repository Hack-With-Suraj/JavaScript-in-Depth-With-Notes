// ******************** JAVASCRIPT DATE AND TIME GUIDE ********************

// ************ DATE BASICS ************

// Creating Date Objects
let now = new Date();                       // Current date and time
let specificDate = new Date("2023-01-01"); // Specific date
let dateFromParts = new Date(2023, 0, 1);   // Year, Month (0-indexed), Day
let fromTimestamp = new Date(1672531200000); // From Unix timestamp (ms)

// ************ DATE PROPERTIES ************

// Getting Date Components
now.getFullYear();   // Year (e.g., 2023)
now.getMonth();      // Month (0-11)
now.getDate();       // Day of the month (1-31)
now.getDay();        // Day of the week (0-6, Sunday is 0)
now.getHours();      // Hour (0-23)
now.getMinutes();    // Minutes (0-59)
now.getSeconds();    // Seconds (0-59)
now.getMilliseconds(); // Milliseconds (0-999)

// Unix Timestamp
now.getTime();       // Milliseconds since Jan 1, 1970

// ************ DATE MODIFICATION ************

// Setting Date Components
let futureDate = new Date();
futureDate.setFullYear(2025);
futureDate.setMonth(11);      // December
futureDate.setDate(25);       // 25th
futureDate.setHours(23, 59, 59, 999);

// Date Arithmetic
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day

// ************ DATE FORMATTING ************

// toString Methods
now.toString();              // Full date and time string
now.toDateString();          // Date only
now.toTimeString();          // Time only
now.toUTCString();           // UTC time

// ISO and Locale Formats
now.toISOString();           // ISO 8601 format
now.toLocaleString();        // Locale-specific format
now.toLocaleDateString();    // Locale-specific date
now.toLocaleTimeString();    // Locale-specific time

// ************ DATE COMPARISON ************

let date1 = new Date("2023-01-01");
let date2 = new Date("2024-01-01");

date1 < date2;               // true
(date2 - date1) / (1000 * 60 * 60 * 24);  // Days between dates

// ************ WORKING WITH TIMEZONES ************

// UTC Methods
now.getUTCFullYear();
now.getUTCMonth();

// Timezone Offset
now.getTimezoneOffset();     // Difference in minutes from UTC

// Intl.DateTimeFormat
let formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'full',
    timeStyle: 'long'
});
formatter.format(now);       // Formatted date in specified timezone

// ************ ADVANCED DATE CONCEPTS ************

// Calculating Age
function calculateAge(birthDate) {
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Days Between Dates
function daysBetween(date1, date2) {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((date2 - date1) / msPerDay);
}

// Countdown Timer
function countdown(targetDate) {
    let interval = setInterval(() => {
        let now = new Date();
        let diff = targetDate - now;
        if (diff <= 0) {
            clearInterval(interval);
            console.log("Countdown Complete!");
            return;
        }
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((diff / (1000 * 60)) % 60);
        let seconds = Math.floor((diff / 1000) % 60);
        console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
}

// ************ BEST PRACTICES ************

/*
1. Use UTC methods for time zone-agnostic calculations.
2. Prefer ISO strings for consistent formatting.
3. Avoid manually parsing dates; use built-in Date methods or libraries.
4. Be cautious of zero-based months (January is 0).
5. Use `Date.now()` for performance over `new Date().getTime()`.
*/

// ************ LIBRARIES FOR DATE HANDLING ************

// Moment.js (deprecated but popular)
// let momentDate = moment().format('YYYY-MM-DD');

// Luxon (modern alternative)
// const { DateTime } = luxon;
// let luxonDate = DateTime.now().toISO();

// date-fns (modular and modern)
// let dfnsDate = format(new Date(), 'yyyy-MM-dd');

// ************ PRACTICAL EXAMPLES ************

// 1. Get the start and end of the week
function getWeekRange(date) {
    let day = date.getDay();
    let start = new Date(date);
    start.setDate(date.getDate() - day);
    let end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
}

// 2. Check if a year is a leap year
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// 3. Add business days to a date
function addBusinessDays(date, days) {
    let result = new Date(date);
    while (days > 0) {
        result.setDate(result.getDate() + 1);
        if (result.getDay() !== 0 && result.getDay() !== 6) {
            days--;
        }
    }
    return result;
}
