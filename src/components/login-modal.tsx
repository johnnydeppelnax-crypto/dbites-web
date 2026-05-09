'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'
import { useState } from 'react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react'

export default function LoginModal() {
  const { loginModalOpen, setLoginModalOpen, setUser, setCurrentView, setUserOrders } = useStore()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginData.email || !loginData.password) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      })
      const data = await res.json()
      if (res.ok) {
        setUser(data.user)
        setLoginModalOpen(false)
        setLoginData({ email: '', password: '' })
        toast.success(`Welcome back, ${data.user.name}!`)
        // Load user orders
        loadUserOrders()
      } else {
        toast.error(data.error || 'Login failed')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!registerData.name || !registerData.email || !registerData.password) {
      toast.error('Please fill in all fields')
      return
    }
    if (registerData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: registerData.name, email: registerData.email, password: registerData.password }),
      })
      const data = await res.json()
      if (res.ok) {
        // Auto-login after register
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: registerData.email, password: registerData.password }),
        })
        const loginData = await loginRes.json()
        if (loginRes.ok) {
          setUser(loginData.user)
          setLoginModalOpen(false)
          setRegisterData({ name: '', email: '', password: '', confirmPassword: '' })
          toast.success(`Welcome to D-Bites, ${loginData.user.name}! 🎉`)
        }
      } else {
        toast.error(data.error || 'Registration failed')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const loadUserOrders = async () => {
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

  const handleClose = () => {
    setLoginModalOpen(false)
    setLoginData({ email: '', password: '' })
    setRegisterData({ name: '', email: '', password: '', confirmPassword: '' })
  }

  return (
    <Dialog open={loginModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-none sm:rounded-3xl border-0 inset-0 sm:inset-auto w-full sm:w-auto max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto">
        <DialogDescription className="sr-only">Sign in or create an account for D-Bites</DialogDescription>
        {/* Tropical gradient background */}
        <div className="relative">
          {/* Decorative top section */}
          <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 px-8 pt-8 pb-6 relative overflow-hidden">
            {/* Floating decorative circles */}
            <div className="absolute top-2 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <div className="absolute bottom-0 left-8 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg" />
            <div className="absolute top-4 left-1/2 w-8 h-8 bg-white/15 rounded-full" />

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white mb-1">
                {mode === 'login' ? 'Welcome Back!' : 'Join D-Bites'}
              </h2>
              <p className="text-white/80 text-sm font-medium">
                {mode === 'login'
                  ? 'Sign in to access your account and orders'
                  : 'Create an account for exclusive perks & order tracking'}
              </p>
            </div>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-orange-50 mx-6 -mt-4 relative z-20 rounded-xl p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                  : 'text-foreground/40 hover:text-foreground/60'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                  : 'text-foreground/40 hover:text-foreground/60'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form section */}
          <div className="px-8 pt-6 pb-8">
            <AnimatePresence mode="wait">
              {mode === 'login' ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm font-semibold text-foreground/70">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />
                      <Input
                        id="login-email"
                        type="email"
                        required
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="pl-10 h-11 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-semibold text-foreground/70">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />
                      <Input
                        id="login-password"
                        type="password"
                        required
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        placeholder="Enter your password"
                        className="pl-10 h-11 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400/20"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <ArrowRight className="h-4 w-4 mr-2" />
                    )}
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="reg-name" className="text-sm font-semibold text-foreground/70">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />
                      <Input
                        id="reg-name"
                        required
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        placeholder="John Doe"
                        className="pl-10 h-11 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email" className="text-sm font-semibold text-foreground/70">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />
                      <Input
                        id="reg-email"
                        type="email"
                        required
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="pl-10 h-11 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-password" className="text-sm font-semibold text-foreground/70">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />
                      <Input
                        id="reg-password"
                        type="password"
                        required
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        placeholder="Min. 6 characters"
                        className="pl-10 h-11 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-confirm" className="text-sm font-semibold text-foreground/70">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />
                      <Input
                        id="reg-confirm"
                        type="password"
                        required
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        placeholder="Confirm your password"
                        className="pl-10 h-11 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-400/20"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Benefits section */}
            <div className="mt-6 pt-5 border-t border-orange-100">
              <p className="text-xs text-foreground/30 font-semibold uppercase tracking-wider mb-3">Member Benefits</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Order tracking',
                  'Exclusive deals',
                  'Faster checkout',
                  'Wishlists',
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-xs text-foreground/40">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-400" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
