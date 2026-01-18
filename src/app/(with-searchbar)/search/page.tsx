import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500); // simulate network delay
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`
    // { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>failed to load books</div>;
  }
  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book: BookData) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense key={q || ""} fallback={<div>Loading...</div>}>
      {/* make streaming UI / 
      using key value to reset suspense boundary if query changes */}
      <SearchResult q={q ?? ""} />
    </Suspense>
  );
}
