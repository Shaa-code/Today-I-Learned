import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import { BookData } from "@/types";
import { Suspense } from "react";

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(`http://localhost:12345/book/random`, {
    next: { revalidate: 3 },
  });

  if (!response.ok) {
    <div>오류가 발생했습니다...</div>;
  }

  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense
          fallback={
            <>
              <BookItemSkeleton />
              <BookItemSkeleton />
              <BookItemSkeleton />
            </>
          }
        >
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense
          fallback={
            <>
              <BookItemSkeleton />
              <BookItemSkeleton />
              <BookItemSkeleton />
            </>
          }
        >
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
