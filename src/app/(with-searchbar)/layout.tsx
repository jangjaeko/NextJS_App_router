"use client";
import { useState } from "react";
import SearchBar from "../../components/searchbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SearchBar />

      <div>{children}</div>
    </div>
  );
}
