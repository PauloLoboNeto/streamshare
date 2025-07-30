package org.paulo.streamshare.application.web.response

import com.fasterxml.jackson.annotation.JsonProperty

data class TokenResponse(@JsonProperty("jwt") val jwt: String) {
}