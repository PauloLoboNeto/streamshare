package org.paulo.streamshare.domain.usecase

import org.paulo.streamshare.domain.ports.`in`.IAutenticacaoUseCasePort

class AutenticacaoUseCase: IAutenticacaoUseCasePort {

    override fun autenticarUsuario(codeChallenge: String, credentials: String): String {
        return "authcode"
    }
}