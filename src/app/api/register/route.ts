import { NextResponse } from 'next/server'
import { connectDB } from '../../../lib/mongodb'
import User from '../../../models/User'
import { hashPassword, signSession, SESSION_TTL_SECONDS, COOKIE_NAME } from '../../../lib/auth'

export async function POST(req: Request) {
	try {
		await connectDB()
		const body = await req.json()
		const { firstName, lastName, username, email, password, linkedin, github, bio } = body

		if (!firstName || !lastName || !username || !email || !password) {
			return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
		}

		const existing = await User.findOne({ $or: [{ email: email.toLowerCase().trim() }, { username: username.toLowerCase().trim() }] })
		if (existing) {
			return NextResponse.json({ success: false, message: 'Email or username already in use' }, { status: 409 })
		}

		const passwordHash = await hashPassword(password)
		const user = await User.create({
			firstName,
			lastName,
			username: username.toLowerCase().trim(),
			email: email.toLowerCase().trim(),
			passwordHash,
			linkedin: linkedin || undefined,
			github: github || undefined,
			bio: bio || undefined,
		})

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
		console.error('Register error', err)
		return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
	}
}
