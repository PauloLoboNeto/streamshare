package org.paulo.streamshare.domain.ports.`in`

import org.paulo.streamshare.domain.model.AutenticacaoModel

interface IAutenticacaoUseCasePort {
    fun autenticarUsuario(model: AutenticacaoModel): String
}