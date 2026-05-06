import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const sessionCookie = request.headers.get('cookie')
      ?.split(';')
      .find((c) => c.trim().startsWith('dbites-session='))

    if (!sessionCookie) {
      return NextResponse.json({ user: null })
    }

    const sessionData = decodeURIComponent(sessionCookie.split('=')[1]?.trim() || '')
    if (!sessionData) {
      return NextResponse.json({ user: null })
    }

    const session = JSON.parse(sessionData)
    const user = await db.user.findUnique({
      where: { id: session.id },
      select: { id: true, name: true, email: true, role: true, avatar: true, phone: true, createdAt: true },
    })

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ user: null })
  }
}
