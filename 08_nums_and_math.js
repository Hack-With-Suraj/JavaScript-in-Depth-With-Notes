// ******************** JAVASCRIPT NUMBERS AND MATH GUIDE ********************

// ************ NUMBER BASICS ************

// Number Creation
let num1 = 42;                    // Integer literal
let num2 = 3.14;                  // Floating-point literal
let num3 = 1e3;                   // Exponential notation: 1 * 10^3 => 1000
let num4 = Number("123");        // Using Number constructor
let num5 = parseInt("101", 2);   // Parsing binary string to integer => 5
let num6 = parseFloat("3.1415"); // Parsing float string => 3.1415

// Special Numeric Values
let inf = Infinity;              // Positive infinity
let ninf = -Infinity;            // Negative infinity
let nan = NaN;                   // Not a Number

// Type Checking
console.log(typeof num1);        // "number"
console.log(isNaN(NaN));        // true
console.log(Number.isFinite(10)); // true

// ************ NUMBER PROPERTIES ************

console.log(Number.MAX_VALUE);   // Largest possible number (~1.79e+308)
console.log(Number.MIN_VALUE);   // Smallest positive number (~5e-324)
console.log(Number.MAX_SAFE_INTEGER);  // 2^53 - 1 => 9007199254740991
console.log(Number.MIN_SAFE_INTEGER);  // -(2^53 - 1)
console.log(Number.EPSILON);     // Difference between 1 and the next largest float

// ************ COMMON NUMBER METHODS ************

// Conversion Methods
let num = 123.456;
console.log(num.toFixed(2));     // "123.46" (rounds to 2 decimal places)
console.log(num.toExponential(2)); // "1.23e+2"
console.log(num.toPrecision(4));  // "123.5"

// Parsing Strings
console.log(parseInt("101", 2));   // 5 (binary to decimal)
console.log(parseFloat("3.1415abc")); // 3.1415

// ************ MATH OBJECT ************

// Constants
console.log(Math.PI);           // 3.141592653589793
console.log(Math.E);            // 2.718281828459045 (Euler's Number)
console.log(Math.SQRT2);        // 1.4142135623730951 (Square root of 2)

// Basic Math Operations
console.log(Math.abs(-42));     // 42
console.log(Math.pow(2, 3));    // 8
console.log(Math.sqrt(16));     // 4
console.log(Math.cbrt(27));     // 3

// Rounding Methods
console.log(Math.floor(4.9));   // 4 (rounds down)
console.log(Math.ceil(4.1));    // 5 (rounds up)
console.log(Math.round(4.5));   // 5 (rounds to nearest)
console.log(Math.trunc(4.9));   // 4 (removes decimal)

// Random Numbers
console.log(Math.random());     // Random number between 0 (inclusive) and 1 (exclusive)

// Trigonometry (in radians)
console.log(Math.sin(Math.PI / 2));  // 1
console.log(Math.cos(0));            // 1
console.log(Math.tan(Math.PI / 4));  // 1

// ************ ADVANCED NUMBER TOPICS ************

// Floating-Point Precision Problem
console.log(0.1 + 0.2 === 0.3);  // false (due to binary floating-point errors)

// Solution using Number.EPSILON
function isEqual(a, b) {
    return Math.abs(a - b) < Number.EPSILON;
}
console.log(isEqual(0.1 + 0.2, 0.3)); // true

// BigInt for Large Integers
let bigIntNum = 1234567890123456789012345678901234567890n; // BigInt literal
console.log(bigIntNum * 2n);   // Works with BigInt only

// ************ PRACTICAL EXAMPLES ************

// 1. Generate Random Integer Between Min and Max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomInt(1, 100));

// 2. Factorial Calculation (Recursion)
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(5));  // 120

// 3. Prime Number Check
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}
console.log(isPrime(17));  // true

// 4. Fibonacci Series
function fibonacci(n) {
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return n ? b : a;
}
console.log(fibonacci(10));  // 55

// ************ BEST PRACTICES ************

/*
1. Use Number.EPSILON for floating-point comparisons.
2. Use BigInt for handling very large integers beyond Number.MAX_SAFE_INTEGER.
3. Avoid parseInt without radix to prevent unexpected behavior.
4. Prefer Math.trunc() over bitwise OR (| 0) for clarity.
5. Always validate user input when converting to numbers.
*/

// ************ INTERVIEW QUESTIONS ************

// Q1: Sum of Digits
function sumOfDigits(num) {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}
console.log(sumOfDigits(1234));  // 10

// Q2: Greatest Common Divisor (Euclidean Algorithm)
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}
console.log(gcd(48, 18));  // 6

// Q3: Check for Power of Two
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}
console.log(isPowerOfTwo(16));  // true

// ******************** END OF GUIDE ********************
