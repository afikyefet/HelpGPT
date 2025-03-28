// src/storage.ts
import { Macro } from './types';

const STORAGE_KEY = 'chatgpt_macros';

export function saveMacros(macros: Macro[]): void {
    if (window.chrome && chrome.storage && chrome.storage.sync) {
        chrome.storage.sync.set({ [STORAGE_KEY]: macros }, () => {
            console.log(`Saved ${macros.length} macros to sync storage.`);
        });
    } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(macros));
        console.log("Saved macros to localStorage (fallback).");
    }
}

export function loadMacros(): Promise<Macro[]> {
    return new Promise((resolve) => {
        if (window.chrome && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.get({ [STORAGE_KEY]: [] }, (result) => {
                resolve(result[STORAGE_KEY] as Macro[]);
            });
        } else {
            const data = localStorage.getItem(STORAGE_KEY);
            try {
                resolve(data ? JSON.parse(data) : []);
            } catch {
                resolve([]);
            }
        }
    });
}
