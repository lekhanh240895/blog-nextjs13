import styles from "./Spinner.module.scss";

export default function Spinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.ringContainer}>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
      </div>
    </div>
  );
}
