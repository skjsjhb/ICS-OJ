import { ReactNode } from "react";

export default function OJLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center h-[90%]">
      {children}
    </section>
  );
}
