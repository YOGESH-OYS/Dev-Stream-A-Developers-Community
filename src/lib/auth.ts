import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export const COOKIE_NAME = 'dev-stream-auth-cookie'
export const SESSION_TTL_SECONDS = 60 * 60 * 3 // 3 hours

const JWT_SECRET = process.env.JWT_SECRET as string

if (!JWT_SECRET) {
	throw new Error('JWT_SECRET is not set in environment variables')
}

export async function hashPassword(plain: string) {
	const salt = await bcrypt.genSalt(10)
	return bcrypt.hash(plain, salt)
}

export async function verifyPassword(plain: string, hash: string) {
	return bcrypt.compare(plain, hash)
}

export function signSession(payload: { userId: string }, expiresInSeconds: number = SESSION_TTL_SECONDS) {
	return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresInSeconds })
}

export function verifySessionToken(token: string) {
	try { 
		return jwt.verify(token, JWT_SECRET) as { userId: string, iat: number, exp: number } 
	}
	catch { return null }
}

export async function setSessionCookie(token: string, maxAgeSeconds: number = SESSION_TTL_SECONDS) {
	const jar = await cookies()
	jar.set(COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: maxAgeSeconds,
	})
}

export async function clearSessionCookie() {
	const jar = await cookies()
	jar.delete(COOKIE_NAME)
}

export function getTokenFromRequest(req: NextRequest) {
	return req.cookies.get(COOKIE_NAME)?.value || null
}
