export class Reflector {
    private wiring: string;

    constructor(wiring: string) {
        this.wiring = wiring;
    }

    reflect(c: string): string {
        const index = c.charCodeAt(0) - 'A'.charCodeAt(0);
        return this.wiring[index];
    }
}
