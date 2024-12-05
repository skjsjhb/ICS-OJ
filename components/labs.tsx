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
  {
    id: "lab2",
    displayName: "实验 2：机械化证明",
    env: [],
  },
  {
    id: "lab3",
    displayName: "实验 3：双边检验",
    env: [["stuId", "学号"]],
  },
  {
    id: "lab4",
    displayName: "实验 4：未雨绸缪",
    env: [["stuId", "学号"]],
  },
  {
    id: "lab5",
    displayName: "实验 5：探秘之光",
    env: [["stuId", "学号"]],
  },
];
