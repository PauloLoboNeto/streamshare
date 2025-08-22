type ResponseAuthorize = { auth_code: string };
type ResponseToken = { jwt: string };

export async function authorize(user: string, pass: string, codeChallenge: string): Promise<string> {
    const url_authorize = "http://localhost:8080/v1/authorize";
    const res = await fetch(url_authorize,
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
        throw { mensagem: 'Authorize falhou' };
    }

    const auth_code = await res.json() as ResponseAuthorize;

    return auth_code.auth_code;
}

export async function changeTokenOpaque(authCode: string, codeVerifier: string): Promise<string> {
    const url_token = "http://localhost:8080/v1/token";
    const res = await fetch(url_token, {
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

    const jwt = await res.json() as ResponseToken;
    return jwt.jwt;
}