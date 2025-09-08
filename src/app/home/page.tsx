import { cookies } from 'next/headers'
import { connectDB } from '../../lib/mongodb'
import User from '../../models/User'
import { verifySessionToken } from '../../lib/auth'
import HomePage from './clientPage'

export default async function Home() {
	let userData = null
	
	try {
		await connectDB()
		
		const cookieStore = await cookies()
		const token = cookieStore.get('dev-stream-auth-cookie')?.value
		
		if (token) {
			const payload = verifySessionToken(token)
			if (payload) {
				const user = await User.findById(payload.userId).select('-passwordHash')
				if (user) {
					userData = {
						username: user.username,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						linkedin: user.linkedin,
						github: user.github,
						bio: user.bio,
						createdAt: user.createdAt
					}
				}
			}
		}
	} catch (error) {
		console.error('Error fetching user data:', error)
	}

	return(
		<main>
			<HomePage userData={userData} />
		</main>
	)
}


