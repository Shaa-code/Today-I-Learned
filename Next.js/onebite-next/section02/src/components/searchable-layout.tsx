import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const [search, setSearch] = useState("");
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={style.layout}>
      <div className={style.searchbar_container}>
        <input
          className={style.search_input}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          value={search}
          placeholder="검색어를 입력하세요 ..."
        />
        <button className={style.search_button} onClick={onSubmit}>
          검색
        </button>
      </div>
      <main className={style.main_content}>{children}</main>
    </div>
  );
}
