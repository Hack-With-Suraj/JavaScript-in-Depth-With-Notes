// ******************** SECURITY BEST PRACTICES IN JAVASCRIPT ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. JavaScript fundamentals
2. DOM manipulation
3. Network requests
4. Data handling
*/

// ************ INPUT VALIDATION ************

class InputValidation {
    // 1. Basic Input Sanitization
    static sanitizeInput(input) {
        return String(input)
            .replace(/[<>]/g, '')  // Remove < and >
            .trim();
    }

    // 2. Type Validation
    static validateType(value, type) {
        switch (type) {
            case 'string':
                return typeof value === 'string';
            case 'number':
                return typeof value === 'number' && !isNaN(value);
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            case 'url':
                try {
                    new URL(value);
                    return true;
                } catch {
                    return false;
                }
            default:
                return false;
        }
    }

    // 3. Content Security
    static validateContent(content, rules) {
        return {
            length: content.length <= rules.maxLength,
            format: rules.allowedFormats.includes(content.type),
            size: content.size <= rules.maxSize
        };
    }
}

// ************ XSS PREVENTION ************

class XSSPrevention {
    // 1. HTML Escaping
    static escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // 2. Safe DOM Manipulation
    static safeInnerHTML(element, content) {
        // Use textContent instead of innerHTML
        element.textContent = content;
    }

    // 3. Content Security Policy
    static setupCSP() {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = `
            default-src 'self';
            script-src 'self';
            style-src 'self';
            img-src 'self' https:;
            connect-src 'self';
        `;
        document.head.appendChild(meta);
    }
}

// ************ CSRF PROTECTION ************

class CSRFProtection {
    // 1. Token Generation
    static generateToken() {
        return crypto.getRandomValues(new Uint8Array(32))
            .reduce((acc, val) => acc + val.toString(16).padStart(2, '0'), '');
    }

    // 2. Token Validation
    static validateToken(token, storedToken) {
        return token === storedToken && token.length === 64;
    }

    // 3. Request Protection
    static protectRequest(url, options = {}) {
        const token = this.generateToken();
        return {
            ...options,
            headers: {
                ...options.headers,
                'X-CSRF-Token': token,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };
    }
}

// ************ SECURE DATA STORAGE ************

class SecureStorage {
    // 1. Encryption Helper
    static async encrypt(data, key) {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(JSON.stringify(data));
        
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            encoder.encode(key),
            { name: 'AES-GCM' },
            false,
            ['encrypt']
        );

        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            cryptoKey,
            dataBuffer
        );

        return {
            data: Array.from(new Uint8Array(encrypted)),
            iv: Array.from(iv)
        };
    }

    // 2. Secure Local Storage
    static secureSet(key, value, secret) {
        return this.encrypt(value, secret)
            .then(encrypted => {
                localStorage.setItem(key, JSON.stringify(encrypted));
                return true;
            });
    }

    // 3. Session Management
    static manageSession(user, expiry) {
        const session = {
            user,
            expiry,
            lastAccess: Date.now()
        };

        sessionStorage.setItem('session', JSON.stringify(session));
        return session;
    }
}

// ************ API SECURITY ************

class APISecurityPractices {
    // 1. Request Validation
    static validateRequest(request) {
        return {
            method: ['GET', 'POST', 'PUT', 'DELETE'].includes(request.method),
            headers: request.headers.has('Authorization'),
            content: request.headers.get('Content-Type') === 'application/json'
        };
    }

    // 2. Rate Limiting
    static createRateLimiter(limit, interval) {
        const requests = new Map();
        
        return function(clientId) {
            const now = Date.now();
            const clientRequests = requests.get(clientId) || [];
            
            // Remove expired requests
            const validRequests = clientRequests.filter(time => 
                now - time < interval
            );
            
            if (validRequests.length >= limit) {
                return false;
            }
            
            validRequests.push(now);
            requests.set(clientId, validRequests);
            return true;
        };
    }

    // 3. Authentication Helper
    static async verifyJWT(token, secret) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            
            return {
                valid: payload.exp > Date.now() / 1000,
                payload
            };
        } catch (error) {
            return { valid: false, error };
        }
    }
}

// ************ SECURE CODING PRACTICES ************

class SecureCoding {
    // 1. Safe Object Creation
    static createSafeObject(data) {
        return Object.freeze({
            ...Object.create(null),
            ...data
        });
    }

    // 2. Safe Function Execution
    static safeExecute(fn, context = null, ...args) {
        try {
            return {
                result: fn.apply(context, args),
                error: null
            };
        } catch (error) {
            return {
                result: null,
                error: error.message
            };
        }
    }

    // 3. Secure Eval Alternative
    static secureEval(code, context = {}) {
        const fn = new Function('context', `
            with (context) {
                return (${code});
            }
        `);
        
        return this.safeExecute(fn, null, context);
    }
}

// ************ PRACTICAL EXERCISES ************

// Exercise 1: Implement Secure Form Handler
class SecureFormHandler {
    constructor(formElement) {
        this.form = formElement;
        this.setupValidation();
    }

    setupValidation() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    validateField(field) {
        const value = field.value;
        const type = field.dataset.type || 'string';
        
        return InputValidation.validateType(value, type);
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {};
        let isValid = true;

        for (const [key, value] of formData.entries()) {
            const field = this.form.elements[key];
            if (!this.validateField(field)) {
                isValid = false;
                break;
            }
            data[key] = InputValidation.sanitizeInput(value);
        }

        if (isValid) {
            await this.submitForm(data);
        }
    }

    async submitForm(data) {
        const options = CSRFProtection.protectRequest('/api/submit', {
            method: 'POST',
            body: JSON.stringify(data)
        });

        try {
            const response = await fetch('/api/submit', options);
            return response.json();
        } catch (error) {
            console.error('Form submission error:', error);
            throw error;
        }
    }
}

// Exercise 2: Create Secure API Client
class SecureAPIClient {
    constructor(baseURL, options = {}) {
        this.baseURL = baseURL;
        this.options = options;
        this.rateLimiter = APISecurityPractices.createRateLimiter(100, 60000);
    }

    async request(endpoint, options = {}) {
        if (!this.rateLimiter(this.options.clientId)) {
            throw new Error('Rate limit exceeded');
        }

        const secureOptions = CSRFProtection.protectRequest(endpoint, {
            ...this.options,
            ...options
        });

        const response = await fetch(`${this.baseURL}${endpoint}`, secureOptions);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return response.json();
    }
}

// Exercise 3: Implement Secure Storage Manager
class SecureStorageManager {
    constructor(secret) {
        this.secret = secret;
    }

    async set(key, value) {
        try {
            await SecureStorage.secureSet(key, value, this.secret);
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }

    async get(key) {
        try {
            const encrypted = JSON.parse(localStorage.getItem(key));
            if (!encrypted) return null;
            
            // Implement decryption logic here
            return encrypted;
        } catch (error) {
            console.error('Retrieval error:', error);
            return null;
        }
    }

    clear() {
        localStorage.clear();
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of security best practices
2. Implementation of security measures
3. Protection against common attacks
4. Secure data handling

NEXT STEPS:
1. Practice security implementations
2. Study common vulnerabilities
3. Implement security testing
4. Stay updated with security trends

INTERVIEW PREPARATION:
1. Study security concepts
2. Practice secure coding
3. Understand common attacks
4. Master security measures
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        InputValidation,
        XSSPrevention,
        CSRFProtection,
        SecureStorage,
        APISecurityPractices,
        SecureCoding,
        SecureFormHandler,
        SecureAPIClient,
        SecureStorageManager
    };
} 