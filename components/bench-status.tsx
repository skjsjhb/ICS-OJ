import { Modal, ModalBody, ModalContent } from "@nextui-org/modal";
import { CircularProgress } from "@nextui-org/progress";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

import { BenchResult } from "@/components/bench";

const readableStat: Record<BenchResult, [string, string]> = {
  AC: ["通过", "bg-success"],
  WA: ["答案错误", "bg-danger"],
  CE: ["汇编失败", "bg-yellow-600"],
  EE: ["参数错误", "bg-yellow-600"],
  RE: ["运行错误", "bg-purple-600"],
  TLE: ["运行超时", "bg-indigo-600"],
  EOF: ["输入耗尽", "bg-purple-600"],
  SE: ["系统错误", "bg-gray-600"],
};

export default function BenchStatus({
  open,
  stat,
  onClose,
}: {
  open: boolean;
  stat: BenchResult[] | null;
  onClose: () => void;
}) {
  const benching = stat === null;
  const accepted = stat?.every((it) => it == "AC");

  return (
    <Modal hideCloseButton isDismissable={false} isOpen={open} size="2xl">
      <ModalContent>
        <ModalBody>
          <div className="w-full flex flex-col p-6 gap-2 items-center">
            <p className="text-2xl font-bold">
              {benching ? "正在评测" : "评测总结"}
            </p>

            {benching && <CircularProgress />}

            {accepted === true && (
              <p className="mt-2 text-success">恭喜，你通过了本题！</p>
            )}

            {accepted === false && (
              <p className="mt-2 text-warning">这……这不对吧？</p>
            )}

            <div className="mt-4 flex flex-col gap-2 w-9/12">
              {stat?.map((st, i) => {
                const [name, clazz] = readableStat[st];

                return (
                  <Card key={i} fullWidth className={`p-0 ${clazz}`}>
                    <CardBody className="py-1 px-4">
                      <div className={`flex items-center`}>
                        <div className="font-bold basis-1/3 grow">
                          测试点 #{i}
                        </div>
                        <div>
                          {st} / {name}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>

            <Button className="mt-4" onClick={onClose}>
              关闭
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
