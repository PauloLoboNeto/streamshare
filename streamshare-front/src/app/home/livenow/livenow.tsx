import styles from "./styles-livenow.module.scss"; // ajuste o caminho se necessário
import "../../../components/ui/card/card"; // Import custom card component

export default function LiveNow() {
  return (
    <div className={styles.section}>
      <h1 className={`${styles.live} ${styles.title}`}>Live Now</h1>
      <div className={`${styles.cards} overflow-horizontal mouse-grabbing `}>
        <ss-card></ss-card>
        <ss-card></ss-card>
        <ss-card></ss-card>
        <ss-card></ss-card>
        <ss-card></ss-card>
        <ss-card></ss-card>
      </div>
    </div>
  );
}
