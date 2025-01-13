// ******************** PERFORMANCE OPTIMIZATION ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. JavaScript fundamentals
2. Memory management
3. Async programming
4. Browser rendering
*/

// ************ CODE OPTIMIZATION ************

class CodeOptimization {
    // 1. Loop Optimization
    static optimizeLoop(array) {
        const length = array.length;  // Cache length
        for (let i = 0; i < length; i++) {
            // Using cached length and increment operator
        }
    }

    // 2. Function Optimization
    static memoize(fn) {
        const cache = new Map();
        
        return (...args) => {
            const key = JSON.stringify(args);
            if (cache.has(key)) return cache.get(key);
            
            const result = fn.apply(this, args);
            cache.set(key, result);
            return result;
        };
    }

    // 3. String Concatenation
    static optimizeStrings() {
        // Bad
        let str = '';
        for (let i = 0; i < 1000; i++) {
            str += i;  // Creates new string each time
        }

        // Better
        const arr = [];
        for (let i = 0; i < 1000; i++) {
            arr.push(i);
        }
        return arr.join('');
    }
}

// ************ DOM PERFORMANCE ************

class DOMPerformance {
    // 1. Batch DOM Operations
    static batchUpdates(elements, updateFn) {
        const fragment = document.createDocumentFragment();
        
        elements.forEach(element => {
            const clone = element.cloneNode(true);
            updateFn(clone);
            fragment.appendChild(clone);
        });
        
        elements[0].parentNode.replaceChildren(fragment);
    }

    // 2. Virtual DOM Implementation
    static createVirtualDOM(element) {
        return {
            type: element.tagName.toLowerCase(),
            props: Array.from(element.attributes).reduce((props, attr) => {
                props[attr.name] = attr.value;
                return props;
            }, {}),
            children: Array.from(element.childNodes).map(node => 
                node.nodeType === 3 ? node.textContent : this.createVirtualDOM(node)
            )
        };
    }

    // 3. Efficient Event Handling
    static delegateEvents(container, selector, eventType, handler) {
        container.addEventListener(eventType, event => {
            if (event.target.matches(selector)) {
                handler(event);
            }
        });
    }
}

// ************ RESOURCE LOADING ************

class ResourceOptimization {
    // 1. Lazy Loading
    static lazyLoadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    // 2. Resource Preloading
    static preloadResources(urls) {
        urls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            link.as = this.getResourceType(url);
            document.head.appendChild(link);
        });
    }

    // 3. Dynamic Import
    static async loadModule(path) {
        try {
            const module = await import(path);
            return module;
        } catch (error) {
            console.error('Module loading failed:', error);
            throw error;
        }
    }

    static getResourceType(url) {
        const extension = url.split('.').pop();
        const types = {
            js: 'script',
            css: 'style',
            png: 'image',
            jpg: 'image',
            jpeg: 'image',
            gif: 'image',
            woff2: 'font',
            woff: 'font'
        };
        return types[extension] || 'fetch';
    }
}

// ************ RENDERING OPTIMIZATION ************

class RenderingOptimization {
    // 1. RequestAnimationFrame Usage
    static animate(element, property, target, duration) {
        const start = performance.now();
        const initial = parseFloat(getComputedStyle(element)[property]);
        
        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = initial + (target - initial) * progress;
            element.style[property] = `${current}px`;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // 2. Debounce and Throttle
    static debounce(fn, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    static throttle(fn, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // 3. Layout Optimization
    static optimizeLayout(element) {
        // Read
        const measurements = {
            height: element.offsetHeight,
            width: element.offsetWidth
        };

        // Write
        requestAnimationFrame(() => {
            element.style.height = `${measurements.height * 2}px`;
            element.style.width = `${measurements.width * 2}px`;
        });
    }
}

// ************ MEMORY AND GARBAGE COLLECTION ************

class MemoryOptimization {
    // 1. Object Pooling
    static createObjectPool(factory, size) {
        const pool = Array(size).fill(null).map(() => ({
            object: factory(),
            inUse: false
        }));

        return {
            acquire() {
                const available = pool.find(item => !item.inUse);
                if (available) {
                    available.inUse = true;
                    return available.object;
                }
                return null;
            },
            
            release(object) {
                const poolItem = pool.find(item => item.object === object);
                if (poolItem) {
                    poolItem.inUse = false;
                }
            }
        };
    }

    // 2. Memory Leak Prevention
    static preventLeaks() {
        // Remove event listeners
        const cleanup = new Set();
        
        return {
            addEventListener(element, type, handler) {
                element.addEventListener(type, handler);
                cleanup.add(() => element.removeEventListener(type, handler));
            },
            
            cleanup() {
                cleanup.forEach(fn => fn());
                cleanup.clear();
            }
        };
    }

    // 3. Efficient Data Structures
    static createEfficientCache(maxSize) {
        return new Map();  // Using Map instead of object for better performance
    }
}

// ************ PERFORMANCE MONITORING ************

class PerformanceMonitoring {
    // 1. Performance Metrics
    static measurePerformance(fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        return {
            result,
            duration: end - start
        };
    }

    // 2. Memory Usage
    static getMemoryUsage() {
        if (performance.memory) {
            return {
                jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
                totalJSHeapSize: performance.memory.totalJSHeapSize,
                usedJSHeapSize: performance.memory.usedJSHeapSize
            };
        }
        return null;
    }

    // 3. Performance Marks
    static async measureAsyncOperation(operation) {
        performance.mark('start');
        
        try {
            const result = await operation();
            performance.mark('end');
            
            const measure = performance.measure('operation', 'start', 'end');
            return {
                result,
                duration: measure.duration
            };
        } finally {
            performance.clearMarks();
            performance.clearMeasures();
        }
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding performance optimization
2. Implementation of efficient code
3. Resource management techniques
4. Performance monitoring skills

NEXT STEPS:
1. Practice optimization techniques
2. Implement performance monitoring
3. Study browser profiling
4. Move on to Browser APIs (19_Browser_APIs.js)

INTERVIEW PREPARATION:
1. Study optimization patterns
2. Practice performance tuning
3. Understand browser rendering
4. Master memory management
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        CodeOptimization,
        DOMPerformance,
        ResourceOptimization,
        RenderingOptimization,
        MemoryOptimization,
        PerformanceMonitoring
    };
} 