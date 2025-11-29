import React, { useState } from 'react';
import type { EnigmaControl } from '../hooks/useEnigmaMachine';

interface PlugboardPanelProps {
    enigma: EnigmaControl;
}

export const PlugboardPanel: React.FC<PlugboardPanelProps> = ({ enigma }) => {
    const { plugboardPairs, addPlug, removePlug } = enigma;
    const [newPair, setNewPair] = useState("");

    const handleConnect = () => {
        if (newPair.length === 2) {
            const [a, b] = newPair.split('');
            addPlug(a, b);
            setNewPair("");
        }
    };

    return (
        <div className="card">
            <h3>Plugboard</h3>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                <input
                    value={newPair}
                    onChange={(e) => {
                        if (e.target.value.length <= 2) setNewPair(e.target.value.toUpperCase());
                    }}
                    placeholder="AB"
                    style={{ width: '60px', textAlign: 'center', textTransform: 'uppercase' }}
                />
                <button onClick={handleConnect}>Connect</button>
            </div>

            <div className="plugboard-grid">
                {Object.entries(plugboardPairs).map(([a, b]) => (
                    <div key={a} className="plug-pair">
                        <span>{a} ↔ {b}</span>
                        <span className="remove-plug" onClick={() => removePlug(a)}>×</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
