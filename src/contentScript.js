// Create a container for our UI
const container = document.createElement('div');
container.id = 'chatgpt-macro-container';
container.style.position = 'relative';
container.style.marginBottom = '10px';

// Wait for the ChatGPT input to be available
function injectUI() {
    // Adjust the selector to target the text input's container
    const inputContainer = document.querySelector('.chat-input-container');
    if (inputContainer && !document.getElementById('chatgpt-macro-container')) {
        inputContainer.parentNode.insertBefore(container, inputContainer);
        // Dynamically load our React bundle
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('build/bundle.js');
        document.body.appendChild(script);
    } else {
        setTimeout(injectUI, 500);
    }
}
injectUI();
