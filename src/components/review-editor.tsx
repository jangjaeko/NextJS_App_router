"use client";
import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";
import { useActionState, useEffect } from "react";

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

  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status)
      alert("Review submission failed: " + state.error);
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="bookId" value={id} hidden readOnly />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="review content"
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="author"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </section>
  );
}
