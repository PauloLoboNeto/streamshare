package org.paulo.streamshare.application.web

import org.paulo.streamshare.domain.ports.`in`.IAutenticacaoUseCasePort
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/autenticacao/v1")
class AutenticacaoController(private val autenticacaoUseCase: IAutenticacaoUseCasePort) {


    @PostMapping("/autenticar")
    private fun autenticar(@RequestB) {
        this.autenticacaoUseCase.autenticarUsuario()
    }
}