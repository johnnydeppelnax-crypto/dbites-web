import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const products = await db.product.findMany()
    if (products.length === 0) {
      return NextResponse.json({ error: 'No products found. Seed products first.' }, { status: 400 })
    }

    const demoOrders = [
      { email: 'sarah.j@email.com', name: 'Sarah Johnson', phone: '(555) 234-5678', address: '123 Palm Street', city: 'Miami', state: 'FL', zipCode: '33101', total: 38.97, status: 'delivered', daysAgo: 6 },
      { email: 'mike.chen@email.com', name: 'Mike Chen', phone: '(555) 345-6789', address: '456 Ocean Blvd', city: 'San Diego', state: 'CA', zipCode: '92101', total: 27.98, status: 'delivered', daysAgo: 5 },
      { email: 'lisa.k@email.com', name: 'Lisa Kim', phone: '(555) 456-7890', address: '789 Beach Ave', city: 'Honolulu', state: 'HI', zipCode: '96801', total: 52.96, status: 'delivered', daysAgo: 5 },
      { email: 'james.w@email.com', name: 'James Wilson', phone: '(555) 567-8901', address: '321 Island Rd', city: 'Tampa', state: 'FL', zipCode: '33601', total: 14.99, status: 'delivered', daysAgo: 4 },
      { email: 'emma.r@email.com', name: 'Emma Roberts', phone: '(555) 678-9012', address: '654 Sunset Dr', city: 'Los Angeles', state: 'CA', zipCode: '90001', total: 43.47, status: 'shipped', daysAgo: 3 },
      { email: 'david.l@email.com', name: 'David Lee', phone: '(555) 789-0123', address: '987 Coconut Ln', city: 'Orlando', state: 'FL', zipCode: '32801', total: 21.98, status: 'shipped', daysAgo: 3 },
      { email: 'anna.m@email.com', name: 'Anna Martinez', phone: '(555) 890-1234', address: '147 Tropical Way', city: 'Austin', state: 'TX', zipCode: '73301', total: 67.94, status: 'shipped', daysAgo: 2 },
      { email: 'tom.b@email.com', name: 'Tom Brown', phone: '(555) 901-2345', address: '258 Mango Ct', city: 'Phoenix', state: 'AZ', zipCode: '85001', total: 19.99, status: 'pending', daysAgo: 2 },
      { email: 'rachel.g@email.com', name: 'Rachel Green', phone: '(555) 012-3456', address: '369 Pineapple St', city: 'Charleston', state: 'SC', zipCode: '29401', total: 34.97, status: 'pending', daysAgo: 1 },
      { email: 'chris.p@email.com', name: 'Chris Patel', phone: '(555) 123-4567', address: '741 Citrus Ave', city: 'Nashville', state: 'TN', zipCode: '37201', total: 45.96, status: 'pending', daysAgo: 0 },
      { email: 'jenny.s@email.com', name: 'Jenny Singh', phone: '(555) 222-3333', address: '852 Lime Lane', city: 'Denver', state: 'CO', zipCode: '80201', total: 28.98, status: 'pending', daysAgo: 0 },
      { email: 'mark.d@email.com', name: 'Mark Davis', phone: '(555) 444-5555', address: '963 Guava Dr', city: 'Atlanta', state: 'GA', zipCode: '30301', total: 16.99, status: 'delivered', daysAgo: 6 },
    ]

    await db.order.deleteMany()

    for (const order of demoOrders) {
      const createdAt = new Date(Date.now() - order.daysAgo * 24 * 60 * 60 * 1000)
      const numItems = Math.floor(Math.random() * 3) + 1
      const selectedProducts = [...products].sort(() => Math.random() - 0.5).slice(0, numItems)
      const items = selectedProducts.map(p => ({
        name: p.name,
        price: p.price,
        quantity: Math.floor(Math.random() * 3) + 1,
        image: p.image,
      }))

      await db.order.create({
        data: {
          email: order.email, name: order.name, phone: order.phone,
          address: order.address, city: order.city, state: order.state, zipCode: order.zipCode,
          total: order.total, status: order.status, items: JSON.stringify(items), createdAt,
        },
      })
    }

    return NextResponse.json({ message: 'Demo orders seeded', count: demoOrders.length })
  } catch (error) {
    console.error('Error seeding orders:', error)
    return NextResponse.json({ error: 'Failed to seed orders' }, { status: 500 })
  }
}
