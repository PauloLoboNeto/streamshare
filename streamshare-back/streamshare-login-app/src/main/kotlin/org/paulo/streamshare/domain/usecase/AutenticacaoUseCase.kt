package org.paulo.streamshare.domain.usecase

import org.paulo.streamshare.domain.model.AutenticacaoModel
import org.paulo.streamshare.domain.ports.`in`.IAutenticacaoUseCasePort
import org.springframework.stereotype.Service

@Service
class AutenticacaoUseCase: IAutenticacaoUseCasePort {

    override fun autenticarUsuario(model: AutenticacaoModel): String {
        if(model.email == "paulo@gmail.com" && model.senha == "1")
        return "authcode"
        else throw Exception("forbidden")
    }
}