export class Plugboard {
    private mapping: Map<number, number>;

    constructor() {
        this.mapping = new Map();
    }

    addSwap(c1: string, c2: string) {
        c1 = c1.toUpperCase();
        c2 = c2.toUpperCase();
        if (c1 === c2) return;

        this.removeConnection(c1);
        this.removeConnection(c2);

        const index1 = c1.charCodeAt(0) - 'A'.charCodeAt(0);
        const index2 = c2.charCodeAt(0) - 'A'.charCodeAt(0);

        this.mapping.set(index1, index2);
        this.mapping.set(index2, index1);
    }

    removeConnection(c: string) {
        c = c.toUpperCase();
        const index = c.charCodeAt(0) - 'A'.charCodeAt(0);
        const currentTarget = this.mapping.get(index);

        if (currentTarget === undefined) return;

        const targetIndex = currentTarget;

        this.mapping.delete(index);
        this.mapping.delete(targetIndex);
    }

    encrypt(c: string): string {
        c = c.toUpperCase();
        const index = c.charCodeAt(0) - 'A'.charCodeAt(0);
        const target = this.mapping.get(index);
        return target === undefined ? c : String.fromCharCode('A'.charCodeAt(0) + target);
    }

    getMapping(): Record<string, string> {
        const map: Record<string, string> = {};
        for (let i = 0; i < 26; i++) {
            const char = String.fromCharCode('A'.charCodeAt(0) + i);
            const target = this.mapping.get(i);
            if (target !== undefined) {
                if (char < String.fromCharCode('A'.charCodeAt(0) + target)) {
                    map[char] = String.fromCharCode('A'.charCodeAt(0) + target);
                }
            }
        }
        return map;
    }
}
