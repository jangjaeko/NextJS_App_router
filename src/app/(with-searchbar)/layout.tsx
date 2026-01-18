import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* to make seachbar in client side */}
      <div>{new Date().toLocaleString()}</div>
      <Suspense fallback={<div>Loading search bar...</div>}>
        <Searchbar />
      </Suspense>

      {children}
    </div>
  );
}
