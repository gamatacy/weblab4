package com.backend.dto

data class HitDto(
    val id: Long?,
    val result: Boolean?,
    val x: Float?,
    val y: Float?,
    val r: Float?,
    val execTime: Long?,
    val time: String?
)
