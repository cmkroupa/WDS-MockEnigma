export class Rotor {
    private wiring: string;
    private reverseWiring: string;
    private notch: string;
    private position: number; // 0-25
    private ringSetting: number; // 0-25

    constructor(wiring: string, notch: string, ringSetting: number = 0) {
        this.wiring = wiring;
        this.notch = notch;
        this.ringSetting = ringSetting;
        this.position = 0;

        this.reverseWiring = new Array(26).fill('').map((_, i) => {
            const char = String.fromCharCode('A'.charCodeAt(0) + i);
            const index = wiring.indexOf(char);
            return String.fromCharCode('A'.charCodeAt(0) + index);
        }).join('');

        const rev = new Array(26).fill('');
        for (let i = 0; i < 26; i++) {
            const char = wiring[i];
            const charIndex = char.charCodeAt(0) - 'A'.charCodeAt(0);
            rev[charIndex] = String.fromCharCode('A'.charCodeAt(0) + i);
        }
        this.reverseWiring = rev.join('');
    }

    setPosition(c: string) {
        this.position = c.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    }

    getPosition(): number {
        return this.position;
    }

    getPositionChar(): string {
        return String.fromCharCode('A'.charCodeAt(0) + this.position);
    }

    step() {
        this.position = (this.position + 1) % 26;
    }

    atNotch(): boolean {
        return this.position === (this.notch.charCodeAt(0) - 'A'.charCodeAt(0));
    }

    private mod26(a: number): number {
        return (a % 26 + 26) % 26;
    }

    encryptForward(c: string): string {
        const inputIndex = c.charCodeAt(0) - 'A'.charCodeAt(0);
        const shift = this.position - this.ringSetting;

        const contactIndex = this.mod26(inputIndex + shift);
        const mappedChar = this.wiring[contactIndex];
        const mappedIndex = mappedChar.charCodeAt(0) - 'A'.charCodeAt(0);
        const outputIndex = this.mod26(mappedIndex - shift);

        return String.fromCharCode('A'.charCodeAt(0) + outputIndex);
    }

    encryptBackward(c: string): string {
        const inputIndex = c.charCodeAt(0) - 'A'.charCodeAt(0);
        const shift = this.position - this.ringSetting;

        const contactIndex = this.mod26(inputIndex + shift);
        const mappedChar = this.reverseWiring[contactIndex];
        const mappedIndex = mappedChar.charCodeAt(0) - 'A'.charCodeAt(0);
        const outputIndex = this.mod26(mappedIndex - shift);

        return String.fromCharCode('A'.charCodeAt(0) + outputIndex);
    }
}
