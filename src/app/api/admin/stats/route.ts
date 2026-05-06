import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const orders = await db.order.findMany({ orderBy: { createdAt: 'desc' } })
    const products = await db.product.findMany()

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
    const totalOrders = orders.length
    const pendingOrders = orders.filter(o => o.status === 'pending').length
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length

    // Revenue by day (last 7 days)
    const now = new Date()
    const revenueByDay: { date: string; revenue: number; orders: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dayStr = day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate())
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)

      const dayOrders = orders.filter(o => {
        const d = new Date(o.createdAt)
        return d >= dayStart && d < dayEnd
      })

      revenueByDay.push({
        date: dayStr,
        revenue: dayOrders.reduce((s, o) => s + o.total, 0),
        orders: dayOrders.length,
      })
    }

    // Top products by parsing order items
    const productSales: Record<string, { name: string; quantity: number; revenue: number; image: string }> = {}
    for (const order of orders) {
      try {
        const items = JSON.parse(order.items) as { name: string; quantity: number; price: number; image?: string }[]
        for (const item of items) {
          if (!productSales[item.name]) {
            productSales[item.name] = { name: item.name, quantity: 0, revenue: 0, image: item.image || '/products/mango.png' }
          }
          productSales[item.name].quantity += item.quantity || 1
          productSales[item.name].revenue += item.price * (item.quantity || 1)
        }
      } catch { /* skip */ }
    }
    const topProducts = Object.values(productSales).sort((a, b) => b.revenue - a.revenue).slice(0, 5)

    // Sales by category
    const categorySales: Record<string, number> = {}
    for (const product of products) {
      const sales = productSales[product.name]
      categorySales[product.category] = (categorySales[product.category] || 0) + (sales?.revenue || 0)
    }

    // Orders by status
    const ordersByStatus: Record<string, number> = {}
    for (const order of orders) { ordersByStatus[order.status] = (ordersByStatus[order.status] || 0) + 1 }

    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    const recentOrdersList = orders.slice(0, 10).map(o => ({ ...o, items: JSON.parse(o.items) }))

    return NextResponse.json({
      totalRevenue, totalOrders, pendingOrders, deliveredOrders, avgOrderValue,
      totalProducts: products.length, inStockProducts: products.filter(p => p.inStock).length,
      revenueByDay, topProducts, categorySales, ordersByStatus, recentOrders: recentOrdersList,
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
