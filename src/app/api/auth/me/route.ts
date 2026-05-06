import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const sessionCookie = request.headers.get('cookie')
      ?.split(';')
      .find((c) => c.trim().startsWith('dbites-session='))

    if (!sessionCookie) {
      return NextResponse.json({ orders: [] })
    }

    const sessionData = decodeURIComponent(sessionCookie.split('=')[1]?.trim() || '')
    if (!sessionData) {
      return NextResponse.json({ orders: [] })
    }

    const session = JSON.parse(sessionData)
    const user = await db.user.findUnique({ where: { id: session.id } })

    if (!user) {
      return NextResponse.json({ orders: [] })
    }

    // Get orders by user email or userId
    const orders = await db.order.findMany({
      where: {
        OR: [
          { userId: user.id },
          { email: user.email },
        ],
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      orders: orders.map((o) => ({
        id: o.id,
        total: o.total,
        status: o.status,
        items: JSON.parse(o.items),
        createdAt: o.createdAt,
        address: `${o.city}, ${o.state || ''} ${o.zipCode}`,
      })),
    })
  } catch (error) {
    console.error('Get my orders error:', error)
    return NextResponse.json({ orders: [] })
  }
}
