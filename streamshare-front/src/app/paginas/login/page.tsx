"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { exhaustMap, fromEvent, tap } from "rxjs";
import { LoginRequest, LoginViewModelService } from "./page-viewmodel.service";
import "./../../globals.css"; // entender porque isso pesa 2seg num 3g
import "./styles-login.scss";
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

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleLogin = (event: Event) => {
      event.preventDefault();
      const request = new LoginRequest(email, senha);

      return viewModel.login(request).pipe(
        tap({
          next: (res: string) => {
            console.log(res);
            setIsLoggedIn(true);
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

  function clicou(e: any) {
    console.log(e);
  }

  return (
    <div className="flex flex-col justify-center items-center h-[80vh] login-page">
      <h1 className="titulo font-mono font-bold text-4xl">Stream Share</h1>
      <form
        ref={formRef}
        style={{ display: "flex", flexDirection: "column" }}
        className="form"
      >
        <input
          className="input"
          type="email"
          placeholder="digite aqui o seu e-mail"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <input
          className="input"
          type="password"
          placeholder="digite aqui a sua senha"
          value={senha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSenha(e.target.value)
          }
        />
        <button className="font-mono button" type="submit">
          Enviar
        </button>
        {isLoggedIn && <p onClick={() => clicou("sfdsdf")}>Bem-vindo!</p>}
      </form>
    </div>
  );
}
