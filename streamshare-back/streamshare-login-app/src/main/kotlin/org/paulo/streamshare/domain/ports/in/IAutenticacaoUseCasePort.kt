package org.paulo.streamshare.domain.ports.`in`

interface IAutenticacaoUseCasePort {
    fun autenticarUsuario(codeChallenge: String, credentials: String): String
}