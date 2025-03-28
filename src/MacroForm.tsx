// src/MacroForm.tsx
import React, { useEffect, useState } from 'react';
import { Macro } from './types';

interface MacroFormProps {
    editingMacro: Macro | null;
    onAdd: (name: string, text: string, mode: 'prepend' | 'append') => void;
    onUpdate: (id: string, name: string, text: string, mode: 'prepend' | 'append') => void;
    onCancel: () => void;
}

const MacroForm: React.FC<MacroFormProps> = ({ editingMacro, onAdd, onUpdate, onCancel }) => {
    const isEditing = editingMacro !== null;
    const [name, setName] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [mode, setMode] = useState<'prepend' | 'append'>('prepend');

    useEffect(() => {
        if (editingMacro) {
            setName(editingMacro.name);
            setText(editingMacro.text);
            setMode(editingMacro.mode);
        } else {
            setName('');
            setText('');
            setMode('prepend');
        }
    }, [editingMacro]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !text.trim()) {
            alert("Name and text cannot be empty.");
            return;
        }
        if (isEditing && editingMacro) {
            onUpdate(editingMacro.id, name.trim(), text.trim(), mode);
        } else {
            onAdd(name.trim(), text.trim(), mode);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '8px' }}>
            <div>
                <label>
                    Name:{" "}
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Macro name"
                        required
                    />
                </label>
            </div>
            <div style={{ marginTop: '4px' }}>
                <label>
                    Prompt text:
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Your prompt..."
                        rows={3}
                        required
                    />
                </label>
            </div>
            <div style={{ marginTop: '4px' }}>
                <label>
                    <input
                        type="radio"
                        name="mode"
                        value="prepend"
                        checked={mode === 'prepend'}
                        onChange={() => setMode('prepend')}
                    />
                    {" "}Prepend
                </label>
                {" "}
                <label>
                    <input
                        type="radio"
                        name="mode"
                        value="append"
                        checked={mode === 'append'}
                        onChange={() => setMode('append')}
                    />
                    {" "}Append
                </label>
            </div>
            <div style={{ marginTop: '6px' }}>
                <button type="submit">
                    {isEditing ? "Save Macro" : "Add Macro"}
                </button>
                <button type="button" onClick={onCancel} style={{ marginLeft: '8px' }}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default MacroForm;
