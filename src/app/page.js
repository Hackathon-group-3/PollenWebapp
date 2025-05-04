import Image from "next/image";
import styles from "./page.module.css";
import Map from "./components/Map/Map.js";
import PlantInfoComponent from "./components/plant_info_component/plant_info_component.js";

export default function Home() {
  return (
    <div className={styles.page}>
      <PlantInfoComponent plants={[]}/>

      <main className={styles.main}>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
