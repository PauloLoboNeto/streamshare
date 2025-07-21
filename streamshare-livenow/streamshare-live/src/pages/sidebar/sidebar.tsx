import styles from "./styles-sidebar.module.scss"; // ajuste o caminho se necessário

export default function Sidebar() {
  return (
    <>
      <div className={styles.sidebar}>
        <span className={styles.item}>Início</span>
        <span className={styles.item}>Tendências</span>
        <span className={styles.item}>Seguindo</span>
        <span className={styles.item}>Biblioteca</span>
        <span className={styles.item}>Watch Parties</span>
        <hr></hr>
        <span className={`${styles.categorias} ${styles.titulo}`}>Categorias</span>
        <span className={`${styles.categorias} ${styles.item}`}>Games</span>
        <span className={`${styles.categorias} ${styles.item}`}>Música</span>
        <span className={`${styles.categorias} ${styles.item}`}>Tecnologia</span>
      </div>
    </>
  );
}
