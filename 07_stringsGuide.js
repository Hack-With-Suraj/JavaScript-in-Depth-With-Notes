// ******************** JAVASCRIPT STRINGS GUIDE ********************

// ************ STRING BASICS ************

// String Creation Methods
let str1 = "Hello";                  // Using double quotes
let str2 = 'World';                  // Using single quotes
let str3 = `Hello ${str2}`;          // Using template literals
let str4 = String(123);              // Using String constructor
let str5 = new String("Hello");      // Using new String() (not recommended)

// ************ STRING PROPERTIES ************

// 1. Length
const strLength = "Hello".length;     // 5

// ************ COMMON STRING METHODS ************

// 1. Case Methods
let caseExample = "Hello World";
caseExample.toLowerCase();            // "hello world"
caseExample.toUpperCase();            // "HELLO WORLD"

// 2. Trim Methods
let trimExample = "  Hello  ";
trimExample.trim();                   // "Hello"
trimExample.trimStart();              // "Hello  "
trimExample.trimEnd();                // "  Hello"

// 3. Search Methods
let searchStr = "Hello World";
searchStr.indexOf("World");           // 6
searchStr.lastIndexOf("o");           // 7
searchStr.includes("Hello");          // true
searchStr.startsWith("He");           // true
searchStr.endsWith("ld");             // true
searchStr.search(/World/);            // 6

// 4. Extraction Methods
let extractStr = "Hello World";
extractStr.slice(0, 5);               // "Hello"
extractStr.substring(6, 11);          // "World"
extractStr.substr(6, 5);              // "World" (deprecated)
extractStr.charAt(0);                 // "H"
extractStr.charCodeAt(0);             // 72 (ASCII value)

// 5. Modification Methods
let modifyStr = "Hello";
modifyStr.concat(" World");           // "Hello World"
modifyStr.replace("Hello", "Hi");     // "Hi"
modifyStr.replaceAll("l", "L");       // "HeLLo"
modifyStr.padStart(10, "*");          // "*****Hello"
modifyStr.padEnd(10, "*");            // "Hello*****"
modifyStr.repeat(2);                  // "HelloHello"

// 6. Split and Join
let splitStr = "Hello,World";
splitStr.split(",");                  // ["Hello", "World"]
["Hello", "World"].join(" ");         // "Hello World"

// ************ ADVANCED STRING CONCEPTS ************

// 1. String Templates
function stringTemplate(name, age) {
    return `Name: ${name}, Age: ${age}`;
}

// 2. Tagged Templates
function tag(strings, ...values) {
    return strings.reduce((result, str, i) => 
        `${result}${str}${values[i] || ''}`, '');
}
const tagged = tag`Hello ${str1} ${str2}`;

// 3. Unicode and Emoji
const emoji = "😀";
emoji.length;                         // 2 (surrogate pairs)
[...emoji].length;                    // 1 (actual length)

// ************ INTERVIEW QUESTIONS ************

// Q1: Reverse a string
function reverseString(str) {
    // Method 1: Using array methods
    return str.split('').reverse().join('');
    
    // Method 2: Using spread operator
    return [...str].reverse().join('');
    
    // Method 3: Using loop (most efficient)
    let reversed = '';
    for (let char of str) {
        reversed = char + reversed;
    }
    return reversed;
}

// Q2: Check if string is palindrome
function isPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return str === str.split('').reverse().join('');
}

// Q3: Count character occurrences
function countOccurrences(str, char) {
    return str.split(char).length - 1;
    // Alternative: return (str.match(new RegExp(char, 'g')) || []).length;
}

// Q4: Find first non-repeating character
function firstNonRepeatingChar(str) {
    for (let char of str) {
        if (str.indexOf(char) === str.lastIndexOf(char)) {
            return char;
        }
    }
    return null;
}

// ************ PRACTICAL EXAMPLES ************

// 1. Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 2. URL Parsing
function parseURL(url) {
    try {
        const urlObj = new URL(url);
        return {
            protocol: urlObj.protocol,
            hostname: urlObj.hostname,
            pathname: urlObj.pathname,
            search: urlObj.search
        };
    } catch (e) {
        return null;
    }
}

// 3. String Formatting
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ************ ADVANCED INTERVIEW QUESTIONS ************

// Q1: Implement string compression
function compressString(str) {
    let compressed = '';
    let count = 1;
    
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            compressed += str[i] + count;
            count = 1;
        }
    }
    
    return compressed.length < str.length ? compressed : str;
}

// Q2: Find longest common prefix
function longestCommonPrefix(strs) {
    if (!strs.length) return '';
    
    for (let i = 0; i < strs[0].length; i++) {
        for (let j = 1; j < strs.length; j++) {
            if (strs[j][i] !== strs[0][i]) {
                return strs[0].slice(0, i);
            }
        }
    }
    return strs[0];
}

// Q3: Implement string pattern matching
function isMatch(str, pattern) {
    const dp = Array(str.length + 1).fill()
        .map(() => Array(pattern.length + 1).fill(false));
    dp[0][0] = true;
    
    // Implementation of wildcard pattern matching
    // This is a common interview question
    return dp[str.length][pattern.length];
}

// ************ BEST PRACTICES ************

/*
1. String Performance:
   - Use StringBuilder pattern for large concatenations
   - Avoid creating unnecessary string objects
   - Use appropriate methods for the task

2. Common Mistakes to Avoid:
   - Don't use new String()
   - Be careful with string mutations (strings are immutable)
   - Watch out for encoding issues
   - Consider memory usage with large strings

3. Interview Tips:
   - Understand string immutability
   - Know common methods and their time complexity
   - Be familiar with regex
   - Consider edge cases
   - Think about performance implications
*/

// ************ STRING BUILDER PATTERN ************
class StringBuilder {
    constructor() {
        this.strings = [];
    }
    
    append(str) {
        this.strings.push(str);
        return this;
    }
    
    toString() {
        return this.strings.join('');
    }
}

// ************ PRACTICAL USAGE EXAMPLES ************

// 1. Template Engine
function simpleTemplate(template, data) {
    return template.replace(/\${(\w+)}/g, (_, key) => data[key] || '');
}

// 2. String Sanitization
function sanitizeString(str) {
    return str
        .replace(/[^\w\s]/gi, '')    // Remove special characters
        .trim()                       // Remove extra spaces
        .toLowerCase();               // Convert to lowercase
}

// 3. String Search with Context
function findWithContext(text, search, contextLength = 20) {
    const index = text.toLowerCase().indexOf(search.toLowerCase());
    if (index === -1) return null;
    
    const start = Math.max(0, index - contextLength);
    const end = Math.min(text.length, index + search.length + contextLength);
    
    return text.slice(start, end);
} 