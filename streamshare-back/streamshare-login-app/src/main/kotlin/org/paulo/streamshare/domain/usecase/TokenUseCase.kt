package org.paulo.streamshare.domain.usecase

import org.paulo.streamshare.domain.ports.`in`.ITokenUseCasePort

class TokenUseCase: ITokenUseCasePort {

    override fun gerarTokenOpaco(codeVerifier: String, authCode: String): String {
        return "tokenopaco"
    }
}