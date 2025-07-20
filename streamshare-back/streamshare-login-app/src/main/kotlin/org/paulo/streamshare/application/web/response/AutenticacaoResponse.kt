package org.paulo.streamshare.application.web.response

import com.fasterxml.jackson.annotation.JsonProperty

data class AutenticacaoResponse(@JsonProperty("auth_code") val authCode: String) {
}