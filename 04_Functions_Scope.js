// ******************** FUNCTIONS AND SCOPE IN JAVASCRIPT ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. Variables and data types
2. Operators and control flow
3. Basic JavaScript syntax
*/

// ************ FUNCTION FUNDAMENTALS ************

// 1. Function Declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// 2. Function Expression
const greetExpression = function(name) {
    return `Hello, ${name}!`;
};

// 3. Arrow Function
const greetArrow = (name) => `Hello, ${name}!`;

// 4. Function Constructor (not recommended)
const greetConstructor = new Function('name', 'return "Hello, " + name + "!"');

// ************ FUNCTION PARAMETERS ************

class ParameterExamples {
    // 1. Default Parameters
    static defaultParams(name = 'Guest', greeting = 'Hello') {
        return `${greeting}, ${name}!`;
    }

    // 2. Rest Parameters
    static sum(...numbers) {
        return numbers.reduce((total, num) => total + num, 0);
    }

    // 3. Parameter Destructuring
    static printUserInfo({ name, age, email = 'N/A' }) {
        return `Name: ${name}, Age: ${age}, Email: ${email}`;
    }
}

// ************ SCOPE AND CLOSURE ************

class ScopeExamples {
    // 1. Global Scope
    static globalVariable = 'I am global';

    // 2. Function Scope
    static functionScope() {
        var functionScopedVar = 'I am function-scoped';
        return functionScopedVar;
    }

    // 3. Block Scope
    static blockScope() {
        let blockScopedVar = 'I am block-scoped';
        const alsoBlockScoped = 'I am also block-scoped';
        return { blockScopedVar, alsoBlockScoped };
    }

    // 4. Closure Example
    static createCounter() {
        let count = 0;
        return {
            increment() { return ++count; },
            decrement() { return --count; },
            getCount() { return count; }
        };
    }
}

// ************ THIS KEYWORD AND CONTEXT ************

class ThisContextExamples {
    constructor() {
        this.value = 42;
    }

    // Regular Method
    regularMethod() {
        return this.value;
    }

    // Arrow Method (lexical this)
    arrowMethod = () => {
        return this.value;
    }

    // Demonstrating this binding
    static demonstrateBinding() {
        const obj = {
            value: 'test',
            method() { return this.value; }
        };

        const unboundMethod = obj.method;
        const boundMethod = obj.method.bind(obj);

        return {
            normalCall: obj.method(),          // 'test'
            unboundCall: unboundMethod(),      // undefined
            boundCall: boundMethod()           // 'test'
        };
    }
}

// ************ ADVANCED FUNCTION CONCEPTS ************

class AdvancedFunctions {
    // 1. Higher-Order Functions
    static map(array, transform) {
        return array.map(transform);
    }

    // 2. Function Composition
    static compose(...fns) {
        return x => fns.reduceRight((y, f) => f(y), x);
    }

    // 3. Partial Application
    static partial(fn, ...args) {
        return (...moreArgs) => fn(...args, ...moreArgs);
    }

    // 4. Memoization
    static memoize(fn) {
        const cache = new Map();
        return (...args) => {
            const key = JSON.stringify(args);
            if (!cache.has(key)) {
                cache.set(key, fn(...args));
            }
            return cache.get(key);
        };
    }
}

// ************ FUNCTION PATTERNS AND BEST PRACTICES ************

class FunctionPatterns {
    // 1. IIFE (Immediately Invoked Function Expression)
    static iife = (() => {
        const private = 'I am private';
        return {
            getPrivate: () => private
        };
    })();

    // 2. Currying
    static curry(fn) {
        return function curried(...args) {
            if (args.length >= fn.length) {
                return fn(...args);
            }
            return (...moreArgs) => curried(...args, ...moreArgs);
        };
    }

    // 3. Method Chaining
    static createChainable() {
        return {
            value: 0,
            add(n) {
                this.value += n;
                return this;
            },
            subtract(n) {
                this.value -= n;
                return this;
            },
            getResult() {
                return this.value;
            }
        };
    }
}

// ************ COMMON INTERVIEW QUESTIONS ************

class InterviewQuestions {
    // 1. Implement debounce
    static debounce(fn, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // 2. Implement throttle
    static throttle(fn, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // 3. Implement once
    static once(fn) {
        let called = false;
        let result;
        return function (...args) {
            if (!called) {
                called = true;
                result = fn.apply(this, args);
            }
            return result;
        };
    }
}

// ************ PRACTICAL EXERCISES ************

// Exercise 1: Create a function pipeline
function pipeline(...functions) {
    return function(input) {
        return functions.reduce((result, fn) => fn(result), input);
    };
}

// Exercise 2: Implement async retry mechanism
async function retry(fn, attempts = 3, delay = 1000) {
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === attempts - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Exercise 3: Create an event emitter
class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(callback);
    }

    emit(event, data) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(callback => callback(data));
        }
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Deep understanding of function types and creation
2. Mastery of scope and closures
3. Understanding of 'this' context
4. Advanced function patterns and techniques

NEXT STEPS:
1. Practice function composition
2. Experiment with closures
3. Implement common patterns
4. Move on to Objects and OOP (05_Objects_OOP.js)

INTERVIEW PREPARATION:
1. Study closure examples
2. Practice implementing common patterns
3. Understand scope chain
4. Master 'this' binding scenarios
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        ParameterExamples,
        ScopeExamples,
        ThisContextExamples,
        AdvancedFunctions,
        FunctionPatterns,
        InterviewQuestions,
        pipeline,
        retry,
        EventEmitter
    };
} 