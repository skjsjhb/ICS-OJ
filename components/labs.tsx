export interface LabMeta {
  id: string;
  displayName: string;
  env: [string, string][];
}

export const labContents: LabMeta[] = [
  {
    id: "lab1",
    displayName: "实验 1：秘密消息",
    env: [["stuId", "学号"]],
  },
];
