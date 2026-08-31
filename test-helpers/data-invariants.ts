import { expect } from "vitest";

interface InvariantOptions<T> {
    requiredFields: (keyof T)[];
    custom?: (entry: T, index: number) => void;
}

export function assertDataInvariants<T extends { id: string }>(
    data: T[],
    opts: InvariantOptions<T>,
): void {
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(new Set(data.map((entry) => entry.id)).size).toBe(data.length);

    data.forEach((entry, index) => {
        opts.requiredFields.forEach((field) => {
            expect(entry[field], `${String(field)} is required at index ${index}`).toBeDefined();
        });
        opts.custom?.(entry, index);
    });
}
