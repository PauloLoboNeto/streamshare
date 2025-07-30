package org.paulo.streamshare.application.web.request

import com.fasterxml.jackson.annotation.JsonProperty

data class TokenRequest(
    @JsonProperty("code_verifier") val codeVerifier: String,
    @JsonProperty("auth_code") val authCode: String)