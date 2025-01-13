// ******************** VARIABLES AND DATA TYPES IN JAVASCRIPT ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. Basic JavaScript syntax (from 01_JS_Introduction.js)
2. How to run JavaScript code
3. Basic programming concepts
*/

// ************ VARIABLES FUNDAMENTALS ************

// 1. Variable Declaration Keywords
let modernVariable = "Use let for variables that will change";
const constantValue = "Use const for values that won't change";
var oldStyleVariable = "Avoid var in modern JavaScript"; // Legacy

// 2. Variable Scoping
{
    let blockScoped = "Only available inside this block";
    var functionScoped = "Available throughout the function";
    const alsoBlockScoped = "Block scoped like let";
}

// 3. Hoisting Behavior
console.log(hoistedVar); // undefined
var hoistedVar = "Hoisted variable";

// This would throw ReferenceError:
// console.log(notHoisted);
// let notHoisted = "Let variables are not hoisted";

// ************ DATA TYPES ************

// 1. Primitive Types
const numberExample = 42;              // Number
const bigIntExample = 9007199254740991n; // BigInt
const stringExample = "Hello";         // String
const booleanExample = true;          // Boolean
const nullExample = null;             // Null
const undefinedExample = undefined;   // Undefined
const symbolExample = Symbol("description"); // Symbol

// 2. Object Type (Reference Type)
const objectExample = {
    property: "value",
    method() {
        return this.property;
    }
};

// ************ TYPE COERCION AND CONVERSION ************

class TypeConversion {
    // Explicit Type Conversion
    static toNumber(value) {
        return Number(value);
    }

    static toString(value) {
        return String(value);
    }

    static toBoolean(value) {
        return Boolean(value);
    }

    // Demonstrating Implicit Coercion
    static demonstrateCoercion() {
        console.log("1" + 2);        // "12" (string concatenation)
        console.log("2" - 1);        // 1 (numeric subtraction)
        console.log(true + 1);       // 2 (true becomes 1)
        console.log(false + 1);      // 1 (false becomes 0)
        console.log([1] + [2]);      // "12" (arrays convert to strings)
    }
}

// ************ ADVANCED CONCEPTS ************

// 1. Memory Management
const primitiveValue = 42;        // Stored on stack
const referenceValue = [1, 2, 3]; // Reference stored on stack, array on heap

// 2. Immutability of Primitives
let string1 = "hello";
let string2 = string1;
string2 = "world";  // string1 remains "hello"

// 3. Reference vs Value
const originalArray = [1, 2, 3];
const referenceCopy = originalArray;      // Same reference
const valueCopy = [...originalArray];     // New copy

// ************ BEST PRACTICES ************

/*
1. Variable Naming:
   - Use camelCase for variables and functions
   - Use PascalCase for classes
   - Use UPPERCASE for constants
   - Use descriptive names

2. Declaration:
   - Prefer const over let
   - Avoid var
   - Declare variables at the top of their scope
   - Initialize variables when declaring

3. Type Handling:
   - Use explicit type conversion when needed
   - Be careful with implicit coercion
   - Use strict equality (===) over loose equality (==)
*/

// ************ COMMON INTERVIEW QUESTIONS ************

class InterviewQuestions {
    // 1. Explain variable hoisting
    static hoistingExample() {
        console.log(hoisted);    // undefined
        var hoisted = "value";   // hoisting in action
    }

    // 2. Demonstrate type coercion
    static coercionExample() {
        console.log(1 == "1");   // true (loose equality)
        console.log(1 === "1");  // false (strict equality)
    }

    // 3. Explain closure with variables
    static createCounter() {
        let count = 0;
        return {
            increment() { return ++count; },
            getCount() { return count; }
        };
    }
}

// ************ PRACTICAL EXERCISES ************

// Exercise 1: Type Identification
function identifyType(value) {
    return {
        type: typeof value,
        isNull: value === null,
        isUndefined: value === undefined,
        isPrimitive: Object(value) !== value
    };
}

// Exercise 2: Safe Type Conversion
function safeTypeConversion(value, targetType) {
    try {
        switch(targetType) {
            case 'number':
                const num = Number(value);
                return isNaN(num) ? null : num;
            case 'string':
                return String(value);
            case 'boolean':
                return Boolean(value);
            default:
                throw new Error('Unsupported type conversion');
        }
    } catch (error) {
        console.error('Conversion failed:', error);
        return null;
    }
}

// Exercise 3: Deep Freeze Object
function deepFreeze(obj) {
    Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object' && obj[prop] !== null) {
            deepFreeze(obj[prop]);
        }
    });
    return Object.freeze(obj);
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of JavaScript's variable declarations
2. Mastery of data types and type system
3. Knowledge of type coercion and conversion
4. Best practices for variable usage

NEXT STEPS:
1. Practice type conversions
2. Experiment with scope and hoisting
3. Complete the exercises
4. Move on to Operators and Control Flow (03_Operators.js)

INTERVIEW PREPARATION:
1. Review type coercion examples
2. Practice explaining hoisting
3. Understand memory management
4. Master variable scope concepts
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        TypeConversion,
        InterviewQuestions,
        identifyType,
        safeTypeConversion,
        deepFreeze
    };
} 