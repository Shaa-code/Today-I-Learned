import SearchableLayout from "@/components/searchable-layout";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { ReactNode } from "react";

export default function Page() {
  return (
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
