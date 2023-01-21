package com.backend.controller

import com.backend.dto.ApplyHitDto
import com.backend.dto.GetHitsDto
import com.backend.entity.HitEntity
import com.backend.service.HitService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/hits")
class HitsController {

    @Autowired
    private lateinit var hitService: HitService

    @GetMapping("/test")
    fun test(): ResponseEntity<Any> {
        return ResponseEntity.ok("ok")
    }

    @PostMapping("/applyHit")
    fun applyHit(@RequestBody applyHitDto: ApplyHitDto): ResponseEntity<Any> {
        return hitService.applyHit(applyHitDto)
    }

    @PostMapping("/getHits")
    fun getHits(@RequestBody getHitsDto: GetHitsDto): ResponseEntity<Any> {
        return hitService.getHits(getHitsDto.page, getHitsDto.offset)
    }

    @GetMapping("/getPagesCount")
    fun getPagesCount(): ResponseEntity<Any>{
        return hitService.getPagesCount()
    }

}