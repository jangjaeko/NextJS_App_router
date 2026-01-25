import BookItem from "@/components/book-item";
import style from "./page.module.css";
// import books from "@/mock/books.json";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
// import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books store - Home",
  description: "A book store built with Next.js App Router",
  openGraph: {
    title: "Books store - Home",
    description: "A book store built with Next.js App Router",
    images: ["/thumbnail.png"],
  },
};

// export const dynamic = "auto";
// to force specific page to be dynamic or static
// 1. auto - default behavior no forcing
// 2. force-dynamic - forcing the page to be dynamic
// 3. force-static - forcing the page to be static
// 4. error - forcing the page to static but throw error when it can't be static

async function AllBooks() {
  // await delay(1500); // simulate network delay
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    //default caching is no-store for SSR page
    { cache: "force-cache" },
  );
  if (!response.ok) {
    return <div>failed to load books</div>;
  }
  const allBooks: BookData[] = await response.json();
  return (
    <div>
      {allBooks.map((book: BookData) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  // await delay(3000); // simulate network delay
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    // { cache: "force-cache" }
    { next: { revalidate: 3 } },
  );
  if (!response.ok) {
    return <div>failed to load recommended books</div>;
  }
  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book: BookData) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// export const dynamic = "force-dynamic"; // for using streaming UI with suspense
// make loading sequentially using delay and suspense
export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>

        {/* <Suspense fallback={<BookListSkeleton count={3} />}> */}
        <RecoBooks />
        {/* </Suspense> */}
      </section>
      <section>
        <h2>All Books</h2>
        {/* <Suspense fallback={<BookListSkeleton count={5} />}> */}
        <AllBooks />
        {/* </Suspense> */}
      </section>
    </div>
  );
}
