'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DollarSign, ShoppingCart, Package, TrendingUp, Users, Clock,
  ArrowUpRight, ArrowDownRight, BarChart3, Eye, RefreshCw,
  CheckCircle2, Truck, AlertCircle, ShoppingBag, Star
} from 'lucide-react'

interface AdminStats {
  totalRevenue: number
  totalOrders: number
  pendingOrders: number
  deliveredOrders: number
  avgOrderValue: number
  totalProducts: number
  inStockProducts: number
  revenueByDay: { date: string; revenue: number; orders: number }[]
  topProducts: { name: string; quantity: number; revenue: number; image: string }[]
  categorySales: Record<string, number>
  ordersByStatus: Record<string, number>
  recentOrders: {
    id: string
    email: string
    name: string
    total: number
    status: string
    createdAt: string
    city: string
    state: string
    items: { name: string; price: number; quantity: number; image: string }[]
  }[]
}

const statusConfig: Record<string, { color: string; bg: string; icon: typeof CheckCircle2; label: string }> = {
  pending: { color: 'text-amber-700', bg: 'bg-amber-100 border-amber-200', icon: AlertCircle, label: 'Pending' },
  shipped: { color: 'text-blue-700', bg: 'bg-blue-100 border-blue-200', icon: Truck, label: 'Shipped' },
  delivered: { color: 'text-emerald-700', bg: 'bg-emerald-100 border-emerald-200', icon: CheckCircle2, label: 'Delivered' },
  cancelled: { color: 'text-red-700', bg: 'bg-red-100 border-red-200', icon: AlertCircle, label: 'Cancelled' },
}

const categoryColors: Record<string, string> = {
  Tropical: 'from-orange-400 to-amber-400',
  Berries: 'from-rose-400 to-pink-400',
  Citrus: 'from-yellow-400 to-orange-400',
  Exotic: 'from-purple-400 to-violet-400',
  Classic: 'from-emerald-400 to-teal-400',
  Mixes: 'from-cyan-400 to-blue-400',
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'products', label: 'Products', icon: Package },
]

