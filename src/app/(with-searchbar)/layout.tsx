import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div> search bar</div>
      <div>{children}</div>
    </div>
  );
}
