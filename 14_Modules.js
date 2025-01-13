// ******************** MODULES AND MODULE PATTERNS ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. ES6+ features
2. Functions and closures
3. Object-oriented concepts
4. Scope and this keyword
*/

// ************ MODULE FUNDAMENTALS ************

// Named exports
export const constant = 42;
export function namedFunction() {
    return 'Named export';
}

// Default export
export default class DefaultExport {
    constructor() {
        this.name = 'Default export';
    }
}

// ************ MODULE PATTERNS ************

// 1. IIFE Module Pattern
const IIFEModule = (function() {
    // Private members
    const privateVariable = 'Private';
    function privateMethod() {
        return 'Private method';
    }

    // Public API
    return {
        publicVariable: 'Public',
        publicMethod() {
            return privateMethod();
        }
    };
})();

// 2. Revealing Module Pattern
const RevealingModule = (function() {
    // Private members
    let privateCounter = 0;
    
    function increment() {
        return ++privateCounter;
    }
    
    function decrement() {
        return --privateCounter;
    }
    
    function getCount() {
        return privateCounter;
    }

    // Reveal public API
    return {
        increment,
        decrement,
        getCount
    };
})();

// 3. ES6 Module Pattern
class ModuleExample {
    #privateField = 'private';
    
    constructor() {
        this.publicField = 'public';
    }

    #privateMethod() {
        return this.#privateField;
    }

    publicMethod() {
        return this.#privateMethod();
    }
}

// ************ MODULE LOADING PATTERNS ************

class ModuleLoader {
    // 1. Dynamic Import
    static async loadModule(modulePath) {
        try {
            const module = await import(modulePath);
            return module;
        } catch (error) {
            console.error('Module loading failed:', error);
            throw error;
        }
    }

    // 2. Conditional Loading
    static async conditionalLoad(condition, moduleA, moduleB) {
        try {
            const module = await import(condition ? moduleA : moduleB);
            return module;
        } catch (error) {
            console.error('Conditional loading failed:', error);
            throw error;
        }
    }

    // 3. Lazy Loading
    static lazyLoad(callback) {
        // Load module when needed
        return async function(...args) {
            const module = await import('./heavy-module.js');
            return callback.apply(this, [module, ...args]);
        };
    }
}

// ************ DEPENDENCY MANAGEMENT ************

class DependencyManager {
    constructor() {
        this.modules = new Map();
        this.dependencies = new Map();
    }

    // Register a module and its dependencies
    register(name, dependencies, implementation) {
        this.dependencies.set(name, dependencies);
        this.modules.set(name, implementation);
    }

    // Resolve dependencies
    require(name) {
        if (!this.modules.has(name)) {
            throw new Error(`Module ${name} not found`);
        }

        const dependencies = this.dependencies.get(name);
        const resolvedDeps = dependencies.map(dep => this.require(dep));
        
        return this.modules.get(name)(...resolvedDeps);
    }
}

// ************ ADVANCED MODULE PATTERNS ************

// 1. Submodules
const ModuleWithSubmodules = {
    SubmoduleA: {
        method() { return 'Submodule A'; }
    },
    SubmoduleB: {
        method() { return 'Submodule B'; }
    }
};

// 2. Augmentation Pattern
const BaseModule = (function() {
    return { version: '1.0' };
})();

const AugmentedModule = (function(module) {
    module.newFeature = function() {
        return 'New feature';
    };
    return module;
})(BaseModule);

// 3. Sandbox Pattern
class Sandbox {
    constructor(modules = []) {
        this.modules = new Map();
        modules.forEach(module => this.use(module));
    }

    use(module) {
        if (typeof module.init === 'function') {
            module.init(this);
        }
        this.modules.set(module.name, module);
    }

    get(moduleName) {
        return this.modules.get(moduleName);
    }
}

// ************ PRACTICAL IMPLEMENTATIONS ************

// 1. Feature Module
export const FeatureModule = {
    name: 'feature',
    init(sandbox) {
        return {
            activate() {
                console.log('Feature activated');
            },
            deactivate() {
                console.log('Feature deactivated');
            }
        };
    }
};

// 2. Service Module
export class ServiceModule {
    #api;
    
    constructor(config) {
        this.#api = config.apiUrl;
    }

    async getData() {
        try {
            const response = await fetch(this.#api);
            return response.json();
        } catch (error) {
            console.error('Service error:', error);
            throw error;
        }
    }
}

// 3. State Module
export const createStateModule = (initialState = {}) => {
    let state = { ...initialState };
    const listeners = new Set();

    return {
        getState() {
            return { ...state };
        },
        
        setState(newState) {
            state = { ...state, ...newState };
            listeners.forEach(listener => listener(state));
        },
        
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        }
    };
};

// ************ BEST PRACTICES ************

/*
1. Module Organization:
   - Keep modules focused and single-responsibility
   - Use clear naming conventions
   - Organize by feature rather than type
   - Keep module interfaces small and specific

2. Dependency Management:
   - Avoid circular dependencies
   - Use dependency injection when possible
   - Keep dependency graphs shallow
   - Document module dependencies

3. Performance:
   - Use dynamic imports for code splitting
   - Implement lazy loading for heavy modules
   - Consider module bundling for production
   - Optimize module load order

4. Testing:
   - Design modules with testability in mind
   - Mock external dependencies
   - Test module interfaces
   - Implement integration tests
*/

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of module patterns
2. Mastery of ES6 modules
3. Implementation of dependency management
4. Advanced module techniques

NEXT STEPS:
1. Practice module patterns
2. Implement real-world modules
3. Study module bundlers
4. Move on to Memory Management (15_Memory_Management.js)

INTERVIEW PREPARATION:
1. Study module patterns
2. Practice dependency injection
3. Understand module loading
4. Master module organization
*/

// Export for testing
export {
    IIFEModule,
    RevealingModule,
    ModuleExample,
    ModuleLoader,
    DependencyManager,
    ModuleWithSubmodules,
    AugmentedModule,
    Sandbox
}; 