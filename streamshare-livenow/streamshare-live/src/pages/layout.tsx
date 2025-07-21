import Sidebar from './sidebar/sidebar'; // ajuste o caminho se necessário

import styles from './styles-home.module.scss'; // ajuste o caminho se necessário

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.home}>
      <Sidebar />
      {children}
    </div>
  );
}