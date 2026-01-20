import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";

export default function ReviewEditor({ id }: { id?: string }) {
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
      <form className={style.form_container} action={createReviewAction}>
        <input name="bookId" value={id} hidden readOnly />
        <textarea required name="content" placeholder="review content" />
        <div className={style.submit_container}>
          <input required name="author" placeholder="author" />
          <button type="submit">Submit Review</button>
        </div>
      </form>
    </section>
  );
}
