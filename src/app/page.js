"use client";

import dotenv from "dotenv";

import Location_component from "./components/locationSearch";
import styles from "./page.module.css";
import Map from "./components/Map/Map.js";

dotenv.config();


export default function Home() {
  return (
    <div className={styles.page}>
      <Map />
      <main className={styles.main}>
        <Location_component 
        onSearch={(address) => {
          console.log(address)

        }}/>

      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}



