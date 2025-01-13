// ******************** ERROR HANDLING AND DEBUGGING ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. Functions and scope
2. Objects and classes
3. Promises and async operations
4. Basic JavaScript syntax
*/

// ************ ERROR FUNDAMENTALS ************

class ErrorBasics {
    // 1. Built-in Error Types
    static demonstrateErrors() {
        const errors = {
            error: new Error('Generic error'),
            typeError: new TypeError('Type mismatch'),
            syntaxError: new SyntaxError('Invalid syntax'),
            referenceError: new ReferenceError('Variable not defined'),
            rangeError: new RangeError('Value out of range'),
            uriError: new URIError('Invalid URI')
        };
        return errors;
    }

    // 2. Custom Error Classes
    static createCustomError() {
        class BusinessError extends Error {
            constructor(message, code) {
                super(message);
                this.name = 'BusinessError';
                this.code = code;
                // Maintain proper stack trace
                Error.captureStackTrace(this, BusinessError);
            }
        }
        return BusinessError;
    }
}

// ************ ERROR HANDLING MECHANISMS ************

class ErrorHandling {
    // 1. Try-Catch Block
    static basicTryCatch() {
        try {
            throw new Error('Test error');
        } catch (error) {
            console.error('Caught:', error.message);
        } finally {
            console.log('Cleanup code');
        }
    }

    // 2. Async Error Handling
    static async asyncErrorHandling() {
        try {
            await Promise.reject(new Error('Async error'));
        } catch (error) {
            console.error('Caught async:', error.message);
        }
    }

    // 3. Error Propagation
    static errorPropagation() {
        const innerFunction = () => {
            throw new Error('Inner error');
        };

        const outerFunction = () => {
            try {
                innerFunction();
            } catch (error) {
                throw new Error(`Outer error: ${error.message}`);
            }
        };

        return outerFunction;
    }
}

// ************ DEBUGGING TECHNIQUES ************

class DebuggingTechniques {
    // 1. Console Methods
    static consoleDebugging() {
        console.log('Basic logging');
        console.info('Information');
        console.warn('Warning message');
        console.error('Error message');
        console.debug('Debug message');
        console.trace('Stack trace');
        console.table([{ id: 1, name: 'Test' }]);
        console.group('Group');
        console.groupEnd();
    }

    // 2. Debugger Statement
    static debuggerExample() {
        let x = 1;
        debugger; // Execution will pause here if dev tools are open
        x++;
        return x;
    }

    // 3. Performance Monitoring
    static performanceMonitoring() {
        console.time('operation');
        // Some operation
        console.timeEnd('operation');

        const performance = {
            start: performance.now(),
            // Operation
            end: performance.now(),
            duration: null
        };
        performance.duration = performance.end - performance.start;
        return performance;
    }
}

// ************ ERROR HANDLING PATTERNS ************

class ErrorPatterns {
    // 1. Error Handler Class
    static createErrorHandler() {
        class ErrorHandler {
            constructor() {
                this.handlers = new Map();
            }

            register(errorType, handler) {
                this.handlers.set(errorType, handler);
            }

            handle(error) {
                const handler = this.handlers.get(error.constructor);
                if (handler) {
                    return handler(error);
                }
                throw error; // Unhandled error type
            }
        }
        return ErrorHandler;
    }

    // 2. Error Boundary Pattern
    static createErrorBoundary() {
        class ErrorBoundary {
            constructor(fallback) {
                this.fallback = fallback;
            }

            async execute(operation) {
                try {
                    return await operation();
                } catch (error) {
                    console.error('Error boundary caught:', error);
                    return this.fallback();
                }
            }
        }
        return ErrorBoundary;
    }

    // 3. Retry Pattern
    static async retryOperation(operation, maxAttempts = 3, delay = 1000) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await operation();
            } catch (error) {
                if (attempt === maxAttempts) throw error;
                await new Promise(resolve => setTimeout(resolve, delay));
                console.warn(`Retry attempt ${attempt} of ${maxAttempts}`);
            }
        }
    }
}

