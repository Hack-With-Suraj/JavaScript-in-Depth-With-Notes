// ******************** STRING MANIPULATION AND REGULAR EXPRESSIONS ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. Basic JavaScript syntax
2. Arrays and array methods
3. Functions and methods
4. ES6+ features
*/

// ************ STRING FUNDAMENTALS ************

class StringBasics {
    // 1. String Creation
    static demonstrateCreation() {
        const literal = 'Hello';
        const template = `Template ${literal}`;
        const constructed = new String('Hello'); // Not recommended
        
        return {
            literal,
            template,
            constructed,
            isEqual: literal === constructed.toString()
        };
    }

    // 2. String Properties
    static stringProperties(str) {
        return {
            length: str.length,
            type: typeof str,
            isString: typeof str === 'string' || str instanceof String
        };
    }

    // 3. String Access
    static accessExamples(str) {
        return {
            firstChar: str.charAt(0),
            lastChar: str.charAt(str.length - 1),
            charCode: str.charCodeAt(0),
            codePoint: str.codePointAt(0)
        };
    }
}

// ************ STRING METHODS ************

class StringMethods {
    // 1. Search Methods
    static searchExamples(str, searchStr) {
        return {
            indexOf: str.indexOf(searchStr),
            lastIndexOf: str.lastIndexOf(searchStr),
            includes: str.includes(searchStr),
            startsWith: str.startsWith(searchStr),
            endsWith: str.endsWith(searchStr)
        };
    }

    // 2. Transformation Methods
    static transformationExamples(str) {
        return {
            upper: str.toUpperCase(),
            lower: str.toLowerCase(),
            trim: str.trim(),
            replace: str.replace('old', 'new'),
            replaceAll: str.replaceAll('all', 'none'),
            substring: str.substring(1, 4),
            slice: str.slice(1, -1),
            padStart: str.padStart(10, '0'),
            padEnd: str.padEnd(10, '0')
        };
    }

    // 3. Split and Join
    static splitJoinExamples(str) {
        const words = str.split(' ');
        const chars = str.split('');
        const joined = chars.join('-');
        
        return { words, chars, joined };
    }
}

// ************ REGULAR EXPRESSIONS ************

class RegExpBasics {
    // 1. RegExp Creation
    static createRegExp() {
        const literal = /pattern/gi;
        const constructed = new RegExp('pattern', 'gi');
        
        return { literal, constructed };
    }

    // 2. RegExp Patterns
    static commonPatterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\+?[\d\s-]{10,}$/,
        url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        date: /^\d{4}-\d{2}-\d{2}$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    };

    // 3. RegExp Methods
    static regExpMethods(pattern, str) {
        return {
            test: pattern.test(str),
            exec: pattern.exec(str),
            match: str.match(pattern),
            matchAll: [...str.matchAll(pattern)],
            search: str.search(pattern)
        };
    }
}

// ************ ADVANCED STRING MANIPULATION ************

class AdvancedStringOperations {
    // 1. Unicode and UTF-16
    static unicodeExamples() {
        return {
            emoji: '😀',
            surrogatePair: '\uD83D\uDE00',
            unicodeEscape: '\u{1F600}',
            length: '😀'.length // 2 (surrogate pair)
        };
    }

    // 2. Template Literals
    static templateLiteralExamples(name, age) {
        const multiline = `
            Name: ${name}
            Age: ${age}
        `;

        const tagged = this.tagFunction`Name: ${name}, Age: ${age}`;
        
        return { multiline, tagged };
    }

    // Tagged template function
    static tagFunction(strings, ...values) {
        return strings.reduce((result, str, i) => 
            result + str + (values[i] || ''), '');
    }

    // 3. String Iteration
    static iterationExamples(str) {
        const chars = [...str]; // Proper Unicode character splitting
        const codePoints = Array.from(str); // Alternative method
        
        return { chars, codePoints };
    }
}

// ************ PERFORMANCE OPTIMIZATION ************

class StringOptimization {
    // 1. String Concatenation
    static concatenationComparison(items) {
        // Bad (creates many intermediate strings)
        const bad = items.reduce((a, b) => a + b);
        
        // Good (uses join)
        const good = items.join('');
        
        // Also good (uses array and join)
        const builder = [];
        items.forEach(item => builder.push(item));
        const alsoGood = builder.join('');
        
        return { bad, good, alsoGood };
    }

    // 2. Regular Expression Optimization
    static regExpOptimization() {
        // Compile once, use many times
        const pattern = /^pattern$/;
        
        return {
            // Good (reuses compiled pattern)
            optimized: (str) => pattern.test(str),
            
            // Bad (compiles pattern each time)
            unoptimized: (str) => /^pattern$/.test(str)
        };
    }

    // 3. String Interning
    static stringIntern(str) {
        return String(str);
    }
}

// ************ COMMON INTERVIEW QUESTIONS ************

class StringInterviewQuestions {
    // 1. Palindrome Check
    static isPalindrome(str) {
        const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleaned === cleaned.split('').reverse().join('');
    }

    // 2. Anagram Check
    static areAnagrams(str1, str2) {
        const normalize = str => 
            str.toLowerCase()
               .replace(/[^a-z]/g, '')
               .split('')
               .sort()
               .join('');
               
        return normalize(str1) === normalize(str2);
    }

    // 3. String Compression
    static compress(str) {
        return str.replace(/(.)\1+/g, (match, char) => 
            char + match.length);
    }
}

// ************ PRACTICAL EXERCISES ************

// Exercise 1: Implement a string builder
class StringBuilder {
    constructor() {
        this.parts = [];
    }

    append(str) {
        this.parts.push(str);
        return this;
    }

    prepend(str) {
        this.parts.unshift(str);
        return this;
    }

    toString() {
        return this.parts.join('');
    }
}

// Exercise 2: Create a template engine
class TemplateEngine {
    static render(template, data) {
        return template.replace(/\${(.*?)}/g, (match, key) => 
            key.split('.').reduce((obj, key) => obj[key], data));
    }
}

// Exercise 3: Implement a regex-based parser
class SimpleParser {
    static parse(text, patterns) {
        const tokens = [];
        let remaining = text;
        
        while (remaining) {
            let matched = false;
            for (const [type, pattern] of Object.entries(patterns)) {
                const match = remaining.match(pattern);
                if (match && match.index === 0) {
                    tokens.push({ type, value: match[0] });
                    remaining = remaining.slice(match[0].length);
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                throw new Error(`Invalid token at: ${remaining}`);
            }
        }
        
        return tokens;
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Deep understanding of string manipulation
2. Mastery of regular expressions
3. Performance optimization techniques
4. Advanced string operations

NEXT STEPS:
1. Practice regex patterns
2. Implement string algorithms
3. Study string performance
4. Move on to Error Handling (08_Error_Handling.js)

INTERVIEW PREPARATION:
1. Study common string algorithms
2. Practice regex patterns
3. Understand string internals
4. Master string optimization
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        StringBasics,
        StringMethods,
        RegExpBasics,
        AdvancedStringOperations,
        StringOptimization,
        StringInterviewQuestions,
        StringBuilder,
        TemplateEngine,
        SimpleParser
    };
} 