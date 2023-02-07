package com.backend.controller

import com.backend.dto.LoginUserDto
import com.backend.dto.RegistrationUserDto
import com.backend.service.AuthenticationService
import com.backend.service.JwtService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.util.WebUtils
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("api/auth")
class AuthController {

    @Autowired
    private lateinit var authenticationService: AuthenticationService

    @PostMapping("/registration")
    fun registration(@RequestBody user: RegistrationUserDto): ResponseEntity<Any>{
        return try {
            authenticationService.register(user)
        }catch (e: Exception){
            ResponseEntity.badRequest().body("Failed to save user");
        }
    }

    @PostMapping("/login")
    fun login(@RequestBody user: LoginUserDto): ResponseEntity<Any>{
        return try {
            authenticationService.login(user)
        }catch (e: Exception){
            ResponseEntity.badRequest().body("User doesnt exist");
        }
    }

    @GetMapping("/refresh")
    fun refresh(request: HttpServletRequest): ResponseEntity<Any>{
      return authenticationService.refreshToken(request)
    }

    @GetMapping("/logout")
    fun logout(request: HttpServletRequest): ResponseEntity<Any>{
        return authenticationService.logout(request)
    }
}