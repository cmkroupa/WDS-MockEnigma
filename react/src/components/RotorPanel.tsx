import React from 'react';
import type { EnigmaControl } from '../hooks/useEnigmaMachine';

interface RotorPanelProps {
    enigma: EnigmaControl;
}

export const RotorPanel: React.FC<RotorPanelProps> = ({ enigma }) => {
    const { rotorPositions, setRotorPositions, startPositions, reset } = enigma;

    const handleStep = (index: number, direction: 'up' | 'down') => {
        const current = rotorPositions.split('');
        let charCode = current[index].charCodeAt(0);

        if (direction === 'up') {
            charCode = charCode + 1;
            if (charCode > 'Z'.charCodeAt(0)) charCode = 'A'.charCodeAt(0);
        } else {
            charCode = charCode - 1;
            if (charCode < 'A'.charCodeAt(0)) charCode = 'Z'.charCodeAt(0);
        }

        current[index] = String.fromCharCode(charCode);
        const newPos = current.join('');

        setRotorPositions(newPos);
    };

    return (
        <div className="card">
            <div className="rotor-display">
                {rotorPositions.split('').map((char, i) => (
                    <div key={i} className="rotor-container">
                        <div className="rotor-label">Rotor {i + 1}</div>
                        <button className="rotor-btn" onClick={() => handleStep(i, 'up')}>▲</button>
                        <div className="rotor">
                            <div className="rotor-value">{char}</div>
                        </div>
                        <button className="rotor-btn" onClick={() => handleStep(i, 'down')}>▼</button>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
                <button onClick={reset} style={{ backgroundColor: '#444', fontSize: '0.9rem' }}>
                    Reset to {startPositions}
                </button>
            </div>
        </div>
    );
};
