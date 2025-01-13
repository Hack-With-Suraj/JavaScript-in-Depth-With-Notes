// ******************** JAVASCRIPT LEARNING PATH ********************

/*
COMPLETE COURSE STRUCTURE:

01. Introduction to JavaScript (this file)
02. Variables, Data Types, and Type Coercion
03. Operators and Control Flow
04. Functions and Scope
05. Objects and Object-Oriented Programming
06. Arrays and Array Methods
07. String Manipulation and Regular Expressions
08. Error Handling and Debugging
09. Dates and Time
10. DOM Manipulation
11. Events and Event Handling
12. Asynchronous JavaScript (Callbacks, Promises, Async/Await)
13. ES6+ Features
14. Modules and Module Patterns
15. Memory Management and Optimization
16. Design Patterns
17. Testing and Debugging
18. Security Best Practices
19. Performance Optimization
20. Advanced JavaScript Concepts

Each file will include:
- Theoretical foundations
- Practical examples
- Best practices
- Common interview questions
- Coding exercises
- Real-world applications
*/

// ******************** INTRODUCTION TO JAVASCRIPT ********************

/*
PREREQUISITES FOR LEARNING JAVASCRIPT:
1. Basic understanding of HTML/CSS
2. Familiarity with programming concepts
3. Text editor or IDE
4. Web browser for testing
5. Basic problem-solving skills
*/

// ************ WHAT IS JAVASCRIPT? ************

/*
JavaScript is:
1. High-level programming language
2. Just-in-time compiled
3. Multi-paradigm: 
   - Object-oriented
   - Functional
   - Imperative
   - Event-driven
4. Single-threaded
5. Dynamic typing
6. Prototype-based
*/

// ************ JAVASCRIPT ENVIRONMENTS ************

// 1. Browser Environment
console.log("Running in browser"); // Outputs to browser console
// window.alert("Browser specific"); // Browser-only API

// 2. Node.js Environment
// console.log(process.version); // Node.js specific
// require('module'); // Node.js module system

// 3. Cross-Environment Code
const platform = typeof window !== 'undefined' ? 'browser' : 'node';

// ************ BASIC SYNTAX AND CONVENTIONS ************

// 1. Comments
// Single line comment

/* 
   Multi-line
   comment
*/

// 2. Statements
let statement1 = "Hello";  // Semicolon is optional but recommended
let statement2 = "World"   // Without semicolon

// 3. Case Sensitivity
let myVariable = 1;
let MYVARIABLE = 2; // Different from myVariable
let MyVariable = 3; // Different from both above

// ************ CODE ORGANIZATION ************

// 1. Basic Program Structure
'use strict'; // Recommended for better error catching

// Imports (in modules)
// import { something } from './module';

// Constants
const PI = 3.14159;
const MAX_ITEMS = 100;

// Global variables (minimize use)
let globalCounter = 0;

// Function declarations
function main() {
    // Main program logic
}

// Class declarations
class Program {
    constructor() {
        // Initialize
    }
}

// ************ BEST PRACTICES ************

/*
1. Code Style
   - Use consistent indentation (2 or 4 spaces)
   - Follow naming conventions
   - Write self-documenting code
   - Add meaningful comments

2. Development Practices
   - Use strict mode
   - Avoid global variables
   - Handle errors properly
   - Write modular code

3. Tools and Environment
   - Use a linter (ESLint)
   - Use a formatter (Prettier)
   - Use version control (Git)
   - Use development tools (Chrome DevTools)
*/

// ************ COMMON INTERVIEW QUESTIONS ************

/*
1. What is JavaScript?
   Answer: JavaScript is a high-level, interpreted programming language
   that conforms to the ECMAScript specification. It's multi-paradigm
   and supports event-driven, functional, and imperative programming styles.

2. What's the difference between JavaScript and Java?
   Answer: Despite similar names, they are completely different languages.
   JavaScript is a scripting language for web pages, while Java is a
   general-purpose programming language.

3. What is 'use strict'?
   Answer: It's a directive that enables strict mode in JavaScript,
   which enforces stricter parsing and error handling.

4. Explain the JavaScript engine
   Answer: It's a program that executes JavaScript code. V8 (Chrome),
   SpiderMonkey (Firefox), and JavaScriptCore (Safari) are examples.
*/

// ************ PRACTICAL EXERCISES ************

// Exercise 1: Hello World
function helloWorld() {
    return "Hello, World!";
}

// Exercise 2: Environment Detection
function detectEnvironment() {
    if (typeof window !== 'undefined') {
        return 'browser';
    } else if (typeof process !== 'undefined') {
        return 'node';
    }
    return 'unknown';
}

// Exercise 3: Basic Error Handling
function safeOperation(operation) {
    try {
        return operation();
    } catch (error) {
        console.error('Operation failed:', error);
        return null;
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of JavaScript's role and capabilities
2. Knowledge of different JavaScript environments
3. Basic syntax and coding conventions
4. Best practices for code organization

NEXT STEPS:
1. Practice the basic concepts
2. Set up your development environment
3. Complete the exercises
4. Move on to Variables and Data Types (02_Variables.js)

INTERVIEW PREPARATION:
1. Review common questions
2. Understand JavaScript's unique features
3. Practice explaining concepts
4. Build small example programs
*/

// Export for testing (if using modules)
if (typeof module !== 'undefined') {
    module.exports = {
        helloWorld,
        detectEnvironment,
        safeOperation
    };
} 