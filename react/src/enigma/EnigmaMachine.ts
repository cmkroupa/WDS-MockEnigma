import { Rotor } from './Rotor';
import { Reflector } from './Reflector';
import { Plugboard } from './Plugboard';

export class EnigmaMachine {
    private rotors: Rotor[];
    private reflector: Reflector;
    private plugboard: Plugboard;

    constructor(rotors: Rotor[], reflector: Reflector, plugboard: Plugboard) {
        this.rotors = rotors;
        this.reflector = reflector;
        this.plugboard = plugboard;
    }

    setRotorPositions(positions: string) {
        if (positions.length !== this.rotors.length) return;
        for (let i = 0; i < this.rotors.length; ++i) {
            this.rotors[i].setPosition(positions[i]);
        }
    }

    getRotorPositions(): string {
        return this.rotors.map(r => r.getPositionChar()).join('');
    }

    addPlugboardSwap(c1: string, c2: string) {
        this.plugboard.addSwap(c1, c2);
    }

    removePlugboardConnection(c: string) {
        this.plugboard.removeConnection(c);
    }

    getPlugboardPairs(): Record<string, string> {
        return this.plugboard.getMapping();
    }

    encrypt(c: string): string {
        if (!/[A-Z]/.test(c)) return c;

        const rotateLeft = this.rotors[1].atNotch();
        const rotateMiddle = this.rotors[2].atNotch() || this.rotors[1].atNotch();
        const rotateRight = true;

        if (rotateLeft) this.rotors[0].step();
        if (rotateMiddle) this.rotors[1].step();
        if (rotateRight) this.rotors[2].step();

        let signal = this.plugboard.encrypt(c);

        for (let i = this.rotors.length - 1; i >= 0; --i) {
            signal = this.rotors[i].encryptForward(signal);
        }

        signal = this.reflector.reflect(signal);

        for (let i = 0; i < this.rotors.length; ++i) {
            signal = this.rotors[i].encryptBackward(signal);
        }

        signal = this.plugboard.encrypt(signal);

        return signal;
    }
}
