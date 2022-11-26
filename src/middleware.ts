import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    return NextResponse.next(); //To be removed when authentication has been implemented in the application.

    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/api")){
        return NextResponse.next();  
    }

    if (pathname.startsWith("/_next")){
        return NextResponse.next();  
    } 

    let accessToken = request.cookies.get('accessToken');

    if(accessToken) {

        if (pathname.startsWith('/login') || pathname.startsWith('/forgot-password')) {
            return NextResponse.redirect(new URL('/', request.nextUrl))
        }

        return NextResponse.next();

    }

    if (!pathname.startsWith('/login') && !pathname.startsWith('/forgot-password')) {

        return NextResponse.redirect(new URL('/login', request.nextUrl));

    }
    
    return NextResponse.next();
}