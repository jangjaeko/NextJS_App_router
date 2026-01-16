import styles from "../page.module.css";
import ClientComponent from "./client-component";
import ServerComponent from "./server-component";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Welcome to the App Router!</h1>

      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
