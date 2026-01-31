import styles from "./styles-livenow.module.scss"; // ajuste o caminho se necessário
import "../../../components/ui/card/card"; // Import custom card component
import { UserDataContext } from "../../contexts/user-data-context";
import { useContext, useEffect } from "react";

export default function LiveNow() {
  const { user, message, setMessage } = useContext(UserDataContext);

  useEffect(() => { 
    setMessage("Ao vivo agora! Seja bem vindo");
  }, [setMessage])
  
  
  return (
    <div className={styles.section}>
      <h1 className={`${styles.live} ${styles.title}`}>{message.getOrElse("")} {user.getOrElse({userName: ""}).userName}</h1>
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
