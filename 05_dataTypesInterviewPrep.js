// ******************** JAVASCRIPT DATA TYPES INTERVIEW GUIDE ********************

// ************ BASIC CONCEPT QUESTIONS ************

// Q1: What are the primitive data types in JavaScript?
let primitiveTypes = {
    number: 42,
    string: "Hello",
    boolean: true,
    undefined: undefined,
    null: null,
    symbol: Symbol("id"),
    bigint: 9007199254740991n
}

// Q2: What's the difference between null and undefined?
let nullVsUndefined = {
    undefined: undefined,  // Variable declared but not assigned
    null: null           // Intentional absence of value
}

// Practical Example
function findUser(id) {
    // Returns null if user not found (intentional)
    // Returns undefined if id parameter not provided (unintentional)
    if (!id) return undefined;
    return database.find(id) || null;
}

// ************ PRACTICAL INTERVIEW QUESTIONS ************

// Q1: What will be the output and why?
console.log(typeof null);        // "object" - JavaScript bug/quirk
console.log(typeof undefined);   // "undefined"
console.log(typeof NaN);         // "number"

// Q2: Check if value is array
let array = [1, 2, 3];
// Different methods to check:
console.log(Array.isArray(array));              // true
console.log(array instanceof Array);            // true
console.log(Object.prototype.toString.call(array) === '[object Array]'); // true

// Q3: Type coercion examples
console.log(1 + "2");           // "12" (string concatenation)
console.log(1 - "2");           // -1 (numeric subtraction)
console.log("2" * "3");         // 6 (numeric multiplication)

// ************ ADVANCED CONCEPTS AND QUESTIONS ************

// Q1: Implement deep copy function
function deepCopy(obj) {
    // Handle primitive types
    if (obj === null || typeof obj !== 'object') return obj;
    
    // Handle Date objects
    if (obj instanceof Date) return new Date(obj);
    
    // Handle Array objects
    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item));
    }
    
    // Handle Object literals
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, deepCopy(value)])
    );
}

// Test deep copy
let original = {
    name: "John",
    age: 30,
    hobbies: ["reading", "music"],
    address: {
        city: "New York",
        country: "USA"
    }
};

let copied = deepCopy(original);

// Q2: Type checking utility function
function getDetailedType(value) {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (value instanceof Date) return 'date';
    return typeof value;
}

// ************ REAL-WORLD SCENARIOS ************

// Scenario 1: Form Validation
function validateUserInput(userInput) {
    let errors = [];
    
    // Type checking
    if (typeof userInput.age !== 'number') {
        errors.push('Age must be a number');
    }
    
    if (typeof userInput.email !== 'string') {
        errors.push('Email must be a string');
    }
    
    // Value validation
    if (userInput.age < 0 || userInput.age > 120) {
        errors.push('Invalid age range');
    }
    
    return errors;
}

// Scenario 2: API Response Handling
function handleApiResponse(response) {
    // Check if response exists
    if (response === null || response === undefined) {
        throw new Error('No response received');
    }
    
    // Check if response is array
    if (Array.isArray(response)) {
        return response.map(item => processItem(item));
    }
    
    // Check if response is object
    if (typeof response === 'object') {
        return processObject(response);
    }
    
    throw new Error('Invalid response format');
}

// ************ COMMON INTERVIEW TRICKY QUESTIONS ************

// Q1: What's the output?
console.log([] + []);           // "" (empty string)
console.log([] + {});           // "[object Object]"
console.log({} + []);           // "[object Object]"
console.log({} + {});           // "[object Object][object Object]"

// Q2: Type coercion challenges
console.log(true + true);       // 2
console.log(true + false);      // 1
console.log(false + false);     // 0

// Q3: NaN comparisons
console.log(NaN === NaN);       // false
console.log(Object.is(NaN, NaN));// true

// ************ BEST PRACTICES AND TIPS ************

/*
1. Type Checking Best Practices:
   - Use typeof for primitive types
   - Use instanceof for custom objects
   - Use Array.isArray() for arrays
   - Use Object.prototype.toString.call() for precise type checking

2. Common Pitfalls to Avoid:
   - Don't use == for comparison (use === instead)
   - Don't rely on type coercion
   - Don't compare directly with NaN
   - Don't assume typeof null === 'null'

3. Interview Tips:
   - Always explain your reasoning
   - Mention edge cases
   - Discuss performance implications
   - Show knowledge of type coercion rules
*/

// ************ PRACTICE EXERCISES ************

// Exercise 1: Implement type-safe equality comparison
function safeEqual(val1, val2) {
    // Handle null and undefined
    if (val1 === null || val2 === null) {
        return val1 === val2;
    }
    
    // Handle NaN
    if (Number.isNaN(val1) && Number.isNaN(val2)) {
        return true;
    }
    
    // Handle primitives
    if (typeof val1 !== 'object' && typeof val2 !== 'object') {
        return val1 === val2;
    }
    
    // Handle arrays
    if (Array.isArray(val1) && Array.isArray(val2)) {
        return val1.length === val2.length &&
               val1.every((item, index) => safeEqual(item, val2[index]));
    }
    
    // Handle objects
    return JSON.stringify(val1) === JSON.stringify(val2);
}

// Exercise 2: Implement type conversion utility
function convertTo(value, type) {
    switch(type) {
        case 'number':
            return Number(value);
        case 'string':
            return String(value);
        case 'boolean':
            return Boolean(value);
        case 'array':
            return Array.from(value);
        default:
            throw new Error('Unsupported type conversion');
    }
}

// ************ REAL INTERVIEW QUESTIONS WITH SOLUTIONS ************

/*
Q: Explain the difference between shallow and deep copy with example.
A: 
- Shallow copy copies references
- Deep copy copies values recursively
*/

// Shallow copy example
let obj = {a: 1, b: {c: 2}};
let shallow = {...obj};
obj.b.c = 3;
console.log(shallow.b.c); // 3 (reference was copied)

// Deep copy example
let deep = JSON.parse(JSON.stringify(obj));
obj.b.c = 4;
console.log(deep.b.c); // 3 (value was copied)

/*
Q: How would you check if a value is an integer?
A: Multiple approaches available
*/

function isInteger(value) {
    // Method 1
    return Number.isInteger(value);
    
    // Method 2
    return typeof value === 'number' && value % 1 === 0;
    
    // Method 3
    return Math.floor(value) === value;
} 