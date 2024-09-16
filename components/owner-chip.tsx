"use client";

import { Chip } from "@nextui-org/chip";

import { useSession } from "@/components/session";

export default function OwnerChip({ session }: { session: string }) {
  const localSession = useSession();

  if (!localSession) return <></>;

  if (session == localSession) {
    return (
      <Chip color="success" variant="bordered">
        指纹已验证
      </Chip>
    );
  } else {
    return (
      <Chip color="warning" variant="bordered">
        指纹不匹配
      </Chip>
    );
  }
}
