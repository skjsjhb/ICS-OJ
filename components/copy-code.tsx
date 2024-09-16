"use client";

import { Button } from "@nextui-org/button";
import { CopyIcon } from "@primer/octicons-react";
import { toast } from "react-toastify";
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { useState } from "react";

import { useSession } from "@/components/session";

export default function CopyCode({
  data,
  session,
}: {
  data: string;
  session: string;
}) {
  const [openModal, setOpenModal] = useState(false);
  const localSession = useSession();
  const shouldWarn = session != localSession;

  function copyCode() {
    void navigator.clipboard.writeText(data);
    toast.info("代码已复制。");
  }

  return (
    <>
      <Button
        color="primary"
        onClick={() => {
          if (shouldWarn) {
            setOpenModal(true);
          } else {
            copyCode();
          }
        }}
      >
        <div className="flex items-center gap-2">
          <CopyIcon />
          复制源代码
        </div>
      </Button>
      <Modal isOpen={openModal} size="2xl" onClose={() => setOpenModal(false)}>
        <ModalContent>
          <ModalBody className="p-6 flex flex-col gap-4 text-center items-center justify-center">
            <p className="text-2xl font-bold">等一下！</p>
            <p className="text-default-400">
              这条评测记录并不属于你。
              <br />
              直接复制他人的代码进行评测，110% 你会被 Koi 发现的。
              <br />
              <br />
              <span className="font-bold text-warning">
                请绝对不要提交不属于你的代码（一部分也不行）！
              </span>
              <div className="flex gap-2 mt-4 justify-center">
                <Button color="danger" onClick={copyCode}>
                  我知道我在做什么！
                </Button>
                <Button onClick={() => setOpenModal(false)}>
                  不了，我乱点的
                </Button>
              </div>
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
