"use client";

import { useRef } from "react";
import { login } from "./page-viewmodel.service-withfun";
import styles from "./styles-login.module.scss";
import { useRouter } from "next/router";
import "@lib/button/button";
import { ClientOnly } from "@lib/clientOnly/client-only";
import { LoginRequest } from "../../types/login-request";

// Angular	        Next.js (React)
// ngOnInit	        useEffect(() => {}, [])
// ngOnChanges	    useEffect(() => {}, [prop])
// ngOnDestroy	    useEffect(() => { return () => {}; }, [])
// ngAfterViewInit	useEffect(() => {}, []) + useRef()

export default function LoginPage() {
  const emailRef = useRef("");
  const senhaRef = useRef("");
  const router = useRouter();
  const isLoading = useRef(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading.current) {
      console.log("Login em andamento... ignorando nova tentativa.");
      return;
    }

    isLoading.current = true;

    login({
      user: emailRef.current,
      password: senhaRef.current,
    } as LoginRequest)
      .then(() => {
        router.push("/home");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      })
      .finally(() => {
        isLoading.current = false;
      });
  };

  return (
    <div className={styles["login-page"]}>
      <h1 className={styles.titulo}>Stream Share</h1>
      <div className={styles.space}>
        <h3 className={styles.subtitulo}>Entrar na sua conta</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles["input-nome"]}
            type="email"
            placeholder="E-mail"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              (emailRef.current = e.target.value)
            }
          />
          <input
            className={styles["input-senha"]}
            type="password"
            placeholder="Senha"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              (senhaRef.current = e.target.value)
            }
          />
          <ClientOnly>
            <ss-button loading={String(isLoading.current)} text="Enviar">
              Enviar
            </ss-button>
          </ClientOnly>
        </form>
      </div>
    </div>
  );
}
