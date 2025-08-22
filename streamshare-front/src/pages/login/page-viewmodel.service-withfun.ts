
import { generateCodeChallenge, generateCodeverifier } from "../../helpers/login";
import { authorize, changeTokenOpaque } from "../../services/logins";
import { LoginRequest } from "../../types/login-request";

export async function login(request: LoginRequest): Promise<string> {
    //implementando oauth sem o gerenciamento centralizado do frontend do AS e somente usando um front único para o processo.
    try {
        const codeVerifier = generateCodeverifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        const authCode = await authorize(request.user, request.password, codeChallenge);
        return await changeTokenOpaque(authCode, codeVerifier);
    } catch (err) {
        throw err;
    }
}
