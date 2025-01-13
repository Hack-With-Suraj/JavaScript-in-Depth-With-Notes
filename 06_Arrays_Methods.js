// ******************** ARRAYS AND ARRAY METHODS IN JAVASCRIPT ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. Basic JavaScript syntax
2. Functions and callbacks
3. Objects fundamentals
4. ES6+ features
*/

// ************ ARRAY FUNDAMENTALS ************

class ArrayBasics {
    // 1. Array Creation
    static demonstrateCreation() {
        const literal = [1, 2, 3];
        const constructed = new Array(3);
        const from = Array.from('hello');
        const of = Array.of(1, 2, 3);
        const spread = [...literal];

        return { literal, constructed, from, of, spread };
    }

    // 2. Array Properties
    static arrayProperties(arr) {
        return {
            length: arr.length,
            isArray: Array.isArray(arr),
            constructor: arr.constructor.name
        };
    }

    // 3. Basic Operations
    static basicOperations() {
        const arr = [1, 2, 3];
        
        // Adding/Removing elements
        arr.push(4);         // Add to end
        arr.unshift(0);      // Add to start
        const last = arr.pop();       // Remove from end
        const first = arr.shift();    // Remove from start
        
        return { arr, last, first };
    }
}

// ************ ARRAY METHODS ************

class ArrayMethods {
    // 1. Iteration Methods
    static iterationExamples(arr) {
        // forEach
        arr.forEach((item, index) => console.log(item, index));

        // map
        const doubled = arr.map(x => x * 2);

        // filter
        const evens = arr.filter(x => x % 2 === 0);

        // reduce
        const sum = arr.reduce((acc, curr) => acc + curr, 0);

        // find/findIndex
        const found = arr.find(x => x > 5);
        const foundIndex = arr.findIndex(x => x > 5);

        return { doubled, evens, sum, found, foundIndex };
    }

    // 2. Transformation Methods
    static transformationExamples(arr) {
        // slice
        const sliced = arr.slice(1, 3);

        // splice
        const spliced = [...arr];
        spliced.splice(1, 2, 'a', 'b');

        // concat
        const concatenated = arr.concat([4, 5, 6]);

        // flat
        const flattened = [1, [2, 3], [4, [5, 6]]].flat(2);

        return { sliced, spliced, concatenated, flattened };
    }

    // 3. Search and Sort Methods
    static searchAndSort(arr) {
        // indexOf/lastIndexOf
        const index = arr.indexOf(3);
        const lastIndex = arr.lastIndexOf(3);

        // includes
        const hasElement = arr.includes(3);

        // sort
        const sorted = [...arr].sort((a, b) => a - b);

        // reverse
        const reversed = [...arr].reverse();

        return { index, lastIndex, hasElement, sorted, reversed };
    }
}

// ************ ADVANCED ARRAY OPERATIONS ************

class AdvancedArrayOperations {
    // 1. Custom Iterator
    static createIterator(arr) {
        return {
            *[Symbol.iterator]() {
                for (let i = 0; i < arr.length; i++) {
                    yield arr[i];
                }
            }
        };
    }

    // 2. Array Subclassing
    static createCustomArray() {
        class CustomArray extends Array {
            sum() {
                return this.reduce((acc, curr) => acc + curr, 0);
            }

            average() {
                return this.sum() / this.length;
            }
        }
        return CustomArray;
    }

    // 3. Array Buffer Operations
    static typedArrayOperations() {
        const buffer = new ArrayBuffer(16);
        const int32View = new Int32Array(buffer);
        const float64View = new Float64Array(buffer);

        return { buffer, int32View, float64View };
    }
}

// ************ PERFORMANCE OPTIMIZATION ************

class ArrayOptimization {
    // 1. Preallocating Arrays
    static preallocation(size) {
        return new Array(size);
    }

    // 2. Optimized Array Operations
    static optimizedOperations(arr) {
        // Cache length for loops
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            // Operation
        }

        // Use appropriate methods
        const sum = arr.reduce((a, b) => a + b, 0); // Better than forEach for sum
    }

    // 3. Memory Efficient Operations
    static memoryEfficient() {
        // Use TypedArrays for numeric data
        const numbers = new Float64Array(1000);

        // Use Set for unique values
        const unique = [...new Set([1, 2, 2, 3, 3, 4])];

        return { numbers, unique };
    }
}

// ************ COMMON INTERVIEW QUESTIONS ************

class ArrayInterviewQuestions {
    // 1. Implement Array.prototype.map
    static customMap(arr, callback) {
        const result = new Array(arr.length);
        for (let i = 0; i < arr.length; i++) {
            result[i] = callback(arr[i], i, arr);
        }
        return result;
    }

    // 2. Find duplicates in array
    static findDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) !== index);
    }

    // 3. Flatten nested array
    static flattenArray(arr) {
        return arr.reduce((flat, item) => 
            flat.concat(Array.isArray(item) ? this.flattenArray(item) : item), 
        []);
    }
}

// ************ PRACTICAL EXERCISES ************

// Exercise 1: Implement a circular buffer
class CircularBuffer {
    constructor(size) {
        this.size = size;
        this.buffer = new Array(size);
        this.writePtr = 0;
        this.readPtr = 0;
        this.count = 0;
    }

    write(value) {
        this.buffer[this.writePtr] = value;
        this.writePtr = (this.writePtr + 1) % this.size;
        this.count = Math.min(this.count + 1, this.size);
    }

    read() {
        if (this.count === 0) return null;
        const value = this.buffer[this.readPtr];
        this.readPtr = (this.readPtr + 1) % this.size;
        this.count--;
        return value;
    }
}

// Exercise 2: Implement a sparse array
class SparseArray {
    constructor() {
        this.data = new Map();
        this.length = 0;
    }

    set(index, value) {
        this.data.set(index, value);
        this.length = Math.max(this.length, index + 1);
    }

    get(index) {
        return this.data.get(index);
    }
}

// Exercise 3: Array pool implementation
class ArrayPool {
    constructor(maxSize = 1000) {
        this.pool = [];
        this.maxSize = maxSize;
    }

    acquire(size) {
        return this.pool.pop() || new Array(size);
    }

    release(array) {
        if (this.pool.length < this.maxSize) {
            array.length = 0;
            this.pool.push(array);
        }
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Deep understanding of array operations
2. Mastery of array methods
3. Performance optimization techniques
4. Advanced array manipulation skills

NEXT STEPS:
1. Practice array manipulations
2. Implement custom array methods
3. Study array performance
4. Move on to String Manipulation (07_Strings.js)

INTERVIEW PREPARATION:
1. Study time complexity of array operations
2. Practice implementing array methods
3. Understand array memory model
4. Master array algorithms
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        ArrayBasics,
        ArrayMethods,
        AdvancedArrayOperations,
        ArrayOptimization,
        ArrayInterviewQuestions,
        CircularBuffer,
        SparseArray,
        ArrayPool
    };
} 