"use server";

import { revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString(); //author: FormDataEntryValue | null => string or file or null

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "Missing required fields",
    };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      },
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    //only server component or action function can call revalidatePath
    //cleanup all cache after revalidating path
    // revalidatePath(`/book/${bookId}`); //revalidate after creating review, so it shows newly created review

    //revalidatePath options
    //1. revalidatePath(path: string(ex book/${bookId})): void - revalidates the entire path
    //2. revalidatePath(path:string(ex book/[id]), option:"page") :void - revalidates only the page component at the specified path
    //3. revalidatePath(path:string(ex book/[id]), option:"layout") :void - revalidates only the same layout component at the specified path
    //4. revalidatePath(path:'/',layout): void - revalidate whole app from root layout
    //5. revalidateTag(tagName: string): void - revalidates all fetches with the specified tag
    revalidateTag(`review-${bookId}`); // revalidates all fetches with the specified tag
    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return {
      status: false,
      error: `Failed to create review: ${error}`,
    };
  }
}
