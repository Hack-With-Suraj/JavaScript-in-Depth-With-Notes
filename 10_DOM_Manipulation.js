// ******************** DOM MANIPULATION ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. Basic JavaScript syntax
2. Functions and events
3. Objects and methods
4. Error handling basics
*/

// ************ DOM FUNDAMENTALS ************

class DOMBasics {
    // 1. DOM Selection Methods
    static selectionMethods() {
        // Single element selectors
        const byId = document.getElementById('myId');
        const byQuery = document.querySelector('.myClass');
        
        // Multiple element selectors
        const byClass = document.getElementsByClassName('myClass');
        const byTag = document.getElementsByTagName('div');
        const byQueryAll = document.querySelectorAll('.myClass');

        return { byId, byQuery, byClass, byTag, byQueryAll };
    }

    // 2. DOM Traversal
    static traversalMethods(element) {
        return {
            parent: element.parentNode,
            children: element.children,
            firstChild: element.firstElementChild,
            lastChild: element.lastElementChild,
            nextSibling: element.nextElementSibling,
            previousSibling: element.previousElementSibling
        };
    }

    // 3. DOM Manipulation
    static manipulationMethods(element) {
        // Create
        const newElement = document.createElement('div');
        
        // Modify
        element.innerHTML = 'New content';
        element.textContent = 'Text content';
        element.setAttribute('class', 'newClass');
        
        // Insert
        element.appendChild(newElement);
        element.insertBefore(newElement, element.firstChild);
        
        // Remove
        element.removeChild(newElement);
        element.remove();
    }
}

// ************ ELEMENT PROPERTIES AND METHODS ************

class ElementManipulation {
    // 1. Style Manipulation
    static styleManipulation(element) {
        // Direct style
        element.style.backgroundColor = 'red';
        element.style.fontSize = '16px';

        // Classes
        element.classList.add('newClass');
        element.classList.remove('oldClass');
        element.classList.toggle('toggleClass');
        element.classList.contains('checkClass');

        // Get computed style
        const computedStyle = window.getComputedStyle(element);
        return computedStyle;
    }

    // 2. Attribute Manipulation
    static attributeMethods(element) {
        // Standard attributes
        element.setAttribute('id', 'newId');
        element.getAttribute('class');
        element.hasAttribute('data-custom');
        element.removeAttribute('style');

        // Dataset (data-* attributes)
        element.dataset.customValue = 'value';
        const dataValue = element.dataset.customValue;

        return { element, dataValue };
    }

    // 3. Content Manipulation
    static contentMethods(element) {
        // HTML content
        element.innerHTML = '<span>New HTML</span>';
        element.outerHTML = '<div>Replace entire element</div>';

        // Text content
        element.textContent = 'Plain text';
        element.innerText = 'Rendered text';

        // Value (for form elements)
        if (element instanceof HTMLInputElement) {
            element.value = 'New value';
        }
    }
}

// ************ EVENT HANDLING ************

class EventHandling {
    // 1. Event Listeners
    static eventListeners(element) {
        // Add event listener
        const handler = (event) => {
            console.log('Event handled:', event.type);
        };

        element.addEventListener('click', handler);
        element.addEventListener('mouseover', handler, { once: true });
        
        // Remove event listener
        element.removeEventListener('click', handler);

        // Event delegation
        document.addEventListener('click', (event) => {
            if (event.target.matches('.myClass')) {
                console.log('Delegated event');
            }
        });
    }

    // 2. Event Object Properties
    static eventProperties(event) {
        return {
            type: event.type,
            target: event.target,
            currentTarget: event.currentTarget,
            bubbles: event.bubbles,
            cancelable: event.cancelable,
            preventDefault: () => event.preventDefault(),
            stopPropagation: () => event.stopPropagation()
        };
    }

    // 3. Custom Events
    static customEvents() {
        const customEvent = new CustomEvent('myEvent', {
            detail: { data: 'Custom data' },
            bubbles: true,
            cancelable: true
        });

        return customEvent;
    }
}

// ************ ADVANCED DOM MANIPULATION ************

class AdvancedDOM {
    // 1. Fragment Manipulation
    static fragmentExample() {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < 100; i++) {
            const element = document.createElement('div');
            element.textContent = `Item ${i}`;
            fragment.appendChild(element);
        }

