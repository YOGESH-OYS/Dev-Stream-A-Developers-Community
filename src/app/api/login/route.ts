import { NextResponse } from 'next/server'
import { connectDB } from '../../../lib/mongodb'
import User from '../../../models/User'
import { verifyPassword, signSession, SESSION_TTL_SECONDS, COOKIE_NAME } from '../../../lib/auth'

export async function POST(req: Request) {
	try {
		await connectDB()
		const body = await req.json()
		const { emailOrUsername, password } = body
		if (!emailOrUsername || !password) {
			return NextResponse.json({ success: false, message: 'Missing credentials' }, { status: 400 })
		}

		const query = emailOrUsername.includes('@')
			? { email: emailOrUsername.toLowerCase().trim() }
			: { username: emailOrUsername.toLowerCase().trim() }
		const user = await User.findOne(query)
		if (!user) {
			return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
		}
		const ok = await verifyPassword(password, user.passwordHash)
		if (!ok) {
			return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
		}

		const token = signSession({ userId: String((user as any)._id) }, SESSION_TTL_SECONDS)
		const res = NextResponse.json({ success: true, redirect: '/home' })
		res.cookies.set(COOKIE_NAME, token, {
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: SESSION_TTL_SECONDS,
		})
		return res
	} catch (err) {
		console.error('Login error', err)
		return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
	}
}


