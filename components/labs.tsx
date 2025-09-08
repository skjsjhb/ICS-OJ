export interface LabMeta {
    id: string;
    displayName: string;
    env: [string, string][];
}

export const labContents: LabMeta[] = [
    {
        id: "hello",
        displayName: "试用评测",
        env: []
    }
];
