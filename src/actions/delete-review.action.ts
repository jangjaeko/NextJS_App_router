"use server";

import { revalidateTag } from "next/cache";

export default async function deleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get("reviewId")?.toString();
  const bookId = formData.get("bookId")?.toString();
  console.log(reviewId, bookId);
  if (!reviewId) {
    return {
      status: false,
      error: "Missing reviewId",
    };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      { method: "DELETE" },
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return {
      status: false,
      error: `Failed to delete review: ${error}`,
    };
  }
}
