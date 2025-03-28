// src/MacroList.tsx
import React, { useEffect, useState } from 'react';
import { loadMacros } from './storage';
import { Macro } from './types';

interface MacroListProps {
    refresh: number;
    onUse: (macro: Macro) => void;
    minimal?: boolean;
}

const MacroList: React.FC<MacroListProps> = ({ refresh, onUse, minimal = false }) => {
    const [macros, setMacros] = useState<Macro[]>([]);

    useEffect(() => {
        loadMacros().then((data) => setMacros(data));
    }, [refresh]);

    if (macros.length === 0) {
        return <p style={{ margin: 0 }}><em>No macros saved.</em></p>;
    }

    return (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {macros.map((macro) => (
                <li key={macro.id} style={{ marginBottom: '4px', cursor: 'pointer' }}>
                    <span onClick={() => onUse(macro)}>
                        <strong>{macro.name}</strong> {macro.mode === 'prepend' ? '⬆️' : '⬇️'}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default MacroList;
