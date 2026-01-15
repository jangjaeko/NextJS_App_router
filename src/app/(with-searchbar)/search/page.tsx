import React from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div>
      <h1>Search {q}</h1>
    </div>
  );
}
