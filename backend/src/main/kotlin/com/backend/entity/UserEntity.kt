package com.backend.entity

import javax.persistence.*

@Entity
@Table(name = "users")
open class UserEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    open var id: Long? = null
    open var username: String? = null
    open var password: String? = null
    open var name: String? = null
}