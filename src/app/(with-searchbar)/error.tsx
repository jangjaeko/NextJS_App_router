"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error("Error component mounted:", error);
  }, [error]);
  return (
    <div>
      <h1> error occurred : {error.message}</h1>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // Refresh the current page to re-fetch the necessary server components
            reset(); // initialize error state and refresh server component state
          });
        }}
      >
        Try again
      </button>
    </div>
  );
}
