export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}
