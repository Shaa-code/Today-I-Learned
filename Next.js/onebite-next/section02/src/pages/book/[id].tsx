import { useRouter } from "next/router";
import style from "./[id].module.css";
import {
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [
      { param: { id: "1" } },
      { param: { id: "2" } },
      { param: { id: "3" } },
    ],
    fallback: false, // 만약 없으면? false면 없는 페이지로
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; //접근하려면 반드시 아이디가 있어야한다. 단언해도된다.
  const book = await fetchOneBook(Number(id));

  console.log(id);
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) return "로딩중 입니다.";
  if (!book) return "문제가 발생했습니다 다시 시도하세요.";
  //만약 404페이지로 redirect

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

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
    </>
  );
}
