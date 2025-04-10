import Image from "next/image";
import styles from "./page.module.css";
import ClientComponent from "./search/client-component";
import ServerComponent from "./search/server-component";

export default function Home() {
  return (
    <div className={styles.page}>
      Index page
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
