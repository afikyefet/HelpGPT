// src/types.ts
export interface Macro {
    id: string;
    name: string;
    text: string;
    mode: 'prepend' | 'append';
}
