import Image from "next/image";
import styles from "./page.module.css";
import Map from "./components/Map/Map.js";
import PollenData from "./components/PollenSeverity/PollenData"

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.row_holder}>
          <Map className={styles.row_element}/>

          <PollenData className={styles.row_element}/>
        </div>

      </main>
      <footer className={styles.footer}>
       
      </footer>
    </div>
  );
}
