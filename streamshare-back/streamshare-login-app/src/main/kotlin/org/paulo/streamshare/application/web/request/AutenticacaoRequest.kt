package org.paulo.streamshare.application.web.request

import com.fasterxml.jackson.annotation.JsonProperty

data class AutenticacaoRequest(
    val email: String,
    val senha: String,
    @JsonProperty("code_challenge") val codeChallenge: String)