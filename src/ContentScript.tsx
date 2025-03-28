// contentScript.tsx
import { createRoot } from 'react-dom/client';
import App from './App';

// We'll store references to the input and container globally for simplicity
let inputElem: HTMLElement | null = null;
let container: HTMLDivElement | null = null;

function updatePosition() {
    if (!inputElem || !container) return;

    const rect = inputElem.getBoundingClientRect();
    // Grab the scroll offsets
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    // Adjust these offsets if you want the dropdown above or to the left, etc.
    const offsetX = rect.left + scrollX;
    const offsetY = rect.top + scrollY - 40; // 40px above, for example

    container.style.left = `${offsetX}px`;
    container.style.top = `${offsetY}px`;
}

function initFloatingUI() {
    // Create the container if it doesn't exist yet
    if (!container) {
        container = document.createElement('div');
        container.id = 'chatgpt-macro-dropdown';
        container.style.width = '220px'; // adjust to your liking
        container.style.zIndex = '999999'; // ensure it’s above ChatGPT’s UI
        container.style.position = 'fixed';
        // container.style.backgroundColor = 'rgb(48 48 48)';
        container.style.backgroundColor = 'red';
        container.style.borderRadius = '8px';
        document.body.appendChild(container);

        // Render your React app into this container
        createRoot(container).render(<App />);
    }

    // Position the container for the first time
    updatePosition();

    // Listen for scroll/resize to keep the container aligned
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
}

function waitForInput() {
    inputElem = document.getElementById('prompt-textarea');
    if (inputElem) {
        initFloatingUI();
    } else {
        // If not found yet, keep trying
        setTimeout(waitForInput, 500);
    }
}

waitForInput();
