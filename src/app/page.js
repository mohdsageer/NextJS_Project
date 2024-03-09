"use client";
import Form from "../component/Form";
import styles from "./page.module.css";
export default function Home() {
  return (
    <>
      <div>
        <h1 className={styles.headering}>Hy-vee Project </h1>
      </div>
      <Form />
    </>
  );
}
