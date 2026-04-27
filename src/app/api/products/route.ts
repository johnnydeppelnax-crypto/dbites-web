import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const id = searchParams.get('id')

    if (id) {
      const product = await db.product.findUnique({ where: { id } })
      if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      return NextResponse.json(product)
    }

    const where = category && category !== 'All' ? { category } : {}
    const products = await db.product.findMany({
      where,
      orderBy: { createdAt: 'desc',
    }})
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
