// ******************** JAVASCRIPT OPERATORS GUIDE ********************

// 1. ARITHMETIC OPERATORS
// Basic math operations
let x = 2 
let arithmetic = {
    addition: 5 + 3,        // 8    (adds numbers)
    subtraction: 5 - 3,     // 2    (subtracts numbers)
    multiplication: 5 * 3,  // 15   (multiplies numbers)
    division: 6 / 2,        // 3    (divides numbers)
    modulus: 7 % 3,        // 1    (returns division remainder)
    exponentiation: 2 ** 3, // 8    (2³ power operation)
    increment: ++x,         // Increases value by 1 (prefix)
    postIncrement: x++,     // Increases value by 1 (postfix)
    decrement: --x,         // Decreases value by 1 (prefix)
    postDecrement: x--      // Decreases value by 1 (postfix)
}



// 2. ASSIGNMENT OPERATORS
let assignment = {
    basic: 'x = 5',         // Basic assignment
    addition: 'x += 5',     // x = x + 5
    subtraction: 'x -= 5',  // x = x - 5
    multiplication: 'x *= 5',// x = x * 5
    division: 'x /= 5',     // x = x / 5
    modulus: 'x %= 5',      // x = x % 5
    exponentiation: 'x **= 5'// x = x ** 5
}

// 3. COMPARISON OPERATORS
let comparison = {
    // Equality Comparisons
    looseEqual: 5 == "5",       // true  (converts types)
    strictEqual: 5 === "5",     // false (checks type and value)
    looseNotEqual: 5 != "6",    // true  (converts types)
    strictNotEqual: 5 !== "5",  // true  (checks type and value)
    
    // Relational Comparisons
    greaterThan: 5 > 3,         // true
    lessThan: 5 < 8,            // true
    greaterEqual: 5 >= 5,       // true
    lessEqual: 5 <= 6           // true
}

// 4. LOGICAL OPERATORS
let logical = {
    and: true && false,         // false (both must be true)
    or: true || false,          // true  (at least one must be true)
    not: !true,                 // false (inverts boolean value)
    
    // Short-circuit evaluation
    shortCircuitAnd: false && someFunction(), // someFunction is not called
    shortCircuitOr: true || someFunction()    // someFunction is not called
}

// 5. BITWISE OPERATORS
let bitwise = {
    and: 5 & 3,                // Bitwise AND
    or: 5 | 3,                 // Bitwise OR
    xor: 5 ^ 3,               // Bitwise XOR
    not: ~5,                  // Bitwise NOT
    leftShift: 5 << 1,        // Left shift
    rightShift: 5 >> 1,       // Right shift
    zeroRightShift: 5 >>> 1   // Zero-fill right shift
}

// 6. TYPE OPERATORS
let typeOperators = {
    typeof: typeof "hello",    // Returns "string"
    instanceof: [] instanceof Array // Returns true
}

// ******************** COMPLEX COMPARISONS ********************

// 1. NULL AND UNDEFINED COMPARISONS
let nullComparisons = {
    nullEqualsUndefined: null == undefined,   // true
    nullStrictUndefined: null === undefined,  // false
    nullEqualsZero: null == 0,               // false
    nullGreaterZero: null > 0,               // false
    nullLessZero: null < 0                   // false
}

// 2. NaN COMPARISONS
let nanComparisons = {
    nanEqualsNan: NaN == NaN,                // false
    nanStrictNan: NaN === NaN,               // false
    isNan: isNaN(NaN),                       // true
    numberIsNan: Number.isNaN(NaN)           // true
}

// 3. OBJECT COMPARISONS
let obj1 = {name: "John"}
let obj2 = {name: "John"}
let obj3 = obj1

let objectComparisons = {
    sameContent: obj1 == obj2,               // false (different references)
    sameReference: obj1 == obj3,             // true  (same reference)
    strictSameContent: obj1 === obj2,        // false
    strictSameReference: obj1 === obj3       // true
}

// ******************** ADVANCED COMPARISON EXAMPLES ********************

// 1. Array Comparisons
let arrayComparisons = {
    emptyArrays: [] == [],                   // false (different references)
    arrayString: [] == "",                   // true  ([] converts to "")
    arrayZero: [0] == false,                 // true  ([0] converts to 0)
    arrayObject: [] == {},                   // false
}

// 2. Mixed Type Comparisons
let mixedComparisons = {
    stringNumber: "123" > 122,               // true  (string converts to number)
    booleanNumber: true > 0,                 // true  (true converts to 1)
    nullComparison: null >= 0,               // true  (special case)
    undefinedNumber: undefined > 0,          // false (converts to NaN)
}

// ******************** BEST PRACTICES ********************

// 1. Always use === for equality comparisons
if (someValue === expectedValue) {
    // This is safer than ==
}

// 2. Be explicit with type conversions
let num = Number("123")    // Better than implicit conversion
let str = String(123)      // Better than implicit conversion

// 3. Use appropriate comparison methods for special values
if (Number.isNaN(value))   // Better than isNaN() for NaN checking
if (value === null)        // Explicit null checking
if (typeof value === "undefined") // Proper undefined checking

// ******************** THINGS TO AVOID ********************

// 1. Avoid loose equality (==)
// BAD:
if (5 == "5") {}

// GOOD:
if (5 === 5) {}

// 2. Avoid direct comparisons with NaN
// BAD:
if (x === NaN) {}

// GOOD:
if (Number.isNaN(x)) {}

// 3. Avoid implicit type conversion in comparisons
// BAD:
if ("123" > 122) {}

// GOOD:
if (Number("123") > 122) {}

// ******************** CONCLUSION ********************
/*
1. Use strict equality (===) by default
2. Be aware of type coercion in comparisons
3. Handle special values (null, undefined, NaN) carefully
4. Understand that object comparisons work by reference
5. Use explicit type conversions when comparing different types
6. Be careful with falsy values (0, "", null, undefined, NaN, false)
7. Remember that arrays and objects are compared by reference
*/

// ******************** PRACTICAL EXAMPLES ********************

// 1. Safe number comparison
function compareNumbers(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a - b;
}

// 2. Safe string comparison
function compareStrings(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') {
        throw new Error('Both arguments must be strings');
    }
    return a.localeCompare(b);
}

// 3. Safe object comparison
function areObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
} 