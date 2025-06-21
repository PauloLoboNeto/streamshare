"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { exhaustMap, fromEvent, tap } from "rxjs";
import { LoginRequest, LoginViewModelService } from "./page-viewmodel.service";
import "./../../lib/componentes/button/button";
import "./styles-login.scss";
import { useRouter } from "next/navigation";

// Angular	        Next.js (React)
// ngOnInit	        useEffect(() => {}, [])
// ngOnChanges	    useEffect(() => {}, [prop])
// ngOnDestroy	    useEffect(() => { return () => {}; }, [])
// ngAfterViewInit	useEffect(() => {}, []) + useRef()

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const formRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const viewModel = new LoginViewModelService();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const handleLogin = (event: Event) => {
      event.preventDefault();
      setLoading(true);
      const request = new LoginRequest(email, senha);

      return viewModel.login(request).pipe(
        tap({
          next: () => {
            setIsLoggedIn(true);
            router.push("/paginas/home");
          },
          error: (error) => console.log(error),
        })
      );
    };

    const submitObservable = fromEvent<Event>(form, "submit");
    const subscription = submitObservable
      .pipe(exhaustMap((event: Event) => handleLogin(event)))
      .subscribe();

    return () => {
      console.log("Cleanup: aqui");
      subscription.unsubscribe();
    };
  });

  // function clicou(e: any) {
  //   console.log(e);
  // }

  return (
    <div className="login-page">
      <h1 className="titulo">Stream Share</h1>
      <div className="space">
        <h3 className="subtitulo">Entrar na sua conta</h3>
        <form ref={formRef} className="form">
          <input
            className="input-nome"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <input
            className="input-senha"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSenha(e.target.value)
            }
          />
          <ss-button loading={String(loading)} class="ssButton">
            Enviar
          </ss-button>
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
