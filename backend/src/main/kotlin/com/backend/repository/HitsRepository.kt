package com.backend.repository

import com.backend.entity.HitEntity
import org.springframework.data.repository.CrudRepository

interface HitsRepository: CrudRepository<HitEntity, Long> {
    fun findAllByOwnerOrderByTime(owner: String): MutableList<HitEntity>
}