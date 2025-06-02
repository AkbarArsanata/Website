// Utility function to load HTML components
export async function loadComponent(componentName, containerId) {
    try {
        console.log(`Loading component: ${componentName}.html`);
        const response = await fetch(`./html/${componentName}.html`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        const container = document.getElementById(containerId);
        
        if (!container) {
            throw new Error(`Container ${containerId} not found`);
        }
        
        container.innerHTML = html;
        console.log(`Successfully loaded ${componentName}`);
        return true;
    } catch (error) {
        logError(`Failed to load ${componentName}`, error);
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="error" style="color:red; padding:20px; border:1px solid red">
                    Error: Failed to load ${componentName} component. 
                    <br>${error.message}
                </div>
            `;
        }
        return false;
    }
}

// Enhanced error logging function
export function logError(message, error) {
    const timestamp = new Date().toISOString();
    const errorDetails = error instanceof Error ? 
        `${error.message}\nStack: ${error.stack}` : 
        JSON.stringify(error);
    
    console.error(`[${timestamp}] ${message}:`, errorDetails);
    
    // You could also send errors to a logging service here
    // Example: sendErrorToLoggingService(message, error);
}

// Helper function to check if element exists
export function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

// Debounce function for performance optimization
export function debounce(func, wait = 100, immediate = false) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}