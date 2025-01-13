// ******************** ASYNCHRONOUS JAVASCRIPT ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. Functions and callbacks
2. Event handling
3. Error handling
4. ES6+ features
*/

// ************ CALLBACK FUNDAMENTALS ************

class CallbackBasics {
    // 1. Basic Callback Pattern
    static executeCallback(callback) {
        setTimeout(() => {
            callback('Operation completed');
        }, 1000);
    }

    // 2. Error-First Callback Pattern (Node.js style)
    static readFileCallback(path, callback) {
        setTimeout(() => {
            if (!path) {
                callback(new Error('Invalid path'));
                return;
            }
            callback(null, 'File contents');
        }, 1000);
    }

    // 3. Callback Hell Example
    static callbackHell() {
        this.executeCallback(result1 => {
            this.executeCallback(result2 => {
                this.executeCallback(result3 => {
                    console.log('All operations completed');
                });
            });
        });
    }
}

// ************ PROMISES ************

class PromiseExamples {
    // 1. Creating Promises
    static createPromise() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = true;
                if (success) {
                    resolve('Operation successful');
                } else {
                    reject(new Error('Operation failed'));
                }
            }, 1000);
        });
    }

    // 2. Promise Methods
    static demonstratePromiseMethods() {
        // Promise.all
        const promiseAll = Promise.all([
            Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3)
        ]);

        // Promise.race
        const promiseRace = Promise.race([
            new Promise(resolve => setTimeout(() => resolve(1), 1000)),
            new Promise(resolve => setTimeout(() => resolve(2), 500))
        ]);

        // Promise.allSettled
        const promiseAllSettled = Promise.allSettled([
            Promise.resolve(1),
            Promise.reject('error'),
            Promise.resolve(3)
        ]);

        return { promiseAll, promiseRace, promiseAllSettled };
    }

    // 3. Promise Chaining
    static chainPromises() {
        return this.createPromise()
            .then(result => result.toUpperCase())
            .then(modified => `Modified: ${modified}`)
            .catch(error => console.error('Error:', error))
            .finally(() => console.log('Operation completed'));
    }
}

// ************ ASYNC/AWAIT ************

class AsyncAwaitExamples {
    // 1. Basic Async/Await
    static async fetchData() {
        try {
            const response = await fetch('https://api.example.com/data');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    // 2. Parallel Execution
    static async parallelFetch() {
        try {
            const [users, posts, comments] = await Promise.all([
                fetch('https://api.example.com/users').then(r => r.json()),
                fetch('https://api.example.com/posts').then(r => r.json()),
                fetch('https://api.example.com/comments').then(r => r.json())
            ]);
            return { users, posts, comments };
        } catch (error) {
            console.error('Parallel fetch error:', error);
            throw error;
        }
    }

    // 3. Sequential vs Parallel
    static async demonstrateExecutionTypes() {
        // Sequential execution
        const sequential = async () => {
            const result1 = await this.createPromise();
            const result2 = await this.createPromise();
            const result3 = await this.createPromise();
            return [result1, result2, result3];
        };

        // Parallel execution
        const parallel = async () => {
            const promises = [
                this.createPromise(),
                this.createPromise(),
                this.createPromise()
            ];
            return await Promise.all(promises);
        };

        return { sequential, parallel };
    }
}

// ************ ADVANCED ASYNCHRONOUS PATTERNS ************

class AdvancedAsyncPatterns {
    // 1. Async Iterator
    static async *asyncGenerator() {
        let count = 0;
        while (count < 3) {
            yield await new Promise(resolve => 
                setTimeout(() => resolve(count++), 1000)
            );
        }
    }

    // 2. Async Pool
    static async asyncPool(poolLimit, items, iteratorFn) {
        const pool = new Set();
        const results = [];

        for (const item of items) {
            const promise = iteratorFn(item);
            results.push(promise);
            pool.add(promise);

            if (pool.size >= poolLimit) {
                await Promise.race(pool);
            }

            promise.then(() => pool.delete(promise));
        }

        return Promise.all(results);
    }

    // 3. Cancellable Promise
    static createCancellablePromise(promise) {
        let isCancelled = false;

        const wrappedPromise = new Promise((resolve, reject) => {
            promise.then(
                value => isCancelled ? reject('Cancelled') : resolve(value),
                error => isCancelled ? reject('Cancelled') : reject(error)
            );
        });

        return {
            promise: wrappedPromise,
            cancel: () => { isCancelled = true; }
        };
    }
}

// ************ ERROR HANDLING IN ASYNC CODE ************

class AsyncErrorHandling {
    // 1. Promise Error Handling
    static handlePromiseErrors() {
        return this.createPromise()
            .catch(error => {
                console.error('Caught error:', error);
                return 'Default value';
            });
    }

    // 2. Async/Await Error Handling
    static async handleAsyncErrors() {
        try {
            await this.createPromise();
        } catch (error) {
            console.error('Caught async error:', error);
            throw new Error('Custom error');
        }
    }

    // 3. Global Error Handling
    static setupGlobalHandlers() {
        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection:', reason);
        });

        window.addEventListener('unhandledrejection', event => {
            console.error('Unhandled Rejection:', event.reason);
        });
    }
}

// ************ PRACTICAL EXERCISES ************

// Exercise 1: Implement Retry Mechanism
class RetryMechanism {
    static async retry(operation, maxAttempts = 3, delay = 1000) {
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

// Exercise 2: Implement Rate Limiter
class RateLimiter {
    constructor(maxRequests, timeWindow) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = [];
    }

    async throttle(fn) {
        const now = Date.now();
        this.requests = this.requests.filter(time => now - time < this.timeWindow);

        if (this.requests.length >= this.maxRequests) {
            const oldestRequest = this.requests[0];
            const waitTime = this.timeWindow - (now - oldestRequest);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        this.requests.push(now);
        return fn();
    }
}

// Exercise 3: Implement Async Queue
class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async enqueue(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.process();
        });
    }

    async process() {
        if (this.processing) return;
        this.processing = true;

        while (this.queue.length > 0) {
            const { task, resolve, reject } = this.queue.shift();
            try {
                const result = await task();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }

        this.processing = false;
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of asynchronous programming
2. Mastery of promises and async/await
3. Implementation of advanced async patterns
4. Error handling in async code

NEXT STEPS:
1. Practice async patterns
2. Implement real-world examples
3. Study advanced error handling
4. Move on to ES6+ Features (13_ES6_Features.js)

INTERVIEW PREPARATION:
1. Study event loop
2. Practice promise implementations
3. Understand async patterns
4. Master error handling
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        CallbackBasics,
        PromiseExamples,
        AsyncAwaitExamples,
        AdvancedAsyncPatterns,
        AsyncErrorHandling,
        RetryMechanism,
        RateLimiter,
        AsyncQueue
    };
} 