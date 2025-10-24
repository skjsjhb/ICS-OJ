export interface LabMeta {
    id: string;
    displayName: string;
}

// TODO: Fetch it from NYA
export const labContents: LabMeta[] = [
    {
        id: "hello",
        displayName: "ICS-TR-1 试用评测"
    },
    {
        id: "lab1",
        displayName: "ICS-1 或许有时"
    },
    {
        id: "lab2",
        displayName: "ICS-2 循序渐进"
    },
    {
        id: "lab3",
        displayName: "ICS-3 数字风暴"
    }
];
