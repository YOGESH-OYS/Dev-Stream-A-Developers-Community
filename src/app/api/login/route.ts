import { NextResponse, NextRequest } from 'next/server' // Import NextRequest
import { connectDB } from '../../../lib/mongodb'
import User from '../../../models/User'
import { verifyPassword, signSession, SESSION_TTL_SECONDS, COOKIE_NAME } from '../../../lib/auth'

// Change req type hint from Request to NextRequest for easier URL access
export async function POST(req: NextRequest) { 
	try {
		await connectDB()
		const body = await req.json()
		// console.log(body)
		const { emailOrUsername, password , redirectTo } = body
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

		const isFirstLogin = !user.firstLoginAt
		if (isFirstLogin) {
			user.firstLoginAt = new Date()
			await user.save()
		}

		// --- NEW LOGIC TO DETERMINE REDIRECT PATH ---
		
		let redirectPath = '/home'; // Default path if no parameter is present
		if(redirectTo){
			redirectPath = redirectTo;
		}

		// --- END NEW LOGIC ---

		const token = signSession({ userId: String((user as any)._id) }, SESSION_TTL_SECONDS)
		
		// Update the response JSON to use the dynamic redirectPath
		console.log(redirectPath)
		const res = NextResponse.json({ success: true, redirect: redirectPath }) 
		
		res.cookies.set(COOKIE_NAME, token, {
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: SESSION_TTL_SECONDS,
		})
		// Hint cookie for intro (non-HttpOnly, very short lived)
		if (isFirstLogin) {
			res.cookies.set('ds_first_login', '1', {
				path: '/',
				sameSite: 'lax',
				maxAge: 300,
				secure: process.env.NODE_ENV === 'production',
			})
		}
		return res
	} catch (err) {
		console.error('Login error', err)
		return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
	}
}
