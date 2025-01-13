// ******************** BROWSER APIS ********************

// ************ PREREQUISITES ************

/*
Before starting this module, ensure you understand:
1. JavaScript fundamentals
2. DOM manipulation
3. Asynchronous programming
4. Event handling
*/

// ************ STORAGE APIS ************

class StorageAPIs {
    // 1. LocalStorage
    static localStorage = {
        save(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        
        load(key) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch {
                return null;
            }
        },
        
        remove(key) {
            localStorage.removeItem(key);
        }
    };

    // 2. SessionStorage
    static sessionStorage = {
        save(key, value) {
            sessionStorage.setItem(key, JSON.stringify(value));
        },
        
        load(key) {
            try {
                return JSON.parse(sessionStorage.getItem(key));
            } catch {
                return null;
            }
        },
        
        remove(key) {
            sessionStorage.removeItem(key);
        }
    };

    // 3. IndexedDB
    static async indexedDB(dbName, version = 1) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, version);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('data')) {
                    db.createObjectStore('data', { keyPath: 'id' });
                }
            };
        });
    }
}

// ************ GEOLOCATION API ************

class GeolocationAPI {
    // 1. Get Current Position
    static getCurrentPosition(options = {}) {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error),
                options
            );
        });
    }

    // 2. Watch Position
    static watchPosition(callback, options = {}) {
        if (!navigator.geolocation) {
            throw new Error('Geolocation not supported');
        }

        const watchId = navigator.geolocation.watchPosition(
            callback,
            error => console.error('Geolocation error:', error),
            options
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }

    // 3. Calculate Distance
    static calculateDistance(pos1, pos2) {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(pos2.latitude - pos1.latitude);
        const dLon = this.toRad(pos2.longitude - pos1.longitude);
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                 Math.cos(this.toRad(pos1.latitude)) * 
                 Math.cos(this.toRad(pos2.latitude)) *
                 Math.sin(dLon/2) * Math.sin(dLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    static toRad(degrees) {
        return degrees * (Math.PI / 180);
    }
}

// ************ NOTIFICATION API ************

class NotificationAPI {
    // 1. Request Permission
    static async requestPermission() {
        if (!('Notification' in window)) {
            throw new Error('Notifications not supported');
        }

        const permission = await Notification.requestPermission();
        return permission;
    }

    // 2. Show Notification
    static async showNotification(title, options = {}) {
        if (Notification.permission !== 'granted') {
            await this.requestPermission();
        }

        return new Notification(title, options);
    }

    // 3. Schedule Notification
    static async scheduleNotification(title, options = {}, delay = 0) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.showNotification(title, options));
            }, delay);
        });
    }
}

// ************ MEDIA APIS ************

class MediaAPIs {
    // 1. Media Recorder
    static async createMediaRecorder(constraints = { audio: true, video: true }) {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

        return {
            start() {
                chunks.length = 0;
                mediaRecorder.start();
            },
            
            stop() {
                return new Promise(resolve => {
                    mediaRecorder.onstop = () => {
                        const blob = new Blob(chunks, { type: 'video/webm' });
                        resolve(blob);
                    };
                    mediaRecorder.stop();
                });
            },
            
            stream
        };
    }

    // 2. Audio API
    static createAudioContext() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        return {
            context: audioContext,
            
            async loadSound(url) {
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                return audioContext.decodeAudioData(arrayBuffer);
            },
            
            playSound(buffer) {
                const source = audioContext.createBufferSource();
                source.buffer = buffer;
                source.connect(audioContext.destination);
                source.start(0);
                return source;
            }
        };
    }

    // 3. Video Playback
    static createVideoPlayer(videoElement) {
        return {
            element: videoElement,
            
            async loadVideo(url) {
                videoElement.src = url;
                return new Promise((resolve, reject) => {
                    videoElement.onloadeddata = () => resolve();
                    videoElement.onerror = () => reject(new Error('Video load failed'));
                });
            },
            
            play() {
                return videoElement.play();
            },
            
            pause() {
                videoElement.pause();
            },
            
            seek(time) {
                videoElement.currentTime = time;
            }
        };
    }
}

// ************ CANVAS API ************

class CanvasAPI {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    // 1. Basic Shapes
    drawShape(shape, options = {}) {
        const { x = 0, y = 0, width = 100, height = 100, color = 'black' } = options;
        
        this.ctx.fillStyle = color;
        
        switch (shape) {
            case 'rectangle':
                this.ctx.fillRect(x, y, width, height);
                break;
            case 'circle':
                this.ctx.beginPath();
                this.ctx.arc(x, y, width/2, 0, Math.PI * 2);
                this.ctx.fill();
                break;
            case 'triangle':
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + height);
                this.ctx.lineTo(x + width/2, y);
                this.ctx.lineTo(x + width, y + height);
                this.ctx.closePath();
                this.ctx.fill();
                break;
        }
    }

    // 2. Animation
    animate(drawFrame) {
        let animationId;
        
        const animate = () => {
            drawFrame();
            animationId = requestAnimationFrame(animate);
        };
        
        animate();
        
        return () => cancelAnimationFrame(animationId);
    }

    // 3. Image Processing
    async loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    drawImage(image, x = 0, y = 0) {
        this.ctx.drawImage(image, x, y);
    }

    applyFilter(type) {
        const imageData = this.ctx.getImageData(
            0, 0, this.canvas.width, this.canvas.height
        );
        const data = imageData.data;

        switch (type) {
            case 'grayscale':
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = data[i + 1] = data[i + 2] = avg;
                }
                break;
            case 'invert':
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = 255 - data[i];
                    data[i + 1] = 255 - data[i + 1];
                    data[i + 2] = 255 - data[i + 2];
                }
                break;
        }

        this.ctx.putImageData(imageData, 0, 0);
    }
}

// ************ CONCLUSION ************

/*
LEARNING OUTCOMES:
1. Understanding of browser APIs
2. Implementation of storage solutions
3. Media handling capabilities
4. Canvas manipulation skills

NEXT STEPS:
1. Practice API implementations
2. Study browser compatibility
3. Implement real-world examples
4. Move on to Web Workers (20_Web_Workers.js)

INTERVIEW PREPARATION:
1. Study API specifications
2. Practice API implementations
3. Understand browser limitations
4. Master error handling
*/

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        StorageAPIs,
        GeolocationAPI,
        NotificationAPI,
        MediaAPIs,
        CanvasAPI
    };
} 