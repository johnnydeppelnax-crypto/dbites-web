import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, phone, address, city, state, zipCode, total, items, userId } = body

    if (!email || !name || !address || !city || !zipCode || !total || !items) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const order = await db.order.create({
      data: {
        email,
        name,
        phone: phone || null,
        address,
        city,
        state: state || null,
        zipCode,
        total,
        items: JSON.stringify(items),
        status: 'pending',
        userId: userId || null,
      },
    })

    return NextResponse.json({ orderId: order.id, status: 'success' })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
