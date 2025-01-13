// ******************** OBJECTS AND OOP IN JAVASCRIPT ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. Functions and scope
2. This keyword
3. Prototypes basics
4. ES6+ features
*/

// ************ OBJECT FUNDAMENTALS ************

// 1. Object Creation
const literalObject = {
    property: 'value',
    method() {
        return this.property;
    }
};

// 2. Constructor Function
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 3. Class Syntax (ES6+)
class ModernPerson {
    #privateField; // Private field (ES2022+)

    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.#privateField = 'private';
    }

    getInfo() {
        return `${this.name}, ${this.age}`;
    }
}

// ************ OBJECT PROPERTIES AND DESCRIPTORS ************

class PropertyExamples {
    static demonstrateDescriptors() {
        const obj = {};

        // Data descriptor
        Object.defineProperty(obj, 'readOnly', {
            value: 'cannot change this',
            writable: false,
            enumerable: true,
            configurable: false
        });

        // Accessor descriptor
        let hidden = 'secret';
        Object.defineProperty(obj, 'accessorProp', {
            get() { return hidden; },
            set(value) { hidden = value; },
            enumerable: true,
            configurable: true
        });

        return obj;
    }

    // Property attributes demonstration
    static propertyFlags() {
        const obj = {
            regular: 'enumerable, writable, configurable'
        };

        Object.defineProperties(obj, {
            readOnly: {
                value: 'cannot modify',
                writable: false
            },
            hidden: {
                value: 'non-enumerable',
                enumerable: false
            },
            locked: {
                value: 'non-configurable',
                configurable: false
            }
        });

        return obj;
    }
}

// ************ INHERITANCE AND PROTOTYPE CHAIN ************

class InheritanceExamples {
    // 1. Prototypal Inheritance
    static createPrototypeChain() {
        function Animal(name) {
            this.name = name;
        }

        Animal.prototype.speak = function() {
            return `${this.name} makes a sound`;
        };

        function Dog(name, breed) {
            Animal.call(this, name);
            this.breed = breed;
        }

        Dog.prototype = Object.create(Animal.prototype);
        Dog.prototype.constructor = Dog;

        return { Animal, Dog };
    }

    // 2. Class Inheritance (Modern)
    static createClassInheritance() {
        class Animal {
            constructor(name) {
                this.name = name;
            }

            speak() {
                return `${this.name} makes a sound`;
            }
        }

        class Dog extends Animal {
            constructor(name, breed) {
                super(name);
                this.breed = breed;
            }

            speak() {
                return `${this.name} barks`;
            }
        }

        return { Animal, Dog };
    }
}

// ************ ADVANCED OOP CONCEPTS ************

// 1. Mixins
const speakerMixin = {
    speak() {
        return `${this.name} is speaking`;
    }
};

const moverMixin = {
    move() {
        return `${this.name} is moving`;
    }
};

// 2. Factory Functions
function createGameEntity(name, type) {
    // Private variables
    let health = 100;
    
    // Shared methods through prototype
    const proto = {
        getHealth() { return health; },
        takeDamage(amount) {
            health = Math.max(0, health - amount);
        }
    };

    return Object.assign(
        Object.create(proto),
        {
            name,
            type,
            isAlive() { return health > 0; }
        }
    );
}

// 3. Composition over Inheritance
class EntityComposition {
    static compose(...mixins) {
        return target => Object.assign(target.prototype, ...mixins);
    }

    static createComposedEntity() {
        class ComposedEntity {
            constructor(name) {
                this.name = name;
            }
        }
        
        // Apply mixins without decorator
        EntityComposition.compose(speakerMixin, moverMixin)(ComposedEntity);
        return ComposedEntity;
    }
}

// ************ DESIGN PATTERNS ************

class DesignPatterns {
    // 1. Singleton
    static Singleton = (function() {
        let instance;

        function createInstance() {
            return {
                timestamp: Date.now()
            };
        }

        return {
            getInstance() {
                if (!instance) {
                    instance = createInstance();
                }
                return instance;
            }
        };
    })();

    // 2. Observer Pattern
    static createObservable() {
        return {
            observers: new Set(),
            
            subscribe(observer) {
                this.observers.add(observer);
            },
            
            unsubscribe(observer) {
                this.observers.delete(observer);
            },
            
            notify(data) {
                this.observers.forEach(observer => observer(data));
            }
        };
    }

    // 3. Module Pattern
    static createModule() {
        const privateVariable = 'private';
        
        return {
            publicMethod() {
                return privateVariable;
            }
        };
    }
}

// ************ COMMON INTERVIEW QUESTIONS ************

class InterviewQuestions {
    // 1. Implement deep clone
    static deepClone(obj, hash = new WeakMap()) {
        if (Object(obj) !== obj) return obj; // primitives
        if (hash.has(obj)) return hash.get(obj); // cyclic reference
        
        const result = Array.isArray(obj) ? [] : {};
        hash.set(obj, result);
        
        Object.entries(obj).forEach(([key, value]) => {
            result[key] = this.deepClone(value, hash);
        });
        
        return result;
    }

    // 2. Implement inheritance
    static createInheritance(Child, Parent) {
        Child.prototype = Object.create(Parent.prototype);
        Child.prototype.constructor = Child;
        return Child;
    }

    // 3. Implement private properties
    static createPrivateProperties() {
        const privateProps = new WeakMap();
        
        class PrivateExample {
            constructor() {
                privateProps.set(this, {
                    hidden: 'private value'
                });
            }

            getPrivate() {
                return privateProps.get(this).hidden;
            }
        }

        return PrivateExample;
    }
}

// ************ PRACTICAL EXERCISES ************

// Exercise 1: Create an object pool
class ObjectPool {
    constructor(createFn, initialSize = 5) {
        this.createFn = createFn;
        this.pool = Array(initialSize).fill().map(() => createFn());
    }

    acquire() {
        return this.pool.pop() || this.createFn();
    }

    release(obj) {
        this.pool.push(obj);
    }
}

// Exercise 2: Implement method chaining
class Calculator {
    constructor() {
        this.value = 0;
    }

    add(n) {
        this.value += n;
        return this;
    }

    subtract(n) {
        this.value -= n;
        return this;
    }

    getResult() {
        return this.value;
    }
}

// Exercise 3: Create a proxy-based validation
function createValidatedObject(schema) {
    return new Proxy({}, {
        set(target, prop, value) {
            if (schema[prop]) {
                if (schema[prop](value)) {
                    target[prop] = value;
                    return true;
                }
                throw new Error(`Invalid value for ${prop}`);
            }
            return false;
        }
    });
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Deep understanding of objects and OOP in JavaScript
2. Mastery of inheritance patterns
3. Understanding of design patterns
4. Advanced object manipulation techniques

NEXT STEPS:
1. Practice implementing design patterns
2. Experiment with different inheritance approaches
3. Build complex object-oriented systems
4. Move on to Arrays and Array Methods (06_Arrays.js)

INTERVIEW PREPARATION:
1. Study inheritance patterns
2. Practice implementing design patterns
3. Understand object descriptors
4. Master object manipulation
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        PropertyExamples,
        InheritanceExamples,
        DesignPatterns,
        InterviewQuestions,
        ObjectPool,
        Calculator,
        createValidatedObject
    };
} 