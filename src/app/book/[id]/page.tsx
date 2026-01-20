import { notFound } from "next/navigation";
import style from "./page.module.css";
import { ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";
// export const dynamicParams = false;
// if true, generateStaticParams can generate only some of the paths
// route segment option

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
        <img src={coverImgUrl} />
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
