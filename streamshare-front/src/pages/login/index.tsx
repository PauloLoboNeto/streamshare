"use client";

import { useRef } from "react";
import { useLogin } from "./page-viewmodel.service-withfun";
import styles from "./styles-login.module.scss";
import { useRouter } from "next/router";
import "@lib/button/button";
import { ClientOnly } from "@lib/clientOnly/client-only";
import { LoginRequest } from "../../types/login-request";
import { useMutation } from "@tanstack/react-query";

// Angular	        Next.js (React)
// ngOnInit	        useEffect(() => {}, [])
// ngOnChanges	    useEffect(() => {}, [prop])
// ngOnDestroy	    useEffect(() => { return () => {}; }, [])
// ngAfterViewInit	useEffect(() => {}, []) + useRef()

export default function LoginPage() {
  const emailRef = useRef("");
  const senhaRef = useRef("");
  const router = useRouter();
  const { login } = useLogin();

  const mutation = useMutation({
    mutationFn: (request: LoginRequest) => login(request),
    onSuccess: () => {
      router.push("/home");
    },
    onError: () => {}
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mutation.isPending) {
      console.log("Login em andamento... ignorando nova tentativa.");
      return;
    }

    mutation.mutate({
      user: emailRef.current,
      password: senhaRef.current,
    } as LoginRequest);
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
            // value={senha}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              (senhaRef.current = e.target.value)
            }
          />
          <ClientOnly>
            <ss-button loading={String(mutation.isPending)} text="Enviar">
              Enviar
            </ss-button>
          </ClientOnly>
          {/* {isLoggedIn && (
            <p style={{ color: "white" }} onClick={() => clicou("sfdsdf")}>
              Bem-vindo!
            </p>
          )} */}
        </form>
      </div>
    </div>
  );
}
