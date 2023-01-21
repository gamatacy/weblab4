package com.backend.repository

import com.backend.entity.UserEntity
import org.springframework.data.repository.CrudRepository

interface UserRepository: CrudRepository<UserEntity, Long> {
    fun findByUsername(username: String): UserEntity?
}