        document.body.appendChild(fragment); // Single reflow
    }

    // 2. DOM Mutation Observer
    static observeChanges(targetNode) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                console.log('DOM changed:', mutation.type);
            });
        });

        observer.observe(targetNode, {
            childList: true,
            attributes: true,
            subtree: true
        });

        return observer;
    }

    // 3. Virtual DOM Concept
    static createVirtualDOM(element) {
        return {
            type: element.tagName.toLowerCase(),
            props: Array.from(element.attributes).reduce((props, attr) => {
                props[attr.name] = attr.value;
                return props;
            }, {}),
            children: Array.from(element.children).map(child => 
                this.createVirtualDOM(child)
            )
        };
    }
}

// ************ PERFORMANCE OPTIMIZATION ************

class DOMPerformance {
    // 1. Batch DOM Updates
    static batchUpdates(elements, updateFn) {
        // Minimize reflows and repaints
        requestAnimationFrame(() => {
            elements.forEach(updateFn);
        });
    }

    // 2. Layout Thrashing Prevention
    static preventThrashing(elements) {
        // Read operations
        const measurements = elements.map(el => el.offsetHeight);
        
        // Write operations
        elements.forEach((el, i) => {
            el.style.height = `${measurements[i] * 2}px`;
        });
    }

    // 3. Efficient Event Handling
    static efficientEvents() {
        // Debounced event handler
        const debounced = this.debounce((event) => {
            console.log('Handled:', event.type);
        }, 250);

        // Throttled event handler
        const throttled = this.throttle((event) => {
            console.log('Handled:', event.type);
        }, 250);

        return { debounced, throttled };
    }

    static debounce(fn, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    }

    static throttle(fn, limit) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                fn(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ************ PRACTICAL EXERCISES ************

// Exercise 1: Create a dynamic list manager
class ListManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.items = new Set();
    }

    addItem(content) {
        const item = document.createElement('li');
        item.textContent = content;
        this.items.add(item);
        this.container.appendChild(item);
    }

    removeItem(content) {
        this.items.forEach(item => {
            if (item.textContent === content) {
                item.remove();
                this.items.delete(item);
            }
        });
    }
}

// Exercise 2: Implement infinite scroll
class InfiniteScroll {
    constructor(container, loadMore) {
        this.container = container;
        this.loadMore = loadMore;
        this.isLoading = false;
        this.setupScrollListener();
    }

    setupScrollListener() {
        const handler = DOMPerformance.throttle(async () => {
            const { scrollHeight, scrollTop, clientHeight } = this.container;
            if (scrollHeight - scrollTop - clientHeight < 100 && !this.isLoading) {
                this.isLoading = true;
                await this.loadMore();
                this.isLoading = false;
            }
        }, 250);

        this.container.addEventListener('scroll', handler);
    }
}

// Exercise 3: Create a form validator
class FormValidator {
    constructor(form) {
        this.form = form;
        this.errors = new Map();
        this.setupValidation();
    }

    setupValidation() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.submitForm();
            }
        });
    }

    validateForm() {
        this.errors.clear();
        let isValid = true;
        
        // Validate each field
        Array.from(this.form.elements).forEach(element => {
            if (!element.checkValidity()) {
                this.errors.set(element, element.validationMessage);
                isValid = false;
            }
        });

        this.displayErrors();
        return isValid;
    }

    displayErrors() {
        this.errors.forEach((message, element) => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            element.parentNode.appendChild(errorDiv);
        });
    }

    async submitForm() {
        try {
            const formData = new FormData(this.form);
            const response = await fetch(this.form.action, {
                method: this.form.method,
                body: formData
            });
            if (!response.ok) throw new Error('Submission failed');
        } catch (error) {
            console.error('Form submission error:', error);
        }
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of DOM manipulation
2. Mastery of event handling
3. Performance optimization techniques
4. Advanced DOM concepts

NEXT STEPS:
1. Practice DOM manipulation
2. Implement real-world examples
3. Study browser rendering
4. Move on to Events and Event Handling (10_Events.js)

INTERVIEW PREPARATION:
1. Study DOM traversal methods
2. Practice event handling
3. Understand performance implications
4. Master DOM optimization
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        DOMBasics,
        ElementManipulation,
        EventHandling,
        AdvancedDOM,
        DOMPerformance,
        ListManager,
        InfiniteScroll,
        FormValidator
    };
} 