import { NextResponse } from 'next/server'
import { connectDB } from '../../../lib/mongodb'
import User from '../../../models/User'
import { verifyToken } from '../../../lib/auth'

export async function GET(req: Request) {
	try {
		await connectDB()
		
		const authHeader = req.headers.get('authorization')
		const token = authHeader?.replace('Bearer ', '') || req.headers.get('cookie')?.split('; ').find(c => c.startsWith('ds_session='))?.split('=')[1]
		
		if (!token) {
			return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 })
		}

		const payload = verifyToken(token)
		if (!payload) {
			return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
		}

		const user = await User.findById(payload.userId).select('-passwordHash')
		if (!user) {
			return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
		}

		return NextResponse.json({ 
			success: true, 
			user: {
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				linkedin: user.linkedin,
				github: user.github,
				bio: user.bio,
				createdAt: user.createdAt
			}
		})
	} catch (err) {
		console.error('User fetch error', err)
		return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
	}
}
