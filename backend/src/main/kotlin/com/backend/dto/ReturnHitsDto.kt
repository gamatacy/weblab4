package com.backend.dto

import com.backend.entity.HitEntity
import java.time.ZoneId
import java.time.format.DateTimeFormatter

class ReturnHitsDto(
    val data: MutableList<HitDto>
){
    companion object{
        fun hitsEntityToDto(entities: MutableList<HitEntity>, offset: String): MutableList<HitDto>{

            val data = mutableListOf<HitDto>()

            for(entity in entities){
                val hitDto = HitDto(
                    entity.result,
                    entity.x,
                    entity.y,
                    entity.r,
                    entity.execTime,
                    entity.time?.withZoneSameInstant(ZoneId.of(offset))?.format(DateTimeFormatter.ofPattern("LLL dd, yyyy 'at' HH:mm:ss"))
                )
                data.add(hitDto)
            }
            return data
        }
    }
}
