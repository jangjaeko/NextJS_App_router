import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

// request book api multple times in other pages but next call only one time because of request memoization
async function Footer() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_SERVER_URL + "/book",
    { cache: "force-cache" } // prevent all pages not to be dynamic because of this fetch
  );
  if (!response.ok) {
    return <div>failed to load book count</div>;
  }
  const books: BookData[] = await response.json();
  const bookCount = books.length;
  return <footer>@jaeho - total book count: {bookCount}</footer>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚BOOK STORE</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
