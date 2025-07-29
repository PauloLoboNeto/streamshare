import { defer, Observable, Observer, switchMap } from "rxjs";
import sha256 from 'crypto-js/sha256';
import { LoginRequest } from "../../types/login-request";

export function useLogin() {
    let codeVerifier: string;
    let codeChallenge: string;

    const generateCodeverifier = (): string => Math.random().toString(36).substring(2, 15);
    const generateCodeChallenge = (codeVerifier: string): string => btoa(sha256(codeVerifier).toString());

    const api = (user: string, pass: string, codeChallenge: string): Observable<string> => {
        const request = {
            code_challenge: codeChallenge,
            email: user,
            senha: pass
        }

        type response = { auth_code: string };

        return defer(() =>
            fetch('http://localhost:8080/v1/authorize',
                { method: 'POST', body: JSON.stringify(request), headers: { 'Content-Type': 'application/json' } }
            ).then(async (res: Response) => {
                const json = await res.json() as response;
                if (!res.ok && res.status != 200) {
                    throw { mensagem: 'Login falhou' };
                }
                return json.auth_code;
            }).catch(() => {
                throw { mensagem: 'Login falhou' };
            })
        )
    }

    const changeTokenOpaque = (authCode: string, codeVerifier: string): Observable<string> => {
        type responseToken = { jwt: string };
        const request = {
            code_verifier: codeVerifier,
            auth_code: authCode
        }

        return defer(() =>
            fetch('http://localhost:8080/v1/token', {
                method: 'POST',
                body: JSON.stringify(request),
                headers: { 'Content-Type': 'application/json' }
            }).then(async (res: Response) => {
                const json = await res.json() as responseToken;
                console.log(res);
                console.log(json);
                if (!res.ok && res.status != 200) {
                    throw { mensagem: 'Exchange falhou' };
                }
                return json.jwt
            }).catch(() => {
                throw { mensagem: 'Exchange falhou' };
            })
        );
    }


    const login = (request: LoginRequest): Observable<string> => {
        //implementando oauth sem o gerenciamento centralizado do frontend do AS e somente usando um front único para o processo.
        codeVerifier = generateCodeverifier();
        codeChallenge = generateCodeChallenge(codeVerifier);


        return new Observable<string>((observer: Observer<string>) => {
            api(request.user, request.password, codeChallenge)
                .pipe(
                    switchMap((authCode: string) => changeTokenOpaque(authCode, codeVerifier))
                ).subscribe({
                    next: (res: string) => {
                        observer.next(res);
                        observer.complete();
                        return;
                    },
                    error: (err) => {
                        observer.error(err);
                        observer.complete();
                        return;
                    }
                });
        })

    }

    return { login };
}