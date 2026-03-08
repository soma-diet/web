export interface Serving {
    id: string;
    name: string;
    size: number;
    isSystem: boolean;
}

export function createServing(name: string, size: number): Serving {
    return {
        id: crypto.randomUUID(),
        name: name,
        size: size,
        isSystem: false,
    };
}
