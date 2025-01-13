// ******************** WEB WORKERS ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. JavaScript fundamentals
2. Asynchronous programming
3. Browser APIs
4. Event handling
*/

// ************ WEB WORKER BASICS ************

class WorkerManager {
    constructor(workerScript) {
        this.worker = new Worker(workerScript);
        this.setupEventListeners();
    }

    // 1. Basic Communication
    setupEventListeners() {
        this.worker.onmessage = (event) => {
            console.log('Message from worker:', event.data);
        };

        this.worker.onerror = (error) => {
            console.error('Worker error:', error);
        };
    }

    // 2. Send Message to Worker
    postMessage(data) {
        this.worker.postMessage(data);
    }

    // 3. Terminate Worker
    terminate() {
        this.worker.terminate();
    }
}

// ************ DEDICATED WORKERS ************

class DedicatedWorker {
    // 1. Worker Creation
    static createWorker(workerFunction) {
        const blob = new Blob([`(${workerFunction.toString()})()`], 
            { type: 'application/javascript' });
        return new Worker(URL.createObjectURL(blob));
    }

    // 2. Message Handling
    static setupMessageHandler(worker, handlers) {
        worker.onmessage = (event) => {
            const { type, data } = event.data;
            if (handlers[type]) {
                handlers[type](data);
            }
        };
    }

    // 3. Error Handling
    static setupErrorHandler(worker, errorCallback) {
        worker.onerror = (error) => {
            errorCallback({
                message: error.message,
                filename: error.filename,
                lineno: error.lineno
            });
        };
    }
}

// ************ SHARED WORKERS ************

class SharedWorkerManager {
    constructor(workerScript) {
        this.worker = new SharedWorker(workerScript);
        this.port = this.worker.port;
        this.setupPort();
    }

    // 1. Port Setup
    setupPort() {
        this.port.start();
        
        this.port.onmessage = (event) => {
            console.log('Message from shared worker:', event.data);
        };

        this.port.onmessageerror = (error) => {
            console.error('Message error:', error);
        };
    }

    // 2. Send Message
    postMessage(data) {
        this.port.postMessage(data);
    }

    // 3. Close Connection
    close() {
        this.port.close();
    }
}

// ************ SERVICE WORKERS ************

class ServiceWorkerManager {
    // 1. Registration
    static async register(scriptURL, options = {}) {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register(
                    scriptURL, 
                    options
                );
                console.log('Service Worker registered:', registration);
                return registration;
            } catch (error) {
                console.error('Service Worker registration failed:', error);
                throw error;
            }
        }
        throw new Error('Service Workers not supported');
    }

    // 2. Cache Management
    static async cacheResources(cacheName, urls) {
        const cache = await caches.open(cacheName);
        await cache.addAll(urls);
    }

    // 3. Message Communication
    static async sendMessage(message) {
        if (!navigator.serviceWorker.controller) {
            throw new Error('No Service Worker controlling the page');
        }

        return new Promise((resolve, reject) => {
            const messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = (event) => resolve(event.data);
            
            navigator.serviceWorker.controller.postMessage(message, [
                messageChannel.port2
            ]);
        });
    }
}

// ************ WORKER UTILITIES ************

class WorkerUtils {
    // 1. Worker Pool
    static createWorkerPool(workerScript, size) {
        const workers = Array(size).fill(null).map(() => new Worker(workerScript));
        let currentWorker = 0;

        return {
            execute(data) {
                return new Promise((resolve, reject) => {
                    const worker = workers[currentWorker];
                    
                    const messageHandler = (event) => {
                        worker.removeEventListener('message', messageHandler);
                        resolve(event.data);
                    };

                    worker.addEventListener('message', messageHandler);
                    worker.postMessage(data);
                    
                    currentWorker = (currentWorker + 1) % size;
                });
            },

            terminate() {
                workers.forEach(worker => worker.terminate());
            }
        };
    }

    // 2. Task Queue
    static createTaskQueue(worker) {
        const queue = [];
        let processing = false;

        return {
            enqueue(task) {
                return new Promise((resolve, reject) => {
                    queue.push({ task, resolve, reject });
                    this.processQueue();
                });
            },

            async processQueue() {
                if (processing || queue.length === 0) return;
                processing = true;

                const { task, resolve, reject } = queue.shift();
                try {
                    worker.postMessage(task);
                    const result = await new Promise((res, rej) => {
                        worker.onmessage = (e) => res(e.data);
                        worker.onerror = rej;
                    });
                    resolve(result);
                } catch (error) {
                    reject(error);
                } finally {
                    processing = false;
                    this.processQueue();
                }
            }
        };
    }

    // 3. Worker Monitoring
    static createWorkerMonitor(worker) {
        const stats = {
            messagesReceived: 0,
            messagesSent: 0,
            errors: 0,
            startTime: Date.now()
        };

        const originalPostMessage = worker.postMessage.bind(worker);
        worker.postMessage = (data) => {
            stats.messagesSent++;
            originalPostMessage(data);
        };

        worker.addEventListener('message', () => {
            stats.messagesReceived++;
        });

        worker.addEventListener('error', () => {
            stats.errors++;
        });

        return {
            getStats() {
                return {
                    ...stats,
                    uptime: Date.now() - stats.startTime
                };
            },
            reset() {
                stats.messagesReceived = 0;
                stats.messagesSent = 0;
                stats.errors = 0;
                stats.startTime = Date.now();
            }
        };
    }
}

// ************ PRACTICAL EXAMPLES ************

// Example 1: Image Processing Worker
const imageProcessingWorker = `
    self.onmessage = function(e) {
        const { imageData, filter } = e.data;
        const data = imageData.data;
        
        switch (filter) {
            case 'grayscale':
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = data[i + 1] = data[i + 2] = avg;
                }
                break;
        }
        
        self.postMessage({ imageData }, [imageData.data.buffer]);
    };
`;

// Example 2: Data Processing Worker
const dataProcessingWorker = `
    self.onmessage = function(e) {
        const { data, operation } = e.data;
        
        switch (operation) {
            case 'sort':
                const sorted = data.sort((a, b) => a - b);
                self.postMessage({ result: sorted });
                break;
            case 'filter':
                const filtered = data.filter(x => x > 0);
                self.postMessage({ result: filtered });
                break;
        }
    };
`;

// Example 3: Service Worker Cache
const serviceWorkerCache = `
    self.addEventListener('install', (event) => {
        event.waitUntil(
            caches.open('v1').then((cache) => {
                return cache.addAll([
                    '/',
                    '/styles.css',
                    '/script.js',
                    '/images/'
                ]);
            })
        );
    });

    self.addEventListener('fetch', (event) => {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    });
`;

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of Web Workers
2. Implementation of different worker types
3. Worker communication patterns
4. Performance optimization techniques

NEXT STEPS:
1. Practice worker implementations
2. Study worker limitations
3. Implement real-world examples
4. Move on to Progressive Web Apps (21_PWA.js)

INTERVIEW PREPARATION:
1. Study worker types
2. Practice worker communication
3. Understand worker limitations
4. Master worker patterns
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        WorkerManager,
        DedicatedWorker,
        SharedWorkerManager,
        ServiceWorkerManager,
        WorkerUtils,
        imageProcessingWorker,
        dataProcessingWorker,
        serviceWorkerCache
    };
} 