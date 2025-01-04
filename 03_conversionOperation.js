// ******************** TYPE CONVERSIONS ********************

// 1. STRING CONVERSION
// Converting different types to strings
let stringConversion = {
    // Using String() function
    number: String(42),          // "42"
    boolean: String(true),       // "true"
    null: String(null),          // "null"
    undefined: String(undefined) // "undefined"
}

// Alternative: Using toString() method
let num = 123
let strNum = num.toString()      // "123"

// Using + operator with empty string
let autoString = 42 + ""         // "42"


// 2. NUMBER CONVERSION
// Converting different types to numbers
let numberConversion = {
    // Using Number() function
    string: Number("123"),       // 123
    emptyString: Number(""),     // 0
    booleanTrue: Number(true),   // 1
    booleanFalse: Number(false), // 0
    null: Number(null),          // 0
    undefined: Number(undefined) // NaN
}


// Common Number Conversion Results
let numberExamples = {
    validNumber: Number("123"),      // 123
    decimal: Number("12.34"),        // 12.34
    invalid: Number("123abc"),       // NaN
    whitespace: Number("  123  "),   // 123 (trims whitespace)
    empty: Number(""),               // 0
    nonNumeric: Number("hello")      // NaN
}


// Alternative number conversions
let parseExamples = {
    parseInt: parseInt("123.45"),    // 123 (removes decimal)
    parseFloat: parseFloat("123.45") // 123.45 (keeps decimal)
}

// Unary plus operator
let unaryPlus = +"123"              // 123


// 3. BOOLEAN CONVERSION
// Converting different types to boolean
let booleanConversion = {
    // Using Boolean() function
    truthy: {
        nonZeroNumber: Boolean(42),      // true
        nonEmptyString: Boolean("hello"), // true
        object: Boolean({}),              // true
        array: Boolean([]),               // true
    },
    falsy: {
        zero: Boolean(0),                 // false
        emptyString: Boolean(""),         // false
        null: Boolean(null),              // false
        undefined: Boolean(undefined),     // false
        NaN: Boolean(NaN)                 // false
    }
}

// Double NOT operator (!!) for boolean conversion
let boolValue = !!"hello"           // true


// ******************** OPERATIONS AND TYPE COERCION ********************

// 1. ARITHMETIC OPERATIONS
let arithmetic = {
    addition: 5 + 3,        // 8
    subtraction: 5 - 3,     // 2
    multiplication: 5 * 3,  // 15
    division: 6 / 2,        // 3
    modulus: 7 % 3,        // 1 (remainder)
    exponentiation: 2 ** 3  // 8 (2³)
}

// 2. STRING CONCATENATION VS ADDITION
// String concatenation takes precedence over addition
let stringMath = {
    stringFirst: "1" + 2 + 2,   // "122" (left to right)
    numberFirst: 1 + 2 + "2",   // "32" (left to right)
    withSpaces: "Hello " + "World" // "Hello World"
}

// 3. COMPARISON OPERATIONS
let comparisons = {
    // Regular comparison
    numberCompare: 5 > 3,           // true
    stringCompare: "apple" < "banana", // true (lexicographical)
    
    // Type coercion in comparisons
    looseEquality: 5 == "5",        // true (converts types)
    strictEquality: 5 === "5",      // false (no type conversion)
    
    // Mixed type comparisons
    mixedCompare: "3" > 2           // true (converts string to number)
}

// ******************** BEST PRACTICES ********************

// 1. Always use explicit conversion when type conversion is needed
let score = "100"
let actualScore = Number(score)      // Better than implicit conversion

// 2. Use strict equality (===) instead of loose equality (==)
if (5 === "5") {                     // Better comparison
    console.log("This won't run")
}

// 3. Be careful with addition when mixing strings and numbers
let value = 5
let text = "10"
let explicit = value + Number(text)   // Better than value + text

// ******************** THINGS TO AVOID ********************

// 1. Avoid implicit type coercion
// BAD:
let result = "5" - 2    // Implicit conversion

// GOOD:
let result2 = Number("5") - 2  // Explicit conversion

// 2. Avoid loose equality (==)
// BAD:
if (1 == "1") {}

// GOOD:
if (1 === 1) {}

// 3. Avoid confusing concatenation
// BAD:
let mixed = 1 + "2" + 3  // Results in "123"

// GOOD:
let clear = String(1) + String(2) + String(3)  // Intention is clear

// ******************** CONCLUSION ********************
/*
1. Always use explicit type conversion (String(), Number(), Boolean())
2. Understand that type coercion can lead to unexpected results
3. Use strict equality (===) for comparisons
4. Be careful with operations involving different types
5. Remember that some conversions can result in NaN or unexpected values
6. String concatenation and numeric addition can be tricky
7. When in doubt, convert types explicitly before operations
*/

// ******************** COMMON GOTCHAS ********************
console.log([] + [])         // "" (empty string)
console.log([] + {})         // "[object Object]"
console.log({} + [])         // "[object Object]"
console.log({} + {})         // "[object Object][object Object]"
console.log(true + true)     // 2
console.log(true + false)    // 1
console.log(10 - "5")        // 5 (numeric subtraction)
console.log("10" - "5")      // 5 (numeric subtraction) 