import { notFound } from "next/navigation";
import style from "./page.module.css";
import { createReviewAction } from "@/actions/create-review.action";

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

function ReviewEditor({ id }: { id?: string }) {
  // async function createReviewAction(formData: FormData) {
  //   "use server";
  //   const content = formData.get("content")?.toString();
  //   const author = formData.get("author")?.toString(); //author: FormDataEntryValue | null => string or file or null

  //   if (!content || !author) {
  //     return;
  //   }
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
  //       {
  //         method: "POST",
  //         body: JSON.stringify({ bookId: id, content, author }),
  //       },
  //     );
  //   } catch (error) {
  //     console.error("Failed to create review:", error);
  //   }
  // }

  return (
    <section>
      <form action={createReviewAction}>
        <input name="bookId" value={id} hidden readOnly />
        <input required name="content" placeholder="review content" />
        <input required name="author" placeholder="author" />
        <button type="submit">Submit Review</button>
      </form>
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
    </div>
  );
}
