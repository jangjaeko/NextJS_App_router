import { notFound } from "next/navigation";
import style from "./page.module.css";
import { BookData, ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
import Image from "next/image";
import { Metadata } from "next";
// export const dynamicParams = false;
// if true, generateStaticParams can generate only some of the paths
// route segment option

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch(
    // request memoization
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch book detail" + response.statusText);
  }
  const book: BookData = await response.json();

  return {
    title: id ? `Book detail for "${book.title}"` : "Books store - detail",
    description: `${book.subTitle}`,
    openGraph: {
      title: id ? `Book detail for "${book.title}"` : "Books store - detail",
      description: `${book.subTitle}`,
      images: [book.coverImgUrl],
    },
  };
}

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }]; // only use string values
}

async function Detail({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>failed to load book detail</div>;
  }
  const book = await response.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image src={coverImgUrl} width={240} height={300} alt={title} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }, // for revalidate Tag example
  );
  if (!response.ok) {
    throw new Error("Failed to fetch review list" + response.statusText);
  }
  const reviews: ReviewData[] = await response.json();
  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <Detail id={id} />
      <ReviewEditor id={id} />
      <ReviewList bookId={id} />
    </div>
  );
}
