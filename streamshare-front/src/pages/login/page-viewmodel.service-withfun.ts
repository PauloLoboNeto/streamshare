import sha256 from 'crypto-js/sha256';
import { LoginRequest } from "../../types/login-request";

type response = { auth_code: string };
type responseToken = { jwt: string };

export function useLogin() {
    let codeVerifier: string;
    let codeChallenge: string;

    const generateCodeverifier = (): string => Math.random().toString(36).substring(2, 15);
    const generateCodeChallenge = (codeVerifier: string): string => btoa(sha256(codeVerifier).toString());

    const authorize = async (user: string, pass: string, codeChallenge: string): Promise<string> => {
        const res = await fetch('http://localhost:8080/v1/authorize',
            {
                method: 'POST',
                body: JSON.stringify({
                    code_challenge: codeChallenge,
                    email: user,
                    senha: pass
                }),
                headers: { 'Content-Type': 'application/json' }
            });

        if (!res.ok && res.status != 200) {
            throw { mensagem: 'Login falhou' };
        }

        const auth_code = await res.json() as response;

        return auth_code.auth_code;
    }

    const changeTokenOpaque = async (authCode: string, codeVerifier: string): Promise<string> => {
        const res = await fetch('http://localhost:8080/v1/token', {
            method: 'POST',
            body: JSON.stringify({
                code_verifier: codeVerifier,
                auth_code: authCode
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok && res.status != 200) {
            throw { mensagem: 'Exchange falhou' };
        }

        const jwt = await res.json() as responseToken;
        return jwt.jwt;
    }


    const login = (request: LoginRequest): Promise<string> => {
        //implementando oauth sem o gerenciamento centralizado do frontend do AS e somente usando um front único para o processo.
        codeVerifier = generateCodeverifier();
        codeChallenge = generateCodeChallenge(codeVerifier);

        return authorize(request.user, request.password, codeChallenge)
            .then(authCode => changeTokenOpaque(authCode, codeVerifier))
            .catch(err => {
                throw err;
            });
    }

    return { login };
}