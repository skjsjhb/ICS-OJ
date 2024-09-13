export interface LabMeta {
  id: string;
  displayName: string;
  env: [string, string][];
}

export const labContents: LabMeta[] = [
  {
    id: "hello",
    displayName: "环境测试：你好，世界",
    env: [],
  },
  {
    id: "lab1",
    displayName: "实验 1：秘密消息",
    env: [["stuId", "学号"]],
  },
];
