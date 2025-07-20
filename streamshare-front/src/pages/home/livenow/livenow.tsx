import styles from "./styles-livenow.module.scss"; // ajuste o caminho se necessário

export default function LiveNow() {
  return (
    <div className={styles.section}>
      <h1 className={`${styles.live} ${styles.title}`}>Live Now</h1>
      <div className={`${styles.cards} overflow-horizontal mouse-grabbing `}>
        <ss-card class="ssCard"></ss-card>
        <ss-card class="ssCard"></ss-card>
        <ss-card class="ssCard"></ss-card>
        <ss-card class="ssCard"></ss-card>
        <ss-card class="ssCard"></ss-card>
        <ss-card class="ssCard"></ss-card>
      </div>
    </div>
  );
}
