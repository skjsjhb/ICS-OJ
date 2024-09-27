import { Progress } from "@nextui-org/progress";
import Link from "next/link";
import { LinkIcon } from "@primer/octicons-react";

import { SACSimilarityRecord } from "@/types/nya";

export default function SACSummary({
  result,
}: {
  result: SACSimilarityRecord[];
}) {
  return (
    <div className="w-full max-h-48 flex flex-col gap-2 overflow-y-auto">
      {result.map((r) => (
        <SACEntry key={r.id} record={r} />
      ))}
    </div>
  );
}

function SACEntry({ record }: { record: SACSimilarityRecord }) {
  const levelColor =
    record.confidence > 0.8
      ? "danger"
      : record.confidence > 0.5
        ? "warning"
        : "success";

  const pct = (record.confidence * 100).toFixed(2) + "%";

  return (
    <Progress
      color={levelColor}
      label={
        <Link className="flex gap-2 items-center" href={`/r/${record.id}`}>
          {record.id}
          <LinkIcon />
        </Link>
      }
      maxValue={1}
      showValueLabel={true}
      size="sm"
      value={record.confidence}
      valueLabel={pct}
    />
  );
}
