package org.paulo.streamshare.application.web

import org.paulo.streamshare.application.web.request.AutenticacaoRequest
import org.paulo.streamshare.application.web.request.TokenRequest
import org.paulo.streamshare.application.web.response.AutenticacaoResponse
import org.paulo.streamshare.application.web.response.TokenResponse
import org.paulo.streamshare.domain.model.AutenticacaoModel
import org.paulo.streamshare.domain.ports.`in`.IAutenticacaoUseCasePort
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin(origins = ["*"])
@RequestMapping("/v1")
class AutenticacaoController(private val autenticacaoUseCase: IAutenticacaoUseCasePort) {

    @PostMapping("/authorize")
    private fun autenticar(@RequestBody request: AutenticacaoRequest): ResponseEntity<AutenticacaoResponse> {
        val autenticarUsuarioModel = AutenticacaoModel.builder(
            request.email,
            request.senha,
            request.codeChallenge)
        return ResponseEntity.ok<AutenticacaoResponse>(AutenticacaoResponse(this.autenticacaoUseCase.autenticarUsuario(autenticarUsuarioModel)))

    }

    @PostMapping("/token")
    private fun token(@RequestBody request: TokenRequest): ResponseEntity<TokenResponse> {
        return ResponseEntity.ok(TokenResponse("jwt"));

    }
}