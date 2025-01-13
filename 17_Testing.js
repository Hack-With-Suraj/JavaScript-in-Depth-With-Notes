// ******************** TESTING IN JAVASCRIPT ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. JavaScript fundamentals
2. Functions and objects
3. Asynchronous programming
4. Error handling
*/

// ************ TESTING FUNDAMENTALS ************

class TestRunner {
    constructor() {
        this.tests = new Map();
        this.beforeEach = null;
        this.afterEach = null;
    }

    // Add test case
    test(name, testFn) {
        this.tests.set(name, testFn);
    }

    // Setup function to run before each test
    before(fn) {
        this.beforeEach = fn;
    }

    // Cleanup function to run after each test
    after(fn) {
        this.afterEach = fn;
    }

    // Run all tests
    async runTests() {
        const results = {
            passed: 0,
            failed: 0,
            total: this.tests.size,
            failures: []
        };

        for (const [name, testFn] of this.tests) {
            try {
                if (this.beforeEach) await this.beforeEach();
                await testFn();
                if (this.afterEach) await this.afterEach();
                results.passed++;
                console.log(`✓ ${name}`);
            } catch (error) {
                results.failed++;
                results.failures.push({ name, error });
                console.error(`✗ ${name}: ${error.message}`);
            }
        }

        return results;
    }
}

// ************ ASSERTION LIBRARY ************

class Assertions {
    static assertEquals(actual, expected) {
        if (actual !== expected) {
            throw new Error(`Expected ${expected} but got ${actual}`);
        }
    }

    static assertDeepEquals(actual, expected) {
        const actualStr = JSON.stringify(actual);
        const expectedStr = JSON.stringify(expected);
        if (actualStr !== expectedStr) {
            throw new Error(`Expected ${expectedStr} but got ${actualStr}`);
        }
    }

    static assertTruthy(value) {
        if (!value) {
            throw new Error(`Expected truthy value but got ${value}`);
        }
    }

    static assertFalsy(value) {
        if (value) {
            throw new Error(`Expected falsy value but got ${value}`);
        }
    }

    static assertThrows(fn) {
        try {
            fn();
            throw new Error('Expected function to throw');
        } catch (error) {
            return error;
        }
    }

    static async assertRejects(promise) {
        try {
            await promise;
            throw new Error('Expected promise to reject');
        } catch (error) {
            return error;
        }
    }
}

// ************ MOCKING AND STUBBING ************

class MockFactory {
    static createMock(methods = {}) {
        const calls = new Map();
        const mock = {};

        for (const [method, implementation] of Object.entries(methods)) {
            calls.set(method, []);
            mock[method] = (...args) => {
                calls.get(method).push(args);
                return typeof implementation === 'function' 
                    ? implementation(...args)
                    : implementation;
            };
        }

        mock._calls = calls;
        mock.getCallCount = (method) => calls.get(method)?.length || 0;
        mock.getCallArgs = (method, index = 0) => calls.get(method)?.[index];

        return mock;
    }

    static spyOn(obj, method) {
        const original = obj[method];
        const calls = [];

        obj[method] = (...args) => {
            calls.push(args);
            return original.apply(obj, args);
        };

        obj[method]._calls = calls;
        obj[method].getCallCount = () => calls.length;
        obj[method].getCallArgs = (index = 0) => calls[index];
        obj[method].restore = () => obj[method] = original;

        return obj[method];
    }
}

// ************ TEST DOUBLES ************

class TestDoubles {
    // Stub - Simple replacement with canned answers
    static createStub(returnValue) {
        return () => returnValue;
    }

    // Spy - Wrapper that records calls
    static createSpy(fn) {
        const calls = [];
        const spy = (...args) => {
            calls.push(args);
            return fn?.(...args);
        };
        spy.calls = calls;
        return spy;
    }

    // Fake - Working implementation but not suitable for production
    static createFakeStorage() {
        const storage = new Map();
        return {
            getItem: (key) => storage.get(key),
            setItem: (key, value) => storage.set(key, value),
            clear: () => storage.clear()
        };
    }
}

// ************ ASYNC TESTING ************

class AsyncTestUtils {
    // Wait for a condition to be true
    static async waitFor(condition, timeout = 5000) {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            if (await condition()) return true;
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        throw new Error('Timeout waiting for condition');
    }

    // Create a deferred promise
    static createDeferred() {
        let resolve, reject;
        const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return { promise, resolve, reject };
    }

    // Mock timing functions
    static mockTimers() {
        const timers = new Set();
        const original = {
            setTimeout: global.setTimeout,
            clearTimeout: global.clearTimeout
        };

        global.setTimeout = (fn, delay) => {
            const timer = original.setTimeout(fn, delay);
            timers.add(timer);
            return timer;
        };

        global.clearTimeout = (timer) => {
            timers.delete(timer);
            return original.clearTimeout(timer);
        };

        return {
            restore: () => {
                global.setTimeout = original.setTimeout;
                global.clearTimeout = original.clearTimeout;
            },
            clear: () => {
                timers.forEach(timer => original.clearTimeout(timer));
                timers.clear();
            }
        };
    }
}

// ************ PRACTICAL EXAMPLES ************

// Example 1: Testing a User Service
class UserService {
    constructor(api) {
        this.api = api;
    }

    async getUser(id) {
        const response = await this.api.get(`/users/${id}`);
        return response.data;
    }
}

class UserServiceTests {
    static async run() {
        const runner = new TestRunner();
        
        runner.before(async () => {
            this.api = MockFactory.createMock({
                get: async (url) => ({ data: { id: 1, name: 'Test User' } })
            });
            this.service = new UserService(this.api);
        });

        runner.test('should fetch user by id', async () => {
            const user = await this.service.getUser(1);
            Assertions.assertEquals(user.id, 1);
            Assertions.assertEquals(user.name, 'Test User');
        });

        return runner.runTests();
    }
}

// Example 2: Testing Event Emitter
class EventEmitterTests {
    static async run() {
        const runner = new TestRunner();
        
        runner.test('should emit and handle events', () => {
            const emitter = new EventEmitter();
            const spy = TestDoubles.createSpy();
            
            emitter.on('test', spy);
            emitter.emit('test', 'data');
            
            Assertions.assertEquals(spy.calls.length, 1);
            Assertions.assertEquals(spy.calls[0][0], 'data');
        });

        return runner.runTests();
    }
}

// Example 3: Testing Async Operations
class AsyncTests {
    static async run() {
        const runner = new TestRunner();
        
        runner.test('should handle async operations', async () => {
            const deferred = AsyncTestUtils.createDeferred();
            setTimeout(() => deferred.resolve('done'), 100);
            
            const result = await deferred.promise;
            Assertions.assertEquals(result, 'done');
        });

        return runner.runTests();
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of testing fundamentals
2. Implementation of test runners
3. Mastery of mocking and stubbing
4. Async testing techniques

NEXT STEPS:
1. Practice writing tests
2. Implement test coverage
3. Study testing frameworks
4. Move on to Performance Optimization (18_Performance.js)

INTERVIEW PREPARATION:
1. Study testing patterns
2. Practice test implementation
3. Understand mocking
4. Master async testing
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        TestRunner,
        Assertions,
        MockFactory,
        TestDoubles,
        AsyncTestUtils,
        UserService,
        UserServiceTests,
        EventEmitterTests,
        AsyncTests
    };
} 