package com.backend.controller

import org.springframework.boot.web.servlet.error.ErrorController
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping

@Controller
class ErrorPageController: ErrorController {

//    @GetMapping("/error")
//    @PostMapping("/error")
//    fun redirect(): String{
//        return "/"
//    }

}