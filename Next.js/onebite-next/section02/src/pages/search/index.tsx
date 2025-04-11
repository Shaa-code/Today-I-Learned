import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import { ReactNode } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  console.log(context);
  const q = context.query.q;
  const books = await fetchBooks(q as string);

  return {
    props: { books },
  };
};

export default function Page({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Head>
    <title>한입 북스</title>
    <meta property="og:image" content="/thumbnail.png" />
    <meta property="og:title" content="한입북스 - 검색결과" />
    <meta
      property="og:description"
      content="한입 북스에 등록된 도서들을 만나보세요."
    />
  </Head>
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
