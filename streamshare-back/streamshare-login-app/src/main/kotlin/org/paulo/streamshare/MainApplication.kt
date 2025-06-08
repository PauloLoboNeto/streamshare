package org.paulo.streamshare

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@ComponentScan("org.paulo.streamshare")
class MainApplication

fun main(args: Array<String>) {
    runApplication<MainApplication>(*args)
}
