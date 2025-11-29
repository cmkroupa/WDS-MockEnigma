import React from 'react';
import type { EnigmaControl } from '../hooks/useEnigmaMachine';

interface IOPanelProps {
    enigma: EnigmaControl;
}

export const IOPanel: React.FC<IOPanelProps> = ({ enigma }) => {
    const { inputText, outputText } = enigma;

    return (
        <div className="card">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <h3>Input</h3>
                    <textarea
                        value={inputText}
                        readOnly
                        placeholder="Type on the keyboard..."
                        rows={4}
                        style={{ width: '100%', resize: 'none' }}
                    />
                </div>
                <div>
                    <h3>Output</h3>
                    <textarea
                        value={outputText}
                        readOnly
                        placeholder="Encrypted text will appear here..."
                        rows={4}
                        style={{ width: '100%', resize: 'none' }}
                    />
                </div>
            </div>
        </div>
    );
};
