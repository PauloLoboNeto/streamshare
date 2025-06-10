package org.paulo.streamshare.domain.ports.`in`

interface ITokenUseCasePort {
    fun gerarTokenOpaco(codeVerifier: String, authCode: String): String
}