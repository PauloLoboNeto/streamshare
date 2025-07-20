package org.paulo.streamshare.domain.model

class AutenticacaoModel private constructor(val email: String, val senha: String, val codeChallenge: String) {

    companion object {
        fun builder(email: String, senha: String, codeChallenge: String): AutenticacaoModel {
            require(email.isNotBlank()) { "Parâmetro inválido" }
            require(senha.isNotBlank()) { "Parâmetro inválido" }
            require(codeChallenge.isNotBlank()) { "Parâmetro inválido" }
            return AutenticacaoModel(email, senha, codeChallenge)
        }
    }
}