// ************ ADVANCED ERROR HANDLING ************

class AdvancedErrorHandling {
    // 1. Global Error Handler
    static setupGlobalHandlers() {
        process.on('uncaughtException', (error) => {
            console.error('Uncaught Exception:', error);
            // Graceful shutdown
            process.exit(1);
        });

        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection:', reason);
        });
    }

    // 2. Error Recovery Strategies
    static recoveryStrategies = {
        retry: async (operation, maxAttempts) => {
            return ErrorPatterns.retryOperation(operation, maxAttempts);
        },

        circuitBreaker: (operation, threshold = 5) => {
            let failures = 0;
            let lastFailure = null;

            return async (...args) => {
                if (failures >= threshold) {
                    const timeSinceLastFailure = Date.now() - lastFailure;
                    if (timeSinceLastFailure < 60000) { // 1 minute
                        throw new Error('Circuit breaker open');
                    }
                    failures = 0;
                }

                try {
                    return await operation(...args);
                } catch (error) {
                    failures++;
                    lastFailure = Date.now();
                    throw error;
                }
            };
        }
    };

    // 3. Error Monitoring and Logging
    static createErrorLogger() {
        return {
            log(error, context = {}) {
                const errorLog = {
                    timestamp: new Date().toISOString(),
                    error: {
                        name: error.name,
                        message: error.message,
                        stack: error.stack
                    },
                    context
                };
                // In real application, would send to logging service
                console.error(JSON.stringify(errorLog, null, 2));
            }
        };
    }
}

// ************ DEBUGGING BEST PRACTICES ************

/*
1. Code Organization:
   - Use meaningful variable names
   - Keep functions small and focused
   - Add appropriate comments
   - Use proper error messages

2. Debugging Process:
   - Reproduce the error
   - Isolate the problem
   - Read the error message carefully
   - Check the stack trace
   - Use breakpoints strategically

3. Testing Considerations:
   - Write unit tests
   - Test error scenarios
   - Use error boundaries
   - Implement logging
*/

// ************ PRACTICAL EXERCISES ************

// Exercise 1: Create a robust API caller
class ApiCaller {
    constructor(baseUrl, options = {}) {
        this.baseUrl = baseUrl;
        this.options = options;
        this.errorLogger = AdvancedErrorHandling.createErrorLogger();
    }

    async call(endpoint, method = 'GET', body = null) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method,
                body: body ? JSON.stringify(body) : null,
                ...this.options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            this.errorLogger.log(error, { endpoint, method });
            throw error;
        }
    }
}

// Exercise 2: Implement error boundary HOF
function withErrorBoundary(fn, fallback) {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            console.error('Error in boundary:', error);
            return typeof fallback === 'function' ? fallback(error) : fallback;
        }
    };
}

// Exercise 3: Create a debug utility
class DebugUtility {
    constructor(namespace) {
        this.namespace = namespace;
        this.enabled = false;
    }

    enable() {
        this.enabled = true;
    }

    log(...args) {
        if (this.enabled) {
            console.log(`[${this.namespace}]`, ...args);
        }
    }

    error(...args) {
        if (this.enabled) {
            console.error(`[${this.namespace}]`, ...args);
        }
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of error handling mechanisms
2. Mastery of debugging techniques
3. Implementation of error patterns
4. Advanced error handling strategies

NEXT STEPS:
1. Practice error handling patterns
2. Implement logging systems
3. Study debugging tools
4. Move on to DOM Manipulation (09_DOM.js)

INTERVIEW PREPARATION:
1. Study error handling patterns
2. Practice debugging scenarios
3. Understand error propagation
4. Master error recovery strategies
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        ErrorBasics,
        ErrorHandling,
        DebuggingTechniques,
        ErrorPatterns,
        AdvancedErrorHandling,
        ApiCaller,
        withErrorBoundary,
        DebugUtility
    };
} 