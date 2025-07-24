import { defer, Observable, Observer, switchMap, tap } from "rxjs";
import sha256 from 'crypto-js/sha256';

export class LoginRequest {
    user: string;
    password: string;

    constructor(user: string, password: string) {
        this.user = user;
        this.password = password;
    }
}

export function useLogin() {
    let codeVerifier: string;
    let codeChallenge: string;

    const generateCodeverifier = (): string => Math.random().toString(36).substring(2, 15);
    const generateCodeChallenge = (codeVerifier: string): string => btoa(sha256(codeVerifier).toString());

    const api = (user: string, pass: string, code: string): Observable<{ success: boolean, authCode: string }> => {
        const request = {
            code_challenge: code,
            email: user,
            senha: pass
        }


        return defer(() =>
            fetch('http://localhost:8080/autenticacao/v1/autenticar',
                { method: 'POST', body: JSON.stringify(request), headers: { 'Content-Type': 'application/json' } }
            ).then((res) => res.json())
        )
        // return of({ success: true, authCode: 'authcoderesponse' });
    }

    const changeTokenAPI = (authCode: string, codeVerifier: string): { res: boolean, token: string } => {
        const request = {
            code_verifier: codeVerifier,
            auth_code: authCode
        }
        console.log(request);
        return { res: true, token: 'token' };
    }

    const changeTokenOpaque = (authCode: string, codeVerifier: string): Observable<string> => {
        return new Observable((observer: Observer<string>) => {
            const res = changeTokenAPI(authCode, codeVerifier);
            if (res.res == true) {
                observer.next(res.token);
                observer.complete();
                return;
            }
            observer.next('error');
            observer.complete();
            return;
        })
    }


    const login = (request: LoginRequest): Observable<string> => {
        console.log(request);
        //implementando oauth sem o gerenciamento centralizado do frontend do AS e somente usando um front único para o processo.
        
        codeVerifier = generateCodeverifier();
        codeChallenge = generateCodeChallenge(codeVerifier);
        console.log("Code Verifier:", codeVerifier);
        console.log("Code Challenge:", codeChallenge);


        return new Observable<string>((observer: Observer<string>) => {
            api(request.user, request.password, codeChallenge)
                .pipe(
                    tap(res => console.log("API Response:", res)),
                    switchMap((res: { success: boolean, authCode: string }) =>
                        changeTokenOpaque(res.authCode, codeChallenge)
                    )
                ).subscribe({
                    next: (res: string) => {
                        if (res) {
                            observer.next('success');
                            observer.complete();
                            return;
                        }
                        observer.error('error');
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