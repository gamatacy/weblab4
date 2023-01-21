package com.backend.util

import java.nio.charset.StandardCharsets
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException
import kotlin.experimental.and


object PasswordEncoder{
    fun encodePassword(password: String): String{
        val mg: MessageDigest
        var digest: ByteArray? = null

        try {
            mg = MessageDigest.getInstance("SHA-384")
            digest = mg.digest(password.toByteArray(StandardCharsets.UTF_8))
            val hexDigest = StringBuffer()
            for (i in digest.indices) {
                hexDigest.append(((digest[i] and 0xff.toByte()) + 0x100).toString(16).substring(1))
            }
            return hexDigest.toString()
        } catch (e: NoSuchAlgorithmException) {
            e.printStackTrace()
        }
        return password
    }
}