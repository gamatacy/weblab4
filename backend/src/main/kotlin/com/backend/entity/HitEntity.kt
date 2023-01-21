package com.backend.entity

import java.time.ZonedDateTime
import javax.persistence.*

@Entity
@Table(name = "hits")
open class HitEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    open var id: Long? = null
    open var result: Boolean? = null
    open var x: Float? = null
    open var y: Float? = null
    open var r: Float? = null
    open var execTime: Long? = null
    open var time: ZonedDateTime? = null
    open var owner: String? = null
}
