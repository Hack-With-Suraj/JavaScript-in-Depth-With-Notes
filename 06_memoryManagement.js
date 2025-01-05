// ******************** JAVASCRIPT MEMORY MANAGEMENT GUIDE ********************

// ************ STACK MEMORY ************
/*
Stack Memory Characteristics:
1. Stores primitive values
2. Fixed size
3. Static memory allocation
4. LIFO (Last In First Out)
5. Faster access than Heap
6. Automatic memory management
*/

// Example of Stack Memory Usage
let stackExample = {
    number: 42,              // Stored in Stack
    string: "Hello",         // Stored in Stack
    boolean: true,           // Stored in Stack
    undefined: undefined,    // Stored in Stack
    null: null              // Stored in Stack
}

// ************ HEAP MEMORY ************
/*
Heap Memory Characteristics:
1. Stores reference values (objects, arrays, functions)
2. Dynamic size
3. Dynamic memory allocation
4. No particular order 
5. Slower access than Stack
6. Garbage collected
*/

// Example of Heap Memory Usage
let heapExample = {
    array: [1, 2, 3],           // Array stored in Heap, reference in Stack
    object: { name: "John" },    // Object stored in Heap, reference in Stack
    function: function () { },     // Function stored in Heap, reference in Stack
}

// ************ PRACTICAL EXAMPLES ************

// 1. Stack Memory Example
function stackMemoryDemo() {
    let x = 10;         // Stored in Stack
    let y = x;          // Copy of value, new memory in Stack
    x = 20;             // Original value changed
    console.log(x);     // 20
    console.log(y);     // 10 (unaffected by x's change)
}

// 2. Heap Memory Example
function heapMemoryDemo() {
    let obj1 = { value: 10 };    // Reference stored in Stack, object in Heap
    let obj2 = obj1;             // Reference copied, same object in Heap
    obj1.value = 20;             // Original object modified
    console.log(obj1.value);     // 20
    console.log(obj2.value);     // 20 (affected because same reference)
}

// ************ INTERVIEW QUESTIONS ************

// Q1: What happens in memory when we create variables?
function memoryAllocationQuestion() {
    // Primitive (Stack)
    let age = 25;
    let name = "John";

    // Reference (Heap with Stack reference)
    let person = {
        age: age,
        name: name
    };

    return person;
}

// Q2: Explain memory leak scenario
function memoryLeakExample() {
    let leakArray = [];

    function addToArray() {
        // Memory leak: continuously growing array
        leakArray.push(new Array(10000));
    }

    setInterval(addToArray, 1000); // DON'T run this! It's just for demonstration
}

// Q3: Implement memory-efficient function
function efficientMemoryUsage(largeArray) {
    // BAD: Creates new array in memory
    // return largeArray.map(item => item * 2);

    // GOOD: Modifies existing array
    for (let i = 0; i < largeArray.length; i++) {
        largeArray[i] = largeArray[i] * 2;
    }
    return largeArray;
}

// ************ ADVANCED CONCEPTS ************

// 1. Closure and Memory
function closureMemoryExample() {
    let count = 0;              // Stored in closure scope

    return function () {
        return ++count;         // Accesses variable from parent scope
    };
}

// 2. Memory Management in Recursion
function recursiveFunction(n) {
    // BAD: Creates new array in each recursion
    // return n <= 1 ? [n] : [...recursiveFunction(n-1), n];

    // GOOD: Uses accumulator to prevent memory buildup
    function recursiveHelper(n, acc) {
        return n <= 1 ? acc : recursiveHelper(n - 1, [n, ...acc]);
    }
    return recursiveHelper(n, []);
}

// ************ PRACTICAL MEMORY OPTIMIZATION ************

// 1. Object Pool Pattern
class ObjectPool {
    constructor() {
        this.pool = [];
    }

    acquire() {
        return this.pool.length > 0
            ? this.pool.pop()
            : new SomeExpensiveObject();
    }

    release(obj) {
        this.pool.push(obj);
    }
}

// 2. Memory-Efficient Data Structure
class CircularBuffer {
    constructor(size) {
        this.buffer = new Array(size);
        this.size = size;
        this.writePtr = 0;
        this.readPtr = 0;
    }

    write(data) {
        this.buffer[this.writePtr] = data;
        this.writePtr = (this.writePtr + 1) % this.size;
    }

    read() {
        const data = this.buffer[this.readPtr];
        this.readPtr = (this.readPtr + 1) % this.size;
        return data;
    }
}

// ************ BEST PRACTICES ************

/*
1. Memory Management Best Practices:
   - Clear references when no longer needed
   - Use appropriate data structures
   - Avoid memory leaks in closures
   - Be careful with event listeners
   - Use WeakMap/WeakSet for better garbage collection

2. Common Memory Issues:
   - Global variables accumulation
   - Forgotten timers and intervals
   - Detached DOM elements
   - Circular references
   - Large object caches

3. Performance Tips:
   - Reuse objects when possible
   - Avoid creating unnecessary closures
   - Use appropriate data structures
   - Implement proper cleanup mechanisms
*/

// ************ INTERVIEW PRACTICE QUESTIONS ************

/*
Q1: What's the difference between Stack and Heap memory?
A: Stack stores primitive values and references, is fixed size and faster.
   Heap stores objects and is dynamic but slower.

Q2: How does garbage collection work in JavaScript?
A: It automatically frees memory when objects are no longer referenced.
   Uses mark-and-sweep algorithm to identify and remove unused objects.

Q3: What causes memory leaks in JavaScript?
A: - Global variables
   - Forgotten event listeners
   - Closures holding references
   - Detached DOM elements
   - Circular references

Q4: How to optimize memory usage in loops?
A: - Avoid creating objects in loops
   - Use appropriate loop type
   - Consider using iterators
   - Cache array length
*/

// Example of Memory-Efficient Loop
function efficientLoop(array) {
    // BAD
    for (let i = 0; i < array.length; i++) { }

    // GOOD
    const len = array.length;
    for (let i = 0; i < len; i++) { }

    // BETTER (for simple iterations)
    array.forEach(item => { });
}

// ************ TESTING MEMORY USAGE ************

function memoryTest() {
    const used = process.memoryUsage();

    console.log(`Memory usage:
        HeapTotal: ${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB
        HeapUsed: ${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`);
} 