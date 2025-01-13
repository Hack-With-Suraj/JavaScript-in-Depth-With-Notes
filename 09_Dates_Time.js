// ******************** DATES AND TIME IN JAVASCRIPT ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. Basic JavaScript syntax
2. Numbers and calculations
3. Objects and methods
4. Type conversion concepts
*/

// ************ DATE FUNDAMENTALS ************

class DateBasics {
    // 1. Creating Dates
    static dateCreation() {
        return {
            current: new Date(),                    // Current date and time
            fromString: new Date('2024-01-01'),     // From date string
            fromValues: new Date(2024, 0, 1),       // From year, month(0-11), day
            fromTimestamp: new Date(1704067200000), // From Unix timestamp
            fromISO: new Date('2024-01-01T00:00:00.000Z') // From ISO string
        };
    }

    // 2. Date Components
    static dateComponents(date) {
        return {
            year: date.getFullYear(),      // Full year (e.g., 2024)
            month: date.getMonth(),        // Month (0-11)
            day: date.getDate(),           // Day of month (1-31)
            hours: date.getHours(),        // Hours (0-23)
            minutes: date.getMinutes(),    // Minutes (0-59)
            seconds: date.getSeconds(),    // Seconds (0-59)
            milliseconds: date.getMilliseconds(), // Milliseconds (0-999)
            dayOfWeek: date.getDay()       // Day of week (0-6, 0 = Sunday)
        };
    }

    // 3. Timestamps
    static timestampMethods() {
        return {
            now: Date.now(),               // Current timestamp in milliseconds
            valueOf: new Date().valueOf(),  // Date to timestamp
            parse: Date.parse('2024-01-01') // Parse date string to timestamp
        };
    }
}

// ************ DATE MANIPULATION ************

class DateManipulation {
    // 1. Setting Date Components
    static setComponents(date) {
        const newDate = new Date(date);
        newDate.setFullYear(2025);
        newDate.setMonth(6);      // July
        newDate.setDate(15);
        newDate.setHours(12);
        newDate.setMinutes(30);
        newDate.setSeconds(0);
        return newDate;
    }

    // 2. Date Arithmetic
    static dateCalculations(date) {
        // Add days
        const addDays = (days) => {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        };

        // Add months
        const addMonths = (months) => {
            const result = new Date(date);
            result.setMonth(result.getMonth() + months);
            return result;
        };

        // Add years
        const addYears = (years) => {
            const result = new Date(date);
            result.setFullYear(result.getFullYear() + years);
            return result;
        };

        return { addDays, addMonths, addYears };
    }

    // 3. Date Comparison
    static dateComparison(date1, date2) {
        return {
            equals: date1.getTime() === date2.getTime(),
            before: date1 < date2,
            after: date1 > date2,
            diffInDays: Math.floor((date2 - date1) / (1000 * 60 * 60 * 24))
        };
    }
}

// ************ DATE FORMATTING ************

class DateFormatting {
    // 1. Built-in Formatting
    static builtInFormats(date) {
        return {
            toString: date.toString(),
            toDateString: date.toDateString(),
            toTimeString: date.toTimeString(),
            toLocaleString: date.toLocaleString(),
            toLocaleDateString: date.toLocaleDateString(),
            toLocaleTimeString: date.toLocaleTimeString(),
            toISOString: date.toISOString(),
            toUTCString: date.toUTCString()
        };
    }

    // 2. Custom Formatting
    static formatDate(date, format) {
        const pad = (num) => String(num).padStart(2, '0');
        
        const formats = {
            YYYY: date.getFullYear(),
            MM: pad(date.getMonth() + 1),
            DD: pad(date.getDate()),
            HH: pad(date.getHours()),
            mm: pad(date.getMinutes()),
            ss: pad(date.getSeconds())
        };

        return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => formats[match]);
    }

    // 3. Internationalization
    static internationalFormats(date) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        return {
            us: new Intl.DateTimeFormat('en-US', options).format(date),
            uk: new Intl.DateTimeFormat('en-GB', options).format(date),
            japan: new Intl.DateTimeFormat('ja-JP', options).format(date)
        };
    }
}

// ************ TIMEZONE HANDLING ************

class TimezoneHandling {
    // 1. Timezone Conversions
    static timezoneConversion(date) {
        return {
            utcOffset: date.getTimezoneOffset(),
            toUTC: new Date(date.getTime() + date.getTimezoneOffset() * 60000),
            fromUTC: new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        };
    }

    // 2. Timezone-aware Operations
    static timezoneMethods(date) {
        return {
            utcComponents: {
                year: date.getUTCFullYear(),
                month: date.getUTCMonth(),
                day: date.getUTCDate(),
                hours: date.getUTCHours(),
                minutes: date.getUTCMinutes()
            },
            localComponents: {
                year: date.getFullYear(),
                month: date.getMonth(),
                day: date.getDate(),
                hours: date.getHours(),
                minutes: date.getMinutes()
            }
        };
    }

    // 3. Working with Specific Timezones
    static formatWithTimezone(date, timezone) {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'long'
        }).format(date);
    }
}

// ************ PRACTICAL APPLICATIONS ************

// 1. Date Utility Class
class DateUtility {
    static isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    static getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    static getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    static getQuarter(date) {
        return Math.floor(date.getMonth() / 3) + 1;
    }
}

// 2. Date Range Class
class DateRange {
    constructor(startDate, endDate) {
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
    }

    contains(date) {
        return date >= this.startDate && date <= this.endDate;
    }

    getDays() {
        return Math.floor((this.endDate - this.startDate) / (1000 * 60 * 60 * 24)) + 1;
    }

    *[Symbol.iterator]() {
        for(let date = new Date(this.startDate); 
            date <= this.endDate; 
            date.setDate(date.getDate() + 1)) {
            yield new Date(date);
        }
    }
}

// 3. Calendar Builder
class CalendarBuilder {
    static buildMonthCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const calendar = [];
        
        // Add empty cells for days before first of month
        let week = Array(firstDay.getDay()).fill(null);
        
        // Fill in days of month
        for(let day = 1; day <= lastDay.getDate(); day++) {
            week.push(day);
            if(week.length === 7) {
                calendar.push(week);
                week = [];
            }
        }
        
        // Fill in remaining cells
        if(week.length > 0) {
            calendar.push(week.concat(Array(7 - week.length).fill(null)));
        }
        
        return calendar;
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of JavaScript Date object
2. Mastery of date manipulation
3. Timezone handling capabilities
4. Practical date utilities

NEXT STEPS:
1. Practice date calculations
2. Implement calendar features
3. Study timezone complexities
4. Move on to DOM Manipulation (10_DOM.js)

INTERVIEW PREPARATION:
1. Study common date operations
2. Practice timezone conversions
3. Understand date arithmetic
4. Master date formatting
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        DateBasics,
        DateManipulation,
        DateFormatting,
        TimezoneHandling,
        DateUtility,
        DateRange,
        CalendarBuilder
    };
} 