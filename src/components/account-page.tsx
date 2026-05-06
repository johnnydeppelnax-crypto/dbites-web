'use client'

import { useStore, type UserOrder } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import {
  User, Mail, Phone, MapPin, Package, Clock, CheckCircle2,
  Truck, AlertCircle, ShoppingBag, Heart, Settings, LogOut,
  ArrowRight, Loader2, Calendar, ChevronRight, Star
} from 'lucide-react'

const statusConfig: Record<string, { color: string; bg: string; icon: typeof CheckCircle2; label: string }> = {
  pending: { color: 'text-amber-700', bg: 'bg-amber-100 border-amber-200', icon: AlertCircle, label: 'Pending' },
  shipped: { color: 'text-blue-700', bg: 'bg-blue-100 border-blue-200', icon: Truck, label: 'Shipped' },
  delivered: { color: 'text-emerald-700', bg: 'bg-emerald-100 border-emerald-200', icon: CheckCircle2, label: 'Delivered' },
  cancelled: { color: 'text-red-700', bg: 'bg-red-100 border-red-200', icon: AlertCircle, label: 'Cancelled' },
}

const accountTabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function AccountPage() {
  const { user, setUser, setCurrentView, setLoginModalOpen, userOrders, setUserOrders } = useStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  // Load user orders
  useEffect(() => {
    if (user) {
      loadOrders()
    }
  }, [user])

  const loadOrders = async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        setUserOrders(data.orders)
      }
    } catch {
      // silently fail
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      setUserOrders([])
      setCurrentView('home')
      toast.success('Logged out successfully')
    } catch {
      toast.error('Failed to log out')
    }
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/25">
            <User className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-black text-foreground mb-2">Sign In to Your Account</h2>
          <p className="text-foreground/50 mb-6">Access your orders, wishlist, and exclusive member deals</p>
          <Button
            onClick={() => setLoginModalOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 h-12 rounded-xl shadow-lg shadow-orange-500/25"
          >
            Sign In or Create Account
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/20 to-cyan-50/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-orange-500/25">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-black text-foreground">{user.name}</h1>
                <p className="text-foreground/40 text-sm flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {user.email}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 text-[10px] px-2">
                    {user.role === 'admin' ? 'Admin' : 'Customer'}
                  </Badge>
                  <span className="text-[10px] text-foreground/30 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 rounded-2xl overflow-hidden">
              <CardContent className="p-2">
                {accountTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                        : 'text-foreground/50 hover:text-foreground hover:bg-orange-50/50'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {activeTab === 'profile' && <ProfileTab user={user} />}
            {activeTab === 'orders' && (
              <OrdersTab
                orders={userOrders}
                expandedOrder={expandedOrder}
                setExpandedOrder={setExpandedOrder}
              />
            )}
            {activeTab === 'wishlist' && <WishlistTab />}
            {activeTab === 'settings' && <SettingsTab user={user} setUser={setUser} />}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileTab({ user }: { user: NonNullable<ReturnType<typeof useStore>['user']> }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">0</p>
                <p className="text-xs text-foreground/40 font-medium">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">0</p>
                <p className="text-xs text-foreground/40 font-medium">Wishlist Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-md">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">0</p>
                <p className="text-xs text-foreground/40 font-medium">Reward Points</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Info */}
      <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <User className="h-5 w-5 text-orange-500" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50/50 rounded-xl">
              <p className="text-xs text-foreground/40 font-semibold mb-1">Full Name</p>
              <p className="font-semibold text-foreground">{user.name}</p>
            </div>
            <div className="p-4 bg-orange-50/50 rounded-xl">
              <p className="text-xs text-foreground/40 font-semibold mb-1">Email Address</p>
              <p className="font-semibold text-foreground flex items-center gap-2">
                {user.email}
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px]">Verified</Badge>
              </p>
            </div>
            <div className="p-4 bg-orange-50/50 rounded-xl">
              <p className="text-xs text-foreground/40 font-semibold mb-1">Phone</p>
              <p className="font-semibold text-foreground/40">{user.phone || 'Not added yet'}</p>
            </div>
            <div className="p-4 bg-orange-50/50 rounded-xl">
              <p className="text-xs text-foreground/40 font-semibold mb-1">Account Type</p>
              <p className="font-semibold text-foreground capitalize">{user.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Membership Banner */}
      <Card className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 border-0 rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-50" />
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs font-bold uppercase tracking-wider">D-Bites Rewards</p>
              <h3 className="text-xl font-black text-white mt-1">Tropical Member</h3>
              <p className="text-white/70 text-sm mt-1">Earn points with every order and unlock exclusive discounts</p>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Star className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function OrdersTab({ orders, expandedOrder, setExpandedOrder }: {
  orders: UserOrder[]
  expandedOrder: string | null
  setExpandedOrder: (id: string | null) => void
}) {
  if (orders.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 rounded-2xl">
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-orange-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Orders Yet</h3>
            <p className="text-foreground/40 text-sm mb-6">When you place orders, they&apos;ll appear here with tracking info</p>
            <Button
              onClick={() => useStore.getState().setCurrentView('shop')}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-foreground">Order History</h3>
        <Badge className="bg-orange-100 text-orange-700 border-orange-200">{orders.length} order{orders.length !== 1 ? 's' : ''}</Badge>
      </div>
      {orders.map((order, i) => {
        const sc = statusConfig[order.status] || statusConfig.pending
        const isExpanded = expandedOrder === order.id
        return (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                className="w-full text-left"
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl ${sc.bg} border flex items-center justify-center`}>
                        <sc.icon className={`h-5 w-5 ${sc.color}`} />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">#{order.id.slice(-6).toUpperCase()}</p>
                        <p className="text-xs text-foreground/40 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${sc.bg} ${sc.color} border`}>
                        {sc.label}
                      </span>
                      <span className="font-bold text-foreground">${order.total.toFixed(2)}</span>
                      <ChevronRight className={`h-4 w-4 text-foreground/30 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </CardContent>
              </button>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-5 pb-5 pt-0">
                    <Separator className="mb-4" />
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-foreground/30 uppercase tracking-wider">Items</p>
                      {order.items.map((item, j) => (
                        <div key={j} className="flex items-center justify-between py-1">
                          <div className="flex items-center gap-3">
                            {item.image && (
                              <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                            )}
                            <span className="text-sm font-medium text-foreground/70">{item.name}</span>
                          </div>
                          <span className="text-sm font-semibold text-foreground">
                            {item.quantity}x ${item.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground/40 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {order.address}
                        </span>
                        <span className="font-bold text-foreground">
                          Total: ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function WishlistTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 rounded-2xl">
        <CardContent className="py-16 text-center">
          <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-rose-400" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">Your Wishlist is Empty</h3>
          <p className="text-foreground/40 text-sm mb-6">Save your favorite products for later by tapping the heart icon</p>
          <Button
            onClick={() => useStore.getState().setCurrentView('shop')}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25"
          >
            Browse Products
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SettingsTab({ user, setUser }: {
  user: NonNullable<ReturnType<typeof useStore>['user']>
  setUser: ReturnType<typeof useStore>['setUser']
}) {
  const [name, setName] = useState(user.name)
  const [phone, setPhone] = useState(user.phone || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      // In a real app, this would be an API call
      // For now, update the local state
      setUser({ ...user, name, phone })
      toast.success('Profile updated successfully!')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-orange-100/50 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Settings className="h-5 w-5 text-orange-500" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="settings-name" className="text-sm font-semibold">Display Name</Label>
            <Input
              id="settings-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settings-phone" className="text-sm font-semibold">Phone Number</Label>
            <Input
              id="settings-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 h-11"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Email (cannot be changed)</Label>
            <Input
              value={user.email}
              disabled
              className="rounded-xl h-11 bg-muted"
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-white/80 backdrop-blur-sm border-red-100/50 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-red-600 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/40 text-sm mb-4">
            Once you delete your account, there is no going back. All your data, orders, and preferences will be permanently removed.
          </p>
          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