export default function AdminDashboard() {
  const { adminTab, setAdminTab } = useStore()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  const loadStats = useCallback(async () => {
    setLoading(true)
    try {
      // Seed demo orders first
      await fetch('/api/admin/seed-orders', { method: 'POST' })
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (err) {
      console.error('Failed to load admin stats:', err)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    let cancelled = false
    const init = async () => {
      if (cancelled) return
      await loadStats()
    }
    init()
    return () => { cancelled = true }
  }, [loadStats])

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/50 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const maxRevenue = Math.max(...stats.revenueByDay.map(d => d.revenue), 1)
  const maxCategorySale = Math.max(...Object.values(stats.categorySales), 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">
              D-Bites <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-white/40 text-xs sm:text-sm">Real-time business analytics and management</p>
          </div>
          <Button
            onClick={loadStats}
            variant="outline"
            className="border-white/10 text-white/60 hover:text-white hover:bg-white/5 rounded-xl"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 bg-white/5 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 w-full sm:w-fit overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                adminTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              <tab.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {adminTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                title="Total Revenue"
                value={`$${stats.totalRevenue.toFixed(2)}`}
                icon={DollarSign}
                gradient="from-orange-500 to-amber-500"
                trend="+12.5%"
                trendUp={true}
              />
              <StatCard
                title="Total Orders"
                value={stats.totalOrders.toString()}
                icon={ShoppingCart}
                gradient="from-cyan-500 to-blue-500"
                trend="+8.2%"
                trendUp={true}
              />
              <StatCard
                title="Avg Order Value"
                value={`$${stats.avgOrderValue.toFixed(2)}`}
                icon={TrendingUp}
                gradient="from-purple-500 to-violet-500"
                trend="+3.1%"
                trendUp={true}
              />
              <StatCard
                title="Pending Orders"
                value={stats.pendingOrders.toString()}
                icon={Clock}
                gradient="from-amber-500 to-orange-500"
                trend={stats.pendingOrders > 0 ? 'Needs attention' : 'All clear'}
                trendUp={stats.pendingOrders === 0}
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Revenue Chart */}
              <Card className="lg:col-span-2 bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg font-bold flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-orange-400" />
                    Revenue — Last 7 Days
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-3 h-52">
                    {stats.revenueByDay.map((day, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-xs text-white/50 font-semibold">${day.revenue.toFixed(0)}</span>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.max((day.revenue / maxRevenue) * 100, 4)}%` }}
                          transition={{ duration: 0.6, delay: i * 0.08 }}
                          className="w-full rounded-t-lg bg-gradient-to-t from-orange-500/80 to-amber-400/80 min-h-[4px] hover:from-orange-400 hover:to-amber-300 transition-colors cursor-pointer relative group"
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1 text-[10px] text-white/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {day.orders} order{day.orders !== 1 ? 's' : ''}
                          </div>
                        </motion.div>
                        <span className="text-[10px] text-white/30 font-medium">{day.date.split(',')[0]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Category Sales */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg font-bold flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-cyan-400" />
                    Sales by Category
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(stats.categorySales).map(([cat, revenue]) => (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-semibold text-white/70">{cat}</span>
                        <span className="text-sm font-bold text-white">${revenue.toFixed(2)}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max((revenue / maxCategorySale) * 100, 2)}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className={`h-full rounded-full bg-gradient-to-r ${categoryColors[cat] || 'from-gray-400 to-gray-500'}`}
                        />
                      </div>
                    </div>
                  ))}
                  {Object.keys(stats.categorySales).length === 0 && (
                    <p className="text-white/30 text-sm text-center py-4">No sales data yet</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Top Products & Order Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Products */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg font-bold flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-400" />
                    Top Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stats.topProducts.length === 0 ? (
                    <p className="text-white/30 text-sm text-center py-8">No product sales yet</p>
                  ) : (
                    <div className="space-y-3">
                      {stats.topProducts.map((product, i) => (
                        <motion.div
                          key={product.name}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div className="text-lg font-black text-white/20 w-6">#{i + 1}</div>
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{product.name}</p>
                            <p className="text-xs text-white/40">{product.quantity} sold</p>
                          </div>
                          <span className="text-sm font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                            ${product.revenue.toFixed(2)}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Status Breakdown */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg font-bold flex items-center gap-2">
                    <Eye className="h-5 w-5 text-purple-400" />
                    Order Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(statusConfig).map(([status, config]) => {
                      const count = stats.ordersByStatus[status] || 0
                      const percentage = stats.totalOrders > 0 ? (count / stats.totalOrders) * 100 : 0
                      return (
                        <div key={status} className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                          <div className={`w-10 h-10 rounded-xl ${config.bg} border flex items-center justify-center`}>
                            <config.icon className={`h-5 w-5 ${config.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-semibold text-white/80">{config.label}</span>
                              <span className="text-sm font-bold text-white">{count}</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.8 }}
                                className="h-full rounded-full bg-white/30"
                              />
                            </div>
                          </div>
                          <span className="text-xs text-white/30 font-medium">{percentage.toFixed(0)}%</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20">
                      <p className="text-xs text-white/40 mb-1">Products</p>
                      <p className="text-xl font-black text-white">{stats.totalProducts}</p>
                      <p className="text-[10px] text-white/30">{stats.inStockProducts} in stock</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                      <p className="text-xs text-white/40 mb-1">Delivered</p>
                      <p className="text-xl font-black text-white">{stats.deliveredOrders}</p>
                      <p className="text-[10px] text-white/30">{stats.totalOrders > 0 ? ((stats.deliveredOrders / stats.totalOrders) * 100).toFixed(0) : 0}% rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* ORDERS TAB */}
        {adminTab === 'orders' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg font-bold flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-orange-400" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.recentOrders.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingCart className="h-12 w-12 text-white/10 mx-auto mb-4" />
                    <p className="text-white/30 font-medium">No orders yet</p>
                    <p className="text-white/20 text-sm">Orders will appear here when customers make purchases</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 text-xs font-bold text-white/30 uppercase tracking-wider">Order</th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-white/30 uppercase tracking-wider">Customer</th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-white/30 uppercase tracking-wider">Items</th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-white/30 uppercase tracking-wider">Location</th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-white/30 uppercase tracking-wider">Total</th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-white/30 uppercase tracking-wider">Status</th>
                          <th className="text-left py-3 px-4 text-xs font-bold text-white/30 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentOrders.map((order, i) => {
                          const sc = statusConfig[order.status] || statusConfig.pending
                          return (
                            <motion.tr
                              key={order.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                              <td className="py-3 px-4">
                                <span className="text-xs font-mono text-white/40">#{order.id.slice(-6).toUpperCase()}</span>
                              </td>
                              <td className="py-3 px-4">
                                <p className="text-sm font-semibold text-white/80">{order.name}</p>
                                <p className="text-xs text-white/30">{order.email}</p>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-1">
                                  {order.items.slice(0, 2).map((item, j) => (
                                    <img key={j} src={item.image} alt={item.name} className="w-7 h-7 rounded-md object-cover border border-white/10" />
                                  ))}
                                  {order.items.length > 2 && (
                                    <span className="text-xs text-white/30 ml-1">+{order.items.length - 2}</span>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm text-white/50">{order.city}, {order.state}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                                  ${order.total.toFixed(2)}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${sc.bg} ${sc.color} border`}>
                                  <sc.icon className="h-3 w-3" />
                                  {sc.label}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-xs text-white/30">
                                  {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              </td>
                            </motion.tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* PRODUCTS TAB */}
        {adminTab === 'products' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-lg font-bold flex items-center gap-2">
                  <Package className="h-5 w-5 text-cyan-400" />
                  Product Inventory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductTable />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, gradient, trend, trendUp }: {
  title: string; value: string; icon: typeof DollarSign; gradient: string; trend: string; trendUp: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/8 transition-colors group">
        <CardContent className="p-3 sm:p-5">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-[10px] sm:text-xs font-bold ${trendUp ? 'text-emerald-400' : 'text-amber-400'}`}>
              {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {trend}
            </div>
          </div>
          <p className="text-lg sm:text-2xl font-black text-white mb-0.5">{value}</p>
          <p className="text-[10px] sm:text-xs text-white/30 font-medium">{title}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ProductTable() {
  const { products } = useStore()
  const categoryGradients: Record<string, string> = {
    Tropical: 'from-orange-500 to-amber-500',
    Berries: 'from-rose-500 to-pink-500',
    Citrus: 'from-yellow-500 to-orange-500',
    Exotic: 'from-purple-500 to-violet-500',
    Classic: 'from-emerald-500 to-teal-500',
    Mixes: 'from-cyan-500 to-blue-500',
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-12 w-12 text-white/10 mx-auto mb-4" />
        <p className="text-white/30 font-medium">No products found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-4 text-xs font-bold text-white/30 uppercase tracking-wider">Product</th>
            <th className="text-left py-3 px-4 text-xs font-bold text-white/30 uppercase tracking-wider">Category</th>
            <th className="text-left py-3 px-4 text-xs font-bold text-white/30 uppercase tracking-wider">Price</th>
            <th className="text-left py-3 px-4 text-xs font-bold text-white/30 uppercase tracking-wider">Rating</th>
            <th className="text-left py-3 px-4 text-xs font-bold text-white/30 uppercase tracking-wider">Stock</th>
            <th className="text-left py-3 px-4 text-xs font-bold text-white/30 uppercase tracking-wider">Featured</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <motion.tr
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover border border-white/10" />
                  <div>
                    <p className="text-sm font-semibold text-white/80">{product.name}</p>
                    <p className="text-xs text-white/30">{product.weight}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-gradient-to-r ${categoryGradients[product.category] || 'from-gray-500 to-gray-600'} text-white`}>
                  {product.category}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm font-bold text-white">${product.price.toFixed(2)}</span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-white/70">{product.rating}</span>
                  <span className="text-xs text-white/30">({product.reviewCount})</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold ${
                  product.inStock ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/15 text-red-400 border border-red-500/20'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </td>
              <td className="py-3 px-4">
                {product.featured ? (
                  <Badge className="bg-orange-500/15 text-orange-400 border-orange-500/20 text-xs">Featured</Badge>
                ) : (
                  <span className="text-white/20 text-xs">—</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
