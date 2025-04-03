import type { BookData } from "@/types";
import Link from "next/link";
import style from "./book-item.module.css";

export default function BookItem({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link href={`book/${id}`} className={style.container}>
      <img src={coverImgUrl} />
      <div>{title}</div>
      <div>{subTitle}</div>
      <br />
      <div>
        {author} | {publisher}
      </div>
    </Link>
  );
}
