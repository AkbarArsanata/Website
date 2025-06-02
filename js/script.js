import { initializeApp } from './modules/core.js';

document.addEventListener("DOMContentLoaded", () => {
    initializeApp().catch(error => {
        console.error("Failed to initialize app:", error);
    });
});