import { Observable, Observer, of, switchMap } from "rxjs";
import sha256 from 'crypto-js/sha256';

export class LoginRequest {
    user: string;
    password: string;

    constructor(user: string, password: string) {
        this.user = user;
        this.password = password;
    }
}

export class LoginViewModelService {
    private codeVerifier: string = '';
    private codeChallenge: string = '';

    public login(request: LoginRequest): Observable<string> {
        console.log(request);
        //implementando oauth sem o gerenciamento centralizado do frontend do AS e somente usando um front único para o processo.
        this.codeVerifier = this.generateCodeverifier();
        this.codeChallenge = this.generateCodeChallenge(this.codeVerifier);

        return new Observable<string>((observer: Observer<string>) => {
            this.api(request.user, request.password, this.codeChallenge)
                .pipe(
                    switchMap((res: { success: boolean, authCode: string }) =>
                        this.changeTokenOpaque(res.authCode, this.codeChallenge)
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

    private api(user: string, pass: string, code: string): Observable<{ success: boolean, authCode: string }> {
        const request = {
            code_challenge: code,
            email: user,
            password: pass
        }

        console.log(request);
        return of({ success: true, authCode: 'authcoderesponse' });
    }

    private changeTokenOpaque(authCode: string, codeVerifier: string): Observable<string> {
        return new Observable((observer: Observer<string>) => {
            const res = this.changeTokenAPI(authCode, codeVerifier);
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

    private changeTokenAPI(authCode: string, codeVerifier: string): { res: boolean, token: string } {
        const request = {
            code_verifier: codeVerifier,
            auth_code: authCode
        }
        console.log(request);
        return { res: true, token: 'token' };
    }


    private generateCodeverifier = (): string => { return Math.random().toString(36).substring(2, 15); }
    private generateCodeChallenge = (codeVerifier: string): string => btoa(sha256(codeVerifier).toString())
}