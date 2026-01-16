"use client";

import React from "react";
import ServerComponent from "./server-component";

export default function ClientComponent({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  console.log("Client Component Rendered");
  // server component turn into a client component by using it in a client component
  //   return <ServerComponent />;

  // way to keep it as a client component
  return <div>{children}</div>;
}
