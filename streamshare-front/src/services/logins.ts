type ResponseAuthorize = { auth_code: string };
type ResponseToken = { jwt: string };

const url_authorize = "http://localhost:8080/v1/authorize";
const url_token = "http://localhost:8080/v1/token";

const featchAuthorize = (user: string, pass: string, codeChallenge: string) => fetch(url_authorize,
    {
        method: 'POST',
        body: JSON.stringify({
            code_challenge: codeChallenge,
            email: user,
            senha: pass
        }),
        headers: { 'Content-Type': 'application/json' }
    });

const fetchTokenOpaque = (authCode: string, codeVerifier: string) => fetch(url_token, {
    method: 'POST',
    body: JSON.stringify({
        code_verifier: codeVerifier,
        auth_code: authCode
    }),
    headers: { 'Content-Type': 'application/json' }
});

const authorizeIsNok = (res: Response) => { if (!res.ok && res.status != 200) throw { mensagem: 'Authorize falhou' } }
const tokenIsNok = (res: Response) => { if (!res.ok && res.status != 200) throw { mensagem: 'Token falhou' } }

export async function authorize(user: string, pass: string, codeChallenge: string): Promise<string> {
    const res = await featchAuthorize(user, pass, codeChallenge);
    authorizeIsNok(res);
    return (await res.json() as ResponseAuthorize).auth_code;
}

export async function changeTokenOpaque(authCode: string, codeVerifier: string): Promise<string> {
    const res = await fetchTokenOpaque(authCode, codeVerifier);
    tokenIsNok(res);
    return (await res.json() as ResponseToken).jwt;
}