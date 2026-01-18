import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
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
