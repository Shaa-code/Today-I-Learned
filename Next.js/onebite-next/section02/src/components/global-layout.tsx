import { ReactNode } from "react";
import Link from "next/link";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>
        <Link href="/">🌿 ONEBITE BOOKS</Link>
      </header>
      <main>{children}</main>
      <footer>제작 @Shaa</footer>
    </div>
  );
}
