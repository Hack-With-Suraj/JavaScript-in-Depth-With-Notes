// ******************** MEMORY MANAGEMENT IN JAVASCRIPT ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. JavaScript runtime environment
2. Variables and scope
3. Objects and references
4. Garbage collection basics
*/

// ************ MEMORY LIFECYCLE ************

class MemoryLifecycle {
    // 1. Memory Allocation
    static demonstrateAllocation() {
        // Primitive allocation
        const number = 42;                    // Number allocation
        const string = 'Hello';               // String allocation
        const boolean = true;                 // Boolean allocation

        // Object allocation
        const object = { key: 'value' };      // Object allocation
        const array = new Array(1000);        // Array allocation
        const date = new Date();              // Built-in object allocation

        return { number, string, boolean, object, array, date };
    }

    // 2. Memory Usage
    static demonstrateUsage() {
        const array = [];
        for (let i = 0; i < 1000; i++) {
            array.push({ id: i, data: 'some data' });
        }
        return array;
    }

    // 3. Memory Release
    static demonstrateRelease() {
        let obj = { data: 'will be garbage collected' };
        obj = null;  // Mark for garbage collection
        
        // Variables go out of scope
        {
            const localVar = { data: 'local' };
            // localVar will be eligible for GC after block
        }
    }
}

// ************ MEMORY LEAKS ************

class MemoryLeaks {
    // 1. Global Variables
    static demonstrateGlobalLeak() {
        // Bad practice
        globalVar = 'leaked to global scope';  // Without 'let' or 'const'
        
        // Better practice
        let properVariable = 'properly scoped';
    }

    // 2. Forgotten Callbacks
    static demonstrateCallbackLeak() {
        const element = document.getElementById('button');
        
        // Potential memory leak
        element.addEventListener('click', function() {
            // This callback holds reference to element
        });
        
        // Better: Remove listener when not needed
        const handler = () => console.log('clicked');
        element.addEventListener('click', handler);
        element.removeEventListener('click', handler);
    }

    // 3. Closures
    static demonstrateClosureLeak() {
        const heavyObject = { data: new Array(1000000) };
        
        // Closure keeps reference to heavyObject
        return function() {
            console.log(heavyObject.data.length);
        };
    }
}

// ************ MEMORY OPTIMIZATION ************

class MemoryOptimization {
    // 1. Object Pooling
    static createObjectPool(size) {
        const pool = new Array(size).fill(null).map(() => ({ inUse: false }));
        
        return {
            acquire() {
                const object = pool.find(obj => !obj.inUse);
                if (object) {
                    object.inUse = true;
                    return object;
                }
                return null;
            },
            
            release(object) {
                object.inUse = false;
            }
        };
    }

    // 2. Memory-Efficient Data Structures
    static createSparseArray() {
        return new Proxy({}, {
            get(target, prop) {
                return target[prop] || 0;
            }
        });
    }

    // 3. Weak References
    static demonstrateWeakReferences() {
        const cache = new WeakMap();
        
        const expensive = {
            data: new Array(1000000)
        };
        
        cache.set(expensive, 'cached data');
        // When expensive is null, cached data can be GC'd
    }
}

// ************ GARBAGE COLLECTION ************

class GarbageCollection {
    // 1. Mark and Sweep
    static demonstrateMarkAndSweep() {
        let obj1 = { ref: null };
        let obj2 = { ref: null };
        
        // Create circular reference
        obj1.ref = obj2;
        obj2.ref = obj1;
        
        // Break the reference
        obj1 = null;
        obj2 = null;
        // Objects are now eligible for GC
    }

    // 2. Reference Counting
    static demonstrateReferenceCount() {
        let object = { data: 'referenced' };
        let reference = object;  // Reference count: 2
        
        object = null;          // Reference count: 1
        reference = null;       // Reference count: 0, eligible for GC
    }

    // 3. Memory Pressure
    static simulateMemoryPressure() {
        const objects = [];
        
        try {
            while (true) {
                objects.push(new Array(1000000));
            }
        } catch (error) {
            console.log('Out of memory');
        }
    }
}

// ************ PERFORMANCE MONITORING ************

class MemoryMonitoring {
    // 1. Performance API
    static measureMemory() {
        if (performance.memory) {
            return {
                jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
                totalJSHeapSize: performance.memory.totalJSHeapSize,
                usedJSHeapSize: performance.memory.usedJSHeapSize
            };
        }
        return 'Memory API not available';
    }

    // 2. Memory Timeline
    static async trackMemoryUsage(duration = 1000, interval = 100) {
        const measurements = [];
        const start = Date.now();
        
        while (Date.now() - start < duration) {
            if (performance.memory) {
                measurements.push({
                    time: Date.now() - start,
                    used: performance.memory.usedJSHeapSize
                });
            }
            await new Promise(resolve => setTimeout(resolve, interval));
        }
        
        return measurements;
    }

    // 3. Memory Snapshots
    static takeMemorySnapshot() {
        // Note: This is a pseudo-implementation
        // Real snapshots would use Chrome DevTools or similar
        return {
            timestamp: Date.now(),
            memoryUsage: process.memoryUsage(),
            performance: performance.memory || {}
        };
    }
}

// ************ PRACTICAL EXERCISES ************

// Exercise 1: Implement a Memory-Efficient Cache
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}

// Exercise 2: Create a Memory-Efficient Event Emitter
class MemoryEfficientEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(callback);
        
        return () => this.off(event, callback);
    }

    off(event, callback) {
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.delete(callback);
            if (callbacks.size === 0) {
                this.events.delete(event);
            }
        }
    }

    emit(event, ...args) {
        const callbacks = this.events.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(...args));
        }
    }
}

// Exercise 3: Implement a Memory Monitor
class MemoryMonitor {
    constructor(threshold) {
        this.threshold = threshold;
        this.warnings = [];
    }

    monitor() {
        if (!performance.memory) return;
        
        const used = performance.memory.usedJSHeapSize;
        const total = performance.memory.jsHeapSizeLimit;
        
        if (used / total > this.threshold) {
            const warning = {
                timestamp: Date.now(),
                usage: used,
                percentage: (used / total) * 100
            };
            this.warnings.push(warning);
            console.warn('Memory usage high:', warning);
        }
    }

    getWarnings() {
        return [...this.warnings];
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of memory management
2. Memory leak prevention
3. Optimization techniques
4. Performance monitoring

NEXT STEPS:
1. Practice memory optimization
2. Implement monitoring tools
3. Study garbage collection
4. Move on to Security Best Practices (16_Security.js)

INTERVIEW PREPARATION:
1. Study memory lifecycle
2. Practice leak detection
3. Understand garbage collection
4. Master optimization techniques
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        MemoryLifecycle,
        MemoryLeaks,
        MemoryOptimization,
        GarbageCollection,
        MemoryMonitoring,
        LRUCache,
        MemoryEfficientEmitter,
        MemoryMonitor
    };
} 