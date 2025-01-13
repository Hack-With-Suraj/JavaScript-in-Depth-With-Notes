// ******************** PROGRESSIVE WEB APPS ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. Service Workers
2. Web APIs
3. Caching strategies
4. JavaScript modules
*/

// ************ PWA MANIFEST ************

class ManifestGenerator {
    // 1. Basic Manifest
    static createBasicManifest() {
        return {
            name: 'My PWA App',
            short_name: 'PWA',
            start_url: '/',
            display: 'standalone',
            background_color: '#ffffff',
            theme_color: '#000000',
            icons: [
                {
                    src: '/icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: '/icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ]
        };
    }

    // 2. Advanced Manifest
    static createAdvancedManifest(config) {
        return {
            ...this.createBasicManifest(),
            description: config.description,
            orientation: 'portrait',
            scope: '/',
            lang: config.lang || 'en-US',
            dir: 'ltr',
            categories: config.categories || [],
            screenshots: config.screenshots || [],
            shortcuts: config.shortcuts || []
        };
    }
}

// ************ SERVICE WORKER SETUP ************

class PWAServiceWorker {
    // 1. Service Worker Registration
    static async register() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register(
                    '/service-worker.js',
                    { scope: '/' }
                );
                console.log('SW registered:', registration);
                return registration;
            } catch (error) {
                console.error('SW registration failed:', error);
                throw error;
            }
        }
    }

    // 2. Cache Strategies
    static createCacheStrategies() {
        return {
            cacheFirst: async (request) => {
                const cache = await caches.open('pwa-cache');
                const cached = await cache.match(request);
                if (cached) return cached;
                
                const response = await fetch(request);
                cache.put(request, response.clone());
                return response;
            },

            networkFirst: async (request) => {
                try {
                    const response = await fetch(request);
                    const cache = await caches.open('pwa-cache');
                    cache.put(request, response.clone());
                    return response;
                } catch (error) {
                    const cached = await caches.match(request);
                    if (cached) return cached;
                    throw error;
                }
            }
        };
    }

    // 3. Background Sync
    static registerSync(tag) {
        return navigator.serviceWorker.ready
            .then(registration => registration.sync.register(tag));
    }
}

// ************ OFFLINE FUNCTIONALITY ************

class OfflineManager {
    constructor() {
        this.db = null;
        this.initDatabase();
    }

    // 1. IndexedDB Setup
    async initDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('pwa-store', 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('offline-data')) {
                    db.createObjectStore('offline-data', { keyPath: 'id' });
                }
            };
        });
    }

    // 2. Data Storage
    async storeData(data) {
        const transaction = this.db.transaction(['offline-data'], 'readwrite');
        const store = transaction.objectStore('offline-data');
        return store.put(data);
    }

    // 3. Sync Manager
    async syncData() {
        const transaction = this.db.transaction(['offline-data'], 'readonly');
        const store = transaction.objectStore('offline-data');
        const data = await store.getAll();
        
        // Attempt to sync each item
        for (const item of data) {
            try {
                await this.sendToServer(item);
                await this.removeFromStore(item.id);
            } catch (error) {
                console.error('Sync failed for item:', item.id);
            }
        }
    }
}

// ************ PUSH NOTIFICATIONS ************

class PushManager {
    // 1. Subscribe to Push
    static async subscribeToPush() {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(
                'YOUR_PUBLIC_VAPID_KEY'
            )
        });
        return subscription;
    }

    // 2. Handle Push Events
    static setupPushHandling() {
        return {
            pushSubscription: null,
            
            async initialize() {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    this.pushSubscription = await this.subscribeToPush();
                }
            },
            
            async sendPushToServer() {
                if (!this.pushSubscription) return;
                
                await fetch('/api/push-subscription', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.pushSubscription)
                });
            }
        };
    }

    // 3. Utility Functions
    static urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}

// ************ INSTALLATION HANDLING ************

class InstallationHandler {
    constructor() {
        this.deferredPrompt = null;
        this.setupEventListeners();
    }

    // 1. Setup Install Prompt
    setupEventListeners() {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            this.deferredPrompt = event;
        });

        window.addEventListener('appinstalled', () => {
            this.deferredPrompt = null;
            console.log('PWA installed successfully');
        });
    }

    // 2. Show Install Prompt
    async showInstallPrompt() {
        if (!this.deferredPrompt) {
            console.log('Installation prompt not available');
            return;
        }

        this.deferredPrompt.prompt();
        const result = await this.deferredPrompt.userChoice;
        this.deferredPrompt = null;
        
        return result.outcome === 'accepted';
    }

    // 3. Check Installation Status
    static async checkInstallationStatus() {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return 'standalone';
        }
        
        if (navigator.standalone) {
            return 'ios-standalone';
        }
        
        return 'browser';
    }
}

// ************ PRACTICAL EXAMPLES ************

// Example 1: Complete Service Worker Setup
const serviceWorkerSetup = `
    const CACHE_NAME = 'pwa-cache-v1';
    const URLS_TO_CACHE = [
        '/',
        '/index.html',
        '/styles.css',
        '/app.js',
        '/offline.html'
    ];

    self.addEventListener('install', (event) => {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => cache.addAll(URLS_TO_CACHE))
        );
    });

    self.addEventListener('fetch', (event) => {
        event.respondWith(
            caches.match(event.request)
                .then(response => response || fetch(event.request))
                .catch(() => caches.match('/offline.html'))
        );
    });

    self.addEventListener('push', (event) => {
        const options = {
            body: event.data.text(),
            icon: '/icon.png',
            badge: '/badge.png'
        };

        event.waitUntil(
            self.registration.showNotification('Push Notification', options)
        );
    });
`;

// Example 2: PWA Installation UI
class PWAInstallUI {
    constructor(installHandler) {
        this.installHandler = installHandler;
        this.installButton = document.getElementById('install-button');
        this.setupUI();
    }

    setupUI() {
        if (this.installButton) {
            this.installButton.addEventListener('click', () => {
                this.installHandler.showInstallPrompt();
            });
        }
    }

    updateUI(installable) {
        if (this.installButton) {
            this.installButton.style.display = installable ? 'block' : 'none';
        }
    }
}

// Example 3: Offline Data Sync
class OfflineSync {
    constructor() {
        this.offlineManager = new OfflineManager();
        this.setupSync();
    }

    async setupSync() {
        try {
            await this.offlineManager.initDatabase();
            await PWAServiceWorker.registerSync('sync-data');
        } catch (error) {
            console.error('Sync setup failed:', error);
        }
    }

    async queueData(data) {
        await this.offlineManager.storeData({
            id: Date.now(),
            data,
            timestamp: new Date().toISOString()
        });
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding PWA fundamentals
2. Implementation of service workers
3. Offline functionality
4. Push notifications

NEXT STEPS:
1. Practice PWA implementations
2. Study PWA best practices
3. Implement real-world examples
4. Move on to Performance Optimization (22_Performance_Optimization.js)

INTERVIEW PREPARATION:
1. Study PWA concepts
2. Practice service worker implementations
3. Understand offline strategies
4. Master push notifications
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        ManifestGenerator,
        PWAServiceWorker,
        OfflineManager,
        PushManager,
        InstallationHandler,
        PWAInstallUI,
        OfflineSync,
        serviceWorkerSetup
    };
} 