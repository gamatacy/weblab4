package com.backend.security

import com.backend.service.JwtService
import com.backend.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class JwtFilter: OncePerRequestFilter() {

    @Autowired
    private lateinit var jwtService: JwtService

    @Autowired
    private lateinit var userService: UserService

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {

        try{

            val jwt = jwtService.parseJwt(request)

            if (jwt.isNotEmpty() && jwtService.validateToken(jwt)){

                val userDetails = userService.loadUserByUsername(jwtService.getUsername(jwt))
                val authToken = UsernamePasswordAuthenticationToken(userDetails, null, userDetails.authorities)

                authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
                SecurityContextHolder.getContext().authentication = authToken
            }else if (jwt.isNotEmpty()){
                SecurityContextHolder.clearContext()
            }

        }catch (e: Exception){
            e.printStackTrace()
        }

        filterChain.doFilter(request, response)
    }
}