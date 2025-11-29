import { useState, useRef } from 'react';
import { EnigmaMachine } from '../enigma/EnigmaMachine';
import * as C from '../enigma/constants';
import { Rotor } from '../enigma/Rotor';
import { Reflector } from '../enigma/Reflector';
import { Plugboard } from '../enigma/Plugboard';

export interface EnigmaControl {
    machine: EnigmaMachine;
    rotorPositions: string;
    inputText: string;
    outputText: string;
    plugboardPairs: Record<string, string>;
    setRotorPositions: (pos: string) => void;
    setStartPositions: (pos: string) => void;
    startPositions: string;
    encryptChar: (char: string) => string;
    addPlug: (a: string, b: string) => void;
    removePlug: (char: string) => void;
    reset: () => void;
    setInputText: (text: string) => void;
    setOutputText: (text: string) => void;
}

export function useEnigmaMachine(): EnigmaControl {
    const machineRef = useRef<EnigmaMachine | null>(null);

    // React State for UI
    const [rotorPositions, setRotorPositionsState] = useState("AAA");
    const [startPositions, setStartPositions] = useState("AAA");
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [plugboardPairs, setPlugboardPairs] = useState<Record<string, string>>({});

    // Initialize machine once
    if (!machineRef.current) {
        const r1 = new Rotor(C.ROTOR_I_WIRING, C.ROTOR_I_NOTCH);
        const r2 = new Rotor(C.ROTOR_II_WIRING, C.ROTOR_II_NOTCH);
        const r3 = new Rotor(C.ROTOR_III_WIRING, C.ROTOR_III_NOTCH);
        const reflector = new Reflector(C.REFLECTOR_B_WIRING);
        const plugboard = new Plugboard();
        machineRef.current = new EnigmaMachine([r1, r2, r3], reflector, plugboard);
    }

    const machine = machineRef.current;

    const setRotorPositions = (pos: string) => {
        machine.setRotorPositions(pos);
        setRotorPositionsState(pos);
    };

    const encryptChar = (char: string) => {
        const res = machine.encrypt(char);
        setRotorPositionsState(machine.getRotorPositions());
        return res;
    };

    const addPlug = (a: string, b: string) => {
        machine.addPlugboardSwap(a, b);
        setPlugboardPairs(machine.getPlugboardPairs());
    };

    const removePlug = (char: string) => {
        machine.removePlugboardConnection(char);
        setPlugboardPairs(machine.getPlugboardPairs());
    };

    const reset = () => {
        machine.setRotorPositions(startPositions);
        setRotorPositionsState(startPositions);
        setInputText("");
        setOutputText("");
    };

    return {
        machine,
        rotorPositions,
        inputText,
        outputText,
        plugboardPairs,
        setRotorPositions,
        setStartPositions,
        startPositions,
        encryptChar,
        addPlug,
        removePlug,
        reset,
        setInputText,
        setOutputText
    };
}
