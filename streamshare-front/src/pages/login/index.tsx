"use client";

import { useEffect, useRef, useState } from "react";
import { catchError, exhaustMap, fromEvent, of } from "rxjs";
import { useLogin } from "./page-viewmodel.service";
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

  const formRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useLogin();

  useEffect(() => {
    const form = formRef.current;

    if (!form) return;

    const handleLogin = (event: Event) => {
      setLoading(true);
      event.preventDefault();
      return login({
        user: emailRef.current,
        password: senhaRef.current,
      } as LoginRequest);
    };

    const submitObservable = fromEvent<Event>(form, "submit");

    const subscription = submitObservable
      .pipe(
        exhaustMap((event: Event) => {
          return handleLogin(event).pipe(
            catchError(() => {
              setLoading(false);
              return of(null);
            })
          );
        })
      )
      .subscribe({
        next: (res) => {
          if (res) {
            setIsLoggedIn(true);
            router.push("/home");
          }
        },
      });

    return () => {
      console.log("Cleanup: aqui");
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className={styles["login-page"]}>
      <h1 className={styles.titulo}>Stream Share</h1>
      <div className={styles.space}>
        <h3 className={styles.subtitulo}>Entrar na sua conta</h3>
        <form ref={formRef} className={styles.form}>
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
            <ss-button loading={String(loading)} text="Enviar">
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
