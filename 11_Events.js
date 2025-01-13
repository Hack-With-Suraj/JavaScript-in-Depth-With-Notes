// ******************** EVENTS AND EVENT HANDLING ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. DOM manipulation
2. Functions and callbacks
3. Asynchronous programming basics
4. Object-oriented concepts
*/

// ************ EVENT FUNDAMENTALS ************

class EventBasics {
    // 1. Event Types
    static commonEvents = {
        mouse: ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout'],
        keyboard: ['keydown', 'keyup', 'keypress'],
        form: ['submit', 'change', 'focus', 'blur'],
        window: ['load', 'unload', 'resize', 'scroll'],
        document: ['DOMContentLoaded'],
        custom: ['customEvent']
    };

    // 2. Event Registration
    static registerEvents(element) {
        // Modern way (preferred)
        element.addEventListener('click', this.handleClick);
        
        // Legacy way (avoid)
        element.onclick = this.handleClick;
        
        // Multiple listeners
        element.addEventListener('click', this.handleClick1);
        element.addEventListener('click', this.handleClick2);
    }

    // 3. Event Handler Functions
    static handleClick(event) {
        console.log('Click event:', event);
    }
}

// ************ EVENT OBJECT ************

class EventObjectExplorer {
    // 1. Common Event Properties
    static exploreEventObject(event) {
        return {
            type: event.type,               // Event type (e.g., "click")
            target: event.target,           // Element that triggered the event
            currentTarget: event.currentTarget, // Element handling the event
            timeStamp: event.timeStamp,     // Time event was created
            bubbles: event.bubbles,         // Whether event bubbles up
            cancelable: event.cancelable    // Whether event can be canceled
        };
    }

    // 2. Event Methods
    static eventMethods(event) {
        event.preventDefault();     // Prevent default behavior
        event.stopPropagation();   // Stop event bubbling
        event.stopImmediatePropagation(); // Stop other handlers
    }

    // 3. Specific Event Properties
    static specificEventProperties() {
        return {
            mouse: (event) => ({
                clientX: event.clientX,
                clientY: event.clientY,
                button: event.button
            }),
            keyboard: (event) => ({
                key: event.key,
                code: event.code,
                altKey: event.altKey,
                ctrlKey: event.ctrlKey
            }),
            form: (event) => ({
                formData: new FormData(event.target),
                submitter: event.submitter
            })
        };
    }
}

// ************ EVENT PROPAGATION ************

class EventPropagation {
    // 1. Event Flow Phases
    static demonstrateEventFlow() {
        // Capturing phase
        element.addEventListener('click', this.handleCapture, true);
        
        // Bubbling phase (default)
        element.addEventListener('click', this.handleBubble);
        
        // Stop propagation
        element.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

    // 2. Event Delegation
    static implementEventDelegation(container) {
        container.addEventListener('click', (event) => {
            const target = event.target;
            
            if (target.matches('.button')) {
                this.handleButtonClick(target);
            } else if (target.matches('.link')) {
                this.handleLinkClick(target);
            }
        });
    }

    // 3. Custom Event Propagation
    static createCustomEvent() {
        const event = new CustomEvent('myEvent', {
            bubbles: true,
            cancelable: true,
            detail: { data: 'Custom data' }
        });
        
        element.dispatchEvent(event);
    }
}

// ************ EVENT PATTERNS ************

class EventPatterns {
    // 1. Event Hub (Pub/Sub)
    static createEventHub() {
        return {
            events: {},
            
            subscribe(event, callback) {
                if (!this.events[event]) this.events[event] = [];
                this.events[event].push(callback);
            },
            
            publish(event, data) {
                if (!this.events[event]) return;
                this.events[event].forEach(callback => callback(data));
            },
            
            unsubscribe(event, callback) {
                if (!this.events[event]) return;
                this.events[event] = this.events[event]
                    .filter(cb => cb !== callback);
            }
        };
    }

    // 2. Event Throttling
    static throttle(callback, limit) {
        let waiting = false;
        return function(...args) {
            if (!waiting) {
                callback.apply(this, args);
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, limit);
            }
        };
    }

    // 3. Event Debouncing
    static debounce(callback, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                callback.apply(this, args);
            }, delay);
        };
    }
}

// ************ ADVANCED EVENT HANDLING ************

class AdvancedEventHandling {
    // 1. Intersection Observer
    static createIntersectionObserver(callback) {
        return new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                }
            });
        });
    }

    // 2. Mutation Observer
    static createMutationObserver(callback) {
        return new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                callback(mutation);
            });
        });
    }

    // 3. Resize Observer
    static createResizeObserver(callback) {
        return new ResizeObserver((entries) => {
            entries.forEach(entry => {
                callback(entry);
            });
        });
    }
}

// ************ PRACTICAL EXERCISES ************

// Exercise 1: Implement Infinite Scroll
class InfiniteScroll {
    constructor(container, loadMore) {
        this.container = container;
        this.loadMore = loadMore;
        this.isLoading = false;
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !this.isLoading) {
                this.loadMoreItems();
            }
        }, options);

        observer.observe(this.container.lastElementChild);
    }

    async loadMoreItems() {
        this.isLoading = true;
        await this.loadMore();
        this.isLoading = false;
    }
}

// Exercise 2: Create a Custom Event System
class EventSystem {
    constructor() {
        this.listeners = new Map();
    }

    on(event, callback, options = {}) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add({ callback, options });
    }

    off(event, callback) {
        if (!this.listeners.has(event)) return;
        const listeners = this.listeners.get(event);
        listeners.forEach(listener => {
            if (listener.callback === callback) {
                listeners.delete(listener);
            }
        });
    }

    emit(event, data) {
        if (!this.listeners.has(event)) return;
        this.listeners.get(event).forEach(({ callback, options }) => {
            if (options.once) {
                this.off(event, callback);
            }
            callback(data);
        });
    }
}

// Exercise 3: Form Validation with Events
class FormValidator {
    constructor(form) {
        this.form = form;
        this.setupValidation();
    }

    setupValidation() {
        this.form.addEventListener('input', this.handleInput.bind(this));
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleInput(event) {
        const field = event.target;
        this.validateField(field);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validateForm()) {
            this.submitForm();
        }
    }

    validateField(field) {
        // Implementation of field validation
    }

    validateForm() {
        // Implementation of form validation
        return true;
    }

    async submitForm() {
        // Implementation of form submission
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of event handling mechanisms
2. Mastery of event propagation
3. Implementation of event patterns
4. Advanced event handling techniques

NEXT STEPS:
1. Practice event handling patterns
2. Implement custom event systems
3. Study browser events in depth
4. Move on to next module

INTERVIEW PREPARATION:
1. Study event propagation
2. Practice event delegation
3. Understand event loop
4. Master event optimization
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        EventBasics,
        EventObjectExplorer,
        EventPropagation,
        EventPatterns,
        AdvancedEventHandling,
        InfiniteScroll,
        EventSystem,
        FormValidator
    };
} 