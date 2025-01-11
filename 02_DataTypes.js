// ******************** PRIMITIVE DATA TYPES ********************
// These are basic data types that store single values

// 1. Number
let age = 25                  // Regular numbers
let price = 99.99            // Decimal numbers
let temperature = -5         // Negative numbers

// 2. String - Text data (can use single or double quotes)
let name = "John"            // Double quotes
let email = 'john@email.com' // Single quotes
let message = `Hello`        // Backticks (template literals)

// 3. Boolean - true/false values
let isLoggedIn = true
let hasPermission = false

// 4. null - Intentional absence of value
let userResponse = null      // Explicitly set to nothing

// 5. undefined - Variable declared but not assigned
let userAddress             // Value is undefined

// 6. Symbol - Unique identifier
let uniqueId = Symbol('id')  // Each Symbol is unique

// 7. BigInt - Large numbers
let bigNumber = 9007199254740991n // Add 'n' for BigInt


// ******************** NON-PRIMITIVE (REFERENCE) DATA TYPES ********************
// These store references to values in memory

// 1. Object - Objects in JavaScript are collections of key-value pairs, where the keys are properties and the values can be of any data type. They are used to represent real-world entities or abstract concepts.
let person = {
    name: "John",
    age: 30,
    city: "New York"
}

// 2. Array - Ordered collection of values
let colors = ["red", "green", "blue"]
let mixedArray = [1, "hello", true, null] // Can store different types

// 3. Function - Reusable block of code
function greet() {
    console.log("Hello!")
}

// ******************** CHECKING DATA TYPES ********************
// Use typeof operator to check data type
console.log(typeof 42)          // "number"
console.log(typeof "hello")     // "string"
console.log(typeof true)        // "boolean"
console.log(typeof undefined)   // "undefined"
console.log(typeof null)        // "object" (This is a known JavaScript quirk!)
console.log(typeof {})          // "object"
console.log(typeof [])          // "object" (Arrays are objects in JavaScript)
console.log(typeof function () { }) // "function"

// ******************** BEST PRACTICES ********************
// 1. Type Consistency
// Keep variable types consistent throughout their lifetime
let score = 100        // Start with number
// score = "hundred"   // Avoid changing to different type

// 2. Null Checking
// Always check for null/undefined when working with objects
if (person && person.name) {
    console.log(person.name)
}

// 3. Array Type Consistency
// Try to keep array elements of the same type
let numbers = [1, 2, 3, 4] // Good: all numbers
// let mixed = [1, "two", true] // Avoid: mixed types unless necessary

// ******************** THINGS TO AVOID ********************
// 1. Avoid implicit type conversion
// BAD:
let result = "5" + 3   // "53" (string concatenation)
// GOOD:
let result2 = Number("5") + 3  // 8 (explicit conversion)

// 2. Avoid undefined comparisons
// BAD:
if (variable === undefined) { }
// GOOD:
if (typeof variable === "undefined") { }

// 3. Avoid direct null comparisons
// BAD:
if (value == null) { }
// GOOD:
if (value === null) { } // Use strict equality

// ******************** CONCLUSION ********************
/*
1. Primitive types are immutable (cannot be changed) and store actual values
2. Non-primitive types are mutable and store references
3. Always use strict equality (===) for comparisons
4. Be consistent with data types in your variables
5. Be careful with type coercion (automatic type conversion)
6. Use appropriate data types for your needs:
   - Numbers for calculations
   - Strings for text
   - Booleans for flags/conditions
   - Objects for structured data
   - Arrays for lists
   - null for intentional absence
   - undefined should be avoided in assignments
*/

// ******************** MEMORY BEHAVIOR ********************
/*
Primitive: Stored directly in memory location (Stack)
Reference: Stored as reference to memory location (Heap)

This affects how they are copied and compared:
- Primitives are copied by value
- Reference types are copied by reference
*/ 




