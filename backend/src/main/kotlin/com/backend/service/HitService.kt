package com.backend.service

import com.backend.dto.ApplyHitDto
import com.backend.dto.OkResponse
import com.backend.dto.PagesCountDto
import com.backend.dto.ReturnHitsDto
import com.backend.entity.HitEntity
import com.backend.repository.HitsRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import java.time.ZoneId
import java.time.ZonedDateTime
import kotlin.math.ceil
import kotlin.math.pow

@Service
class HitService {

    @Autowired
    private lateinit var hitsRepository: HitsRepository

    fun applyHit(applyHitDto: ApplyHitDto): ResponseEntity<Any> {
        val startTime = System.nanoTime()

        val x = applyHitDto.x
        val y = applyHitDto.y
        val r = applyHitDto.r
        val offset = applyHitDto.offset

        if (x == null || y == null || r == null || offset == null) {
            return ResponseEntity.status(403).body("Wrong params")
        }

        val result = check(x, y, r)
        val execTime = (System.nanoTime() - startTime) / 1000

        return try {
            val user = SecurityContextHolder.getContext().authentication.principal as UserDetails

            val hitEntity = HitEntity()
            hitEntity.result = result
            hitEntity.x = x
            hitEntity.y = y
            hitEntity.r = r
            hitEntity.execTime = execTime
            hitEntity.time = ZonedDateTime.now().withZoneSameInstant(ZoneId.of(offset))
            hitEntity.owner = user.username

            hitsRepository.save(hitEntity)

            ResponseEntity.ok(OkResponse("Hit added"))
        } catch (e: Exception) {
            ResponseEntity.status(401).body("unauthorized")
        }
    }

    fun getHits(page: Int, offset: String): ResponseEntity<Any> {
        return try {
            val user = SecurityContextHolder.getContext().authentication.principal as UserDetails
            val allResults = hitsRepository.findAllByOwnerOrderByTime(user.username)

            val results = try {
                allResults.subList((page - 1) * 10, page * 10)
            } catch (e: Exception) {
                allResults.subList((page - 1) * 10, allResults.size)
            }

            ResponseEntity.ok(ReturnHitsDto(ReturnHitsDto.hitsEntityToDto(results, offset)))
        } catch (ce: ClassCastException) {
            ResponseEntity.status(401).body("unauthorized")
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(e.message)
        }
    }

    fun getPagesCount(): ResponseEntity<Any> {
        return try {
            val user = SecurityContextHolder.getContext().authentication.principal as UserDetails

            val results = hitsRepository.findAllByOwnerOrderByTime((user.username))

            val count = ceil(results.size.toDouble() / 10).toInt()

            ResponseEntity.ok(PagesCountDto(count))
        } catch (ce: ClassCastException) {
            ResponseEntity.status(401).body("unauthorized")
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(e.message)
        }
    }

    private fun check(x: Float, y: Float, r: Float): Boolean {
        return checkCircle(x, y, r) || checkRectangle(x, y, r) || checkTriangle(x, y, r)
    }

    private fun checkCircle(x: Float, y: Float, r: Float): Boolean {
        return ((x.pow(2) + y.pow(2)) <= (r/2).pow(2)) && (x >= -r && x <= 0 && y <= 0 && y >= -r)
    }

    private fun checkTriangle(x: Float, y: Float, r: Float): Boolean {
        return (y <= 0 && y >= -r) && (x >= 0 && x <= r/2) && (y >= 2 * x - r)
    }

    private fun checkRectangle(x: Float, y: Float, r: Float): Boolean {
        return (x >= 0 && x <= r) && (y >= 0 && y <= r / 2)
    }

}