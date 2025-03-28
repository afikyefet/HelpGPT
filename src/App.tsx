// src/App.tsx
import React, { useState } from 'react';
import MacroList from './MacroList';
import { Macro } from './types';

const App: React.FC = () => {
    // Minimal (dropdown) mode state.
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [refreshCounter, setRefreshCounter] = useState<number>(0);

    // Inserts the macro text into the ChatGPT input.
    const handleUse = (macro: Macro) => {
        const inputElem = document.getElementById('prompt-textarea');
        if (!inputElem) return;
        // Get current text (for simplicity, plain text)
        const currentText = inputElem.textContent || '';
        const newText =
            macro.mode === 'prepend'
                ? macro.text + currentText
                : currentText + macro.text;
        inputElem.textContent = newText;
        // Dispatch an event so ChatGPT picks up the change.
        inputElem.dispatchEvent(new Event('input', { bubbles: true }));
        // Close the dropdown after insertion.
        setDropdownOpen(false);
    };

    return (
        <div
            style={{
                background: 'rgb(48 48 48)',
                color: 'white',
                padding: '8px',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                fontFamily: 'sans-serif',
            }}
        >
            <div style={{ position: 'relative' }}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                    Macros
                </button>
                {dropdownOpen && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '110%', // dropdown appears just below the button
                            left: 0,
                            zIndex: 1000,
                            background: 'rgb(48 48 48)',
                            color: 'white',
                            border: '1px solid #ccc',
                            padding: '4px',
                            width: '100%',
                            maxHeight: '200px',
                            overflowY: 'auto',
                        }}
                    >
                        <MacroList refresh={refreshCounter} onUse={handleUse} minimal />
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
