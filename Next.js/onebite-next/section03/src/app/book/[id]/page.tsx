import { Metadata } from "next";
import style from "./page.module.css";

export function generateStaticParams(){
  return [{id: "1"},{id:"2"},{id:"3"}]
}

export default async function Page({ params }: {params: {id : string| string[]}}) {
  const id = params.id;

  const apiUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;
  if (!apiUrl) {
    return (
      <div>
        API URL is not configured. Please check your environment variables.
      </div>
    );
  }

  const response = await fetch(`${apiUrl}/book/${id}`);

  console.log(apiUrl);

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const book = await response.json();

  const {
    id: bookId,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
