// ******************** ES6+ FEATURES ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. Basic JavaScript syntax
2. Functions and objects
3. Scope and closures
4. Asynchronous programming
*/

// ************ VARIABLE DECLARATIONS ************

class VariableDeclarations {
    // 1. let and const
    static demonstrateBlockScope() {
        {
            let blockScoped = 'only available in this block';
            const constant = 'cannot be reassigned';
            
            // constant = 'new value'; // This would throw an error
        }
        // console.log(blockScoped); // This would throw an error
    }

    // 2. Temporal Dead Zone (TDZ)
    static demonstrateTDZ() {
        // console.log(tdz); // This would throw a ReferenceError
        let tdz = 'Variable is in TDZ until declaration';
    }
}

// ************ ARROW FUNCTIONS ************

class ArrowFunctions {
    constructor() {
        this.value = 42;
    }

    // 1. Basic Syntax
    static demonstrateSyntax() {
        const simple = () => 'Simple return';
        const withParams = (a, b) => a + b;
        const multiLine = () => {
            const result = 'Multiple';
            return result + ' lines';
        };
        
        return { simple, withParams, multiLine };
    }

    // 2. Lexical this
    demonstrateLexicalThis() {
        setTimeout(() => {
            console.log(this.value); // 'this' is from constructor
        }, 100);
    }

    // 3. Arrow Function Limitations
    static limitations() {
        // Cannot be used as constructors
        // const ArrowClass = () => {};
        // new ArrowClass(); // This would throw an error

        // No arguments object
        const noArguments = (...args) => args;

        // Cannot be used as methods when 'this' is needed
        const obj = {
            value: 42,
            regular: function() { return this.value; },
            arrow: () => this.value // 'this' will be undefined or window
        };

        return { noArguments, obj };
    }
}

// ************ TEMPLATE LITERALS ************

class TemplateLiterals {
    // 1. Basic Template Strings
    static basicUsage(name, age) {
        return `Hello, ${name}! You are ${age} years old.`;
    }

    // 2. Tagged Templates
    static tag(strings, ...values) {
        return strings.reduce((result, str, i) => 
            `${result}${str}${values[i] || ''}`, '');
    }

    // 3. Multi-line Strings
    static multiLine() {
        return `
            This is a multi-line
            string with automatic
            line breaks and indentation
        `.trim();
    }
}

// ************ DESTRUCTURING ************

class Destructuring {
    // 1. Array Destructuring
    static arrayDestructuring() {
        const numbers = [1, 2, 3, 4, 5];
        
        // Basic destructuring
        const [first, second, ...rest] = numbers;
        
        // Skipping elements
        const [, , third] = numbers;
        
        // Default values
        const [a = 0, b = 0] = [];
        
        return { first, second, rest, third, a, b };
    }

    // 2. Object Destructuring
    static objectDestructuring() {
        const person = {
            name: 'John',
            age: 30,
            address: {
                city: 'New York',
                country: 'USA'
            }
        };
        
        // Basic destructuring
        const { name, age } = person;
        
        // Nested destructuring
        const { address: { city, country } } = person;
        
        // Renaming
        const { name: fullName } = person;
        
        return { name, age, city, country, fullName };
    }

    // 3. Parameter Destructuring
    static parameterDestructuring({ name, age } = {}) {
        return `${name} is ${age} years old`;
    }
}

// ************ SPREAD AND REST ************

class SpreadAndRest {
    // 1. Spread Operator
    static spreadExamples() {
        // Array spread
        const arr1 = [1, 2, 3];
        const arr2 = [...arr1, 4, 5];
        
        // Object spread
        const obj1 = { foo: 'bar' };
        const obj2 = { ...obj1, baz: 'qux' };
        
        // String spread
        const chars = [...'hello'];
        
        return { arr2, obj2, chars };
    }

    // 2. Rest Parameters
    static sum(...numbers) {
        return numbers.reduce((sum, num) => sum + num, 0);
    }

    // 3. Rest in Destructuring
    static restDestructuring() {
        const [first, ...others] = [1, 2, 3, 4];
        const { name, ...rest } = { name: 'John', age: 30, city: 'NY' };
        
        return { first, others, name, rest };
    }
}

// ************ CLASSES AND MODULES ************

// Private field declaration
class ModernClass {
    #privateField;
    static #privateStatic = 'private static';

    constructor(value) {
        this.#privateField = value;
    }

    get value() {
        return this.#privateField;
    }

    static getPrivateStatic() {
        return ModernClass.#privateStatic;
    }
}

// Class fields and methods
class ClassFeatures {
    // Public field
    publicField = 'public';
    
    // Private method
    #privateMethod() {
        return 'private';
    }

    // Static public field
    static staticField = 'static';
    
    // Static private field
    static #staticPrivate = 'static private';
}

// ************ NEW DATA STRUCTURES ************

class ModernDataStructures {
    // 1. Map
    static mapExample() {
        const map = new Map();
        map.set('key', 'value');
        map.set(42, 'number key');
        map.set({}, 'object key');
        
        return map;
    }

    // 2. Set
    static setExample() {
        const set = new Set([1, 2, 2, 3, 3, 3]);
        set.add(4);
        set.delete(1);
        
        return set;
    }

    // 3. WeakMap and WeakSet
    static weakCollections() {
        const weakMap = new WeakMap();
        const weakSet = new WeakSet();
        
        const obj = {};
        weakMap.set(obj, 'value');
        weakSet.add(obj);
        
        return { weakMap, weakSet };
    }
}

// ************ ITERATORS AND GENERATORS ************

class IteratorsAndGenerators {
    // 1. Custom Iterator
    static createIterator(array) {
        let index = 0;
        
        return {
            next: () => ({
                value: array[index],
                done: index++ >= array.length
            })
        };
    }

    // 2. Generator Function
    static *numberGenerator() {
        yield 1;
        yield 2;
        yield* [3, 4, 5];
    }

    // 3. Async Generator
    static async *asyncGenerator() {
        for (let i = 0; i < 3; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            yield i;
        }
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of modern JavaScript features
2. Mastery of ES6+ syntax and patterns
3. Implementation of new data structures
4. Advanced class features usage

NEXT STEPS:
1. Practice using modern features
2. Implement real-world examples
3. Study upcoming JavaScript features
4. Move on to Modules and Module Patterns (14_Modules.js)

INTERVIEW PREPARATION:
1. Study ES6+ features in depth
2. Practice modern syntax
3. Understand iterators and generators
4. Master class features
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        VariableDeclarations,
        ArrowFunctions,
        TemplateLiterals,
        Destructuring,
        SpreadAndRest,
        ModernClass,
        ClassFeatures,
        ModernDataStructures,
        IteratorsAndGenerators
    };
} 