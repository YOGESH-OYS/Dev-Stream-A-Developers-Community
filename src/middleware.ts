import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { COOKIE_NAME, SESSION_TTL_SECONDS } from './lib/auth'

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl
	const toberedirect = pathname
	const protectedRoutes = ['/home', '/search', '/DEV-labs', '/notification', '/profile'];
	const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
	if (isProtected) {
		const token = req.cookies.get(COOKIE_NAME)?.value
		// console.log(token)
		if (!token) {
			const url = req.nextUrl.clone()
			url.pathname = `/auth/login`
			url.searchParams.set('redirectBack', toberedirect)
			return NextResponse.redirect(url)
		}
			// Rolling session: refresh cookie max-age using same token value
		const res = NextResponse.next()
		res.cookies.set(COOKIE_NAME, token, {
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: SESSION_TTL_SECONDS,
		})
		return res
	}
	return NextResponse.next()
}

export const config = {
	matcher: [
		'/home/:path*',
		'/search/:path*',
		'/DEV-labs/:path*',
		'/notification/:path*',
		'/profile/:path*'
	]
}
