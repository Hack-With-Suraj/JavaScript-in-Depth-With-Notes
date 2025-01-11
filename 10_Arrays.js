// ******************** JAVASCRIPT ARRAYS GUIDE ********************

// ************ ARRAY BASICS ************

// Creating Arrays
let emptyArray = [];                            // An empty array
let numbers = [1, 2, 3, 4, 5];                 // Array of numbers
let mixedArray = [1, 'two', true, null];      // Array with mixed data types
let nestedArray = [[1, 2], [3, 4]];          // Multidimensional array

// Array Constructor
let arrUsingConstructor = new Array(5);      // Creates an empty array with 5 slots (undefined)
let filledArray = new Array(5).fill(0);      // Creates [0, 0, 0, 0, 0]

// ************ ARRAY PROPERTIES ************

numbers.length;  // Length of the array (number of elements)

// ************ ARRAY ACCESS AND MODIFICATION ************

// Accessing Elements
numbers[0];  // Access first element (1)
numbers[4];  // Access fifth element (5)
numbers[numbers.length - 1]; // Last element

// Modifying Elements
numbers[2] = 99;  // Changes third element to 99 -> [1, 2, 99, 4, 5]

// Adding Elements
numbers.push(6);     // Adds to the end -> [1, 2, 99, 4, 5, 6]
numbers.unshift(0);  // Adds to the beginning -> [0, 1, 2, 99, 4, 5, 6]

// Removing Elements
numbers.pop();       // Removes last element -> [0, 1, 2, 99, 4, 5]
numbers.shift();     // Removes first element -> [1, 2, 99, 4, 5]

// ************ ARRAY ITERATION ************

// Using for loop
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);  // Logs each element
}

// Using for...of loop
for (let num of numbers) {
  console.log(num);  // Logs each element
}

// Using forEach (functional approach)
numbers.forEach((num, index) => console.log(`Index ${index}: ${num}`));

// ************ ARRAY METHODS ************

// Transforming Arrays
let squared = numbers.map(num => num * num); // Squares each element

// Filtering Arrays
let evens = numbers.filter(num => num % 2 === 0);  // Filters even numbers

// Reducing Arrays
let sum = numbers.reduce((total, num) => total + num, 0);  // Sums all elements

// Searching Arrays
numbers.includes(99);  // Checks if 99 exists -> true
numbers.indexOf(99);   // Finds index of 99 -> 2

// Sorting Arrays
let unsorted = [3, 1, 4, 1, 5];
unsorted.sort();  // Lexicographical sort -> [1, 1, 3, 4, 5]
unsorted.sort((a, b) => a - b);  // Numeric sort -> [1, 1, 3, 4, 5]

// ************ MULTIDIMENSIONAL ARRAYS ************

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Accessing Elements
matrix[0][1];  // 2 (first row, second column)

// Iterating Through Matrix
for (let row of matrix) {
  for (let value of row) {
    console.log(value);
  }
}

// ************ ARRAY DESTRUCTURING ************

let [first, second, ...rest] = numbers;  // first = 1, second = 2, rest = [99, 4, 5]

// ************ ADVANCED ARRAY CONCEPTS ************

// Sparse Arrays
let sparse = [];
sparse[5] = 10;  // [empty × 5, 10]

// Typed Arrays (for performance, close to memory representation)
let typedArray = new Int16Array(5);  // Array of 16-bit integers

// Functional Programming
let composed = numbers
  .filter(num => num > 2)
  .map(num => num * 2)
  .reduce((sum, num) => sum + num, 0);  // Combined transformations

// ************ ARRAY ALGORITHMS (MATH + CS PERSPECTIVE) ************

// 1. Binary Search (sorted arrays only)
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;  // Not found
}

// 2. Finding Duplicates
function hasDuplicates(arr) {
  let set = new Set();
  for (let item of arr) {
    if (set.has(item)) return true;
    set.add(item);
  }
  return false;
}

// 3. Matrix Transposition
function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

// ************ BEST PRACTICES ************

/*
1. Use built-in methods like map, filter, and reduce for cleaner code.
2. Avoid modifying arrays during iteration to prevent bugs.
3. Prefer `const` for arrays that aren't reassigned (but can still be mutated).
4. Understand zero-based indexing to avoid off-by-one errors.
5. Use typed arrays for performance in numerical computations.
*/
