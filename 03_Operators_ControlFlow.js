// ******************** OPERATORS AND CONTROL FLOW IN JAVASCRIPT ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. Variables and data types (from 02_Variables_DataTypes.js)
2. Basic JavaScript syntax
3. Type coercion concepts
*/

// ************ OPERATORS FUNDAMENTALS ************

class OperatorExamples {
    // 1. Arithmetic Operators
    static arithmeticOperations() {
        const addition = 5 + 3;        // 8
        const subtraction = 5 - 3;     // 2
        const multiplication = 5 * 3;   // 15
        const division = 15 / 3;       // 5
        const modulus = 17 % 5;        // 2
        const exponentiation = 2 ** 3;  // 8
        
        // Increment/Decrement
        let x = 5;
        const postIncrement = x++;     // Returns 5, then x becomes 6
        const preIncrement = ++x;      // x becomes 7, then returns 7
        
        return {
            addition,
            subtraction,
            multiplication,
            division,
            modulus,
            exponentiation,
            postIncrement,
            preIncrement
        };
    }

    // 2. Assignment Operators
    static assignmentOperations() {
        let x = 5;
        x += 3;  // x = x + 3
        x -= 2;  // x = x - 2
        x *= 4;  // x = x * 4
        x /= 2;  // x = x / 2
        x %= 3;  // x = x % 3
        x **= 2; // x = x ** 2
        
        return x;
    }

    // 3. Comparison Operators
    static comparisonOperations() {
        const equals = 5 == "5";           // true (loose equality)
        const strictEquals = 5 === "5";    // false (strict equality)
        const notEquals = 5 != "6";        // true
        const strictNotEquals = 5 !== "5"; // true
        const greaterThan = 5 > 3;         // true
        const lessThan = 5 < 8;            // true
        const greaterOrEqual = 5 >= 5;     // true
        const lessOrEqual = 5 <= 6;        // true
        
        return {
            equals,
            strictEquals,
            notEquals,
            strictNotEquals,
            greaterThan,
            lessThan,
            greaterOrEqual,
            lessOrEqual
        };
    }

    // 4. Logical Operators
    static logicalOperations() {
        const and = true && false;     // false
        const or = true || false;      // true
        const not = !true;             // false
        
        // Short-circuit evaluation
        const shortCircuit = false && someFunction(); // someFunction is not called
        const nullishCoalescing = null ?? "default"; // "default"
        const optionalChaining = obj?.property?.method?.(); // Safe property access
        
        return {
            and,
            or,
            not,
            nullishCoalescing
        };
    }
}

// ************ CONTROL FLOW STRUCTURES ************

class ControlFlowExamples {
    // 1. If-Else Statements
    static conditionalStatements(value) {
        if (value > 0) {
            return "Positive";
        } else if (value < 0) {
            return "Negative";
        } else {
            return "Zero";
        }
    }

    // 2. Switch Statement
    static switchExample(day) {
        switch (day.toLowerCase()) {
            case 'monday':
                return 'Start of work week';
            case 'friday':
                return 'End of work week';
            case 'saturday':
            case 'sunday':
                return 'Weekend';
            default:
                return 'Regular work day';
        }
    }

    // 3. Loops
    static loopExamples() {
        // For loop
        const forLoop = [];
        for (let i = 0; i < 5; i++) {
            forLoop.push(i);
        }

        // While loop
        const whileLoop = [];
        let i = 0;
        while (i < 5) {
            whileLoop.push(i++);
        }

        // Do-while loop
        const doWhileLoop = [];
        let j = 0;
        do {
            doWhileLoop.push(j++);
        } while (j < 5);

        // For...of loop (iterables)
        const forOf = [];
        for (const num of [1, 2, 3]) {
            forOf.push(num);
        }

        // For...in loop (object properties)
        const forIn = [];
        const obj = { a: 1, b: 2, c: 3 };
        for (const prop in obj) {
            forIn.push(prop);
        }

        return {
            forLoop,
            whileLoop,
            doWhileLoop,
            forOf,
            forIn
        };
    }
}

// ************ ADVANCED CONTROL FLOW ************

class AdvancedControlFlow {
    // 1. Try-Catch-Finally
    static errorHandling() {
        try {
            throw new Error('Example error');
        } catch (error) {
            console.error(error);
        } finally {
            console.log('Cleanup code');
        }
    }

    // 2. Break and Continue
    static breakContinueExample() {
        const results = [];
        
        // Break example
        for (let i = 0; i < 10; i++) {
            if (i === 5) break;
            results.push(i);
        }

        // Continue example
        const evenNumbers = [];
        for (let i = 0; i < 10; i++) {
            if (i % 2 !== 0) continue;
            evenNumbers.push(i);
        }

        return { results, evenNumbers };
    }

    // 3. Label Statements
    static labelExample() {
        const matrix = [];
        outerLoop: for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (i === 1 && j === 1) {
                    break outerLoop;
                }
                matrix.push([i, j]);
            }
        }
        return matrix;
    }
}

// ************ BEST PRACTICES ************

/*
1. Operator Usage:
   - Use === and !== over == and !=
   - Leverage short-circuit evaluation
   - Be careful with type coercion in operations
   - Use parentheses for operation precedence clarity

2. Control Flow:
   - Keep nesting levels minimal
   - Use early returns when possible
   - Prefer for...of over traditional for loops when possible
   - Use switch statements for multiple conditions on same variable

3. Error Handling:
   - Always include error handling for potential exceptions
   - Use specific error types
   - Clean up resources in finally blocks
   - Avoid empty catch blocks
*/

// ************ COMMON INTERVIEW QUESTIONS ************

class InterviewQuestions {
    // 1. Explain operator precedence
    static operatorPrecedence() {
        const result = 2 + 3 * 4;  // 14, not 20
        const withParens = (2 + 3) * 4;  // 20
        return { result, withParens };
    }

    // 2. Demonstrate short-circuit evaluation
    static shortCircuitEvaluation(obj) {
        // Safely access nested properties
        const result = obj?.user?.address?.street || 'No street found';
        return result;
    }

    // 3. Implement custom control flow
    static customIfImplementation(condition, onTrue, onFalse) {
        return condition ? onTrue() : onFalse();
    }
}

// ************ PRACTICAL EXERCISES ************

// Exercise 1: Implement a custom loop control
function customForEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array) === false) {
            break;
        }
    }
}

// Exercise 2: Create a safe navigation function
function safeNavigate(obj, path) {
    return path.split('.')
        .reduce((acc, part) => acc ? acc[part] : undefined, obj);
}

// Exercise 3: Implement a switch-like pattern matcher
function patternMatch(value, patterns) {
    for (const [predicate, handler] of patterns) {
        if (predicate(value)) {
            return handler(value);
        }
    }
    return patterns.get('default')?.(value);
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of JavaScript operators and their behavior
2. Mastery of control flow structures
3. Advanced error handling techniques
4. Best practices for flow control

NEXT STEPS:
1. Practice operator precedence
2. Experiment with different loop types
3. Implement custom control structures
4. Move on to Functions and Scope (04_Functions.js)

INTERVIEW PREPARATION:
1. Study operator precedence rules
2. Practice short-circuit evaluation
3. Understand different loop performance characteristics
4. Master error handling patterns
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        OperatorExamples,
        ControlFlowExamples,
        AdvancedControlFlow,
        InterviewQuestions,
        customForEach,
        safeNavigate,
        patternMatch
    };
} 