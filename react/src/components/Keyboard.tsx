import React, { useState } from 'react';
import type { EnigmaControl } from '../hooks/useEnigmaMachine';

interface KeyboardProps {
    enigma: EnigmaControl;
}

const KEYBOARD_ROWS = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "ZXCVBNM"
];

export const Keyboard: React.FC<KeyboardProps> = ({ enigma }) => {
    const { encryptChar, setInputText, setOutputText, inputText, outputText } = enigma;
    const [activeLamp, setActiveLamp] = useState<string | null>(null);

    const handleMouseDown = (char: string) => {
        const encrypted = encryptChar(char.toUpperCase());

        if (!/^[A-Z]$/.test(encrypted)) {
            setOutputText(outputText + encrypted);
            setInputText(inputText + char);
            return;
        }

        setActiveLamp(encrypted);
        setOutputText(outputText + encrypted);
        setInputText(inputText + char);
    };

    const handleMouseUp = () => {
        setActiveLamp(null);
    };

    return (
        <div className="keyboard">
            {KEYBOARD_ROWS.map((row, i) => (
                <div key={i} className="keyboard-row">
                    {row.split('').map(char => (
                        <div
                            key={char}
                            className={`key ${activeLamp === char ? 'lit' : ''}`}
                            onMouseDown={() => handleMouseDown(char)}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        >
                            {char}
                        </div>
                    ))}
                </div>
            ))}
            <div className="keyboard-row" style={{ marginTop: '0.5rem' }}>
                <div
                    style={{ width: '200px', borderRadius: '8px' }}
                    className={`key space-key ${activeLamp === ' ' ? 'lit' : ''}`}
                    onMouseDown={() => handleMouseDown(' ')}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    SPACE
                </div>
            </div>
        </div>
    );
};
