import { create } from 'zustand'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  image: string
  category: string
  featured: boolean
  rating: number
  reviewCount: number
  weight: string
  ingredients: string
  inStock: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

type ViewType = 'home' | 'shop' | 'about' | 'contact'

interface Store {
  currentView: ViewType
  setCurrentView: (view: ViewType) => void

  products: Product[]
  setProducts: (products: Product[]) => void
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  sortBy: string
  setSortBy: (s: string) => void

  selectedProduct: Product | null
  setSelectedProduct: (p: Product | null) => void

  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void

  checkoutOpen: boolean
  setCheckoutOpen: (open: boolean) => void
  orderPlaced: boolean
  setOrderPlaced: (placed: boolean) => void
  orderNumber: string
  setOrderNumber: (num: string) => void

  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void

  getCartTotal: () => number
  getCartItemCount: () => number
}

export const useStore = create<Store>((set, get) => ({
  currentView: 'home',
  setCurrentView: (view) => set({ currentView: view }),

  products: [],
  setProducts: (products) => set({ products }),
  selectedCategory: 'All',
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  sortBy: 'featured',
  setSortBy: (s) => set({ sortBy: s }),

  selectedProduct: null,
  setSelectedProduct: (p) => set({ selectedProduct: p }),

  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id)
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return { cart: [...state.cart, { product, quantity: 1 }] }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart:
        quantity <= 0
          ? state.cart.filter((item) => item.product.id !== productId)
          : state.cart.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
    })),
  clearCart: () => set({ cart: [] }),
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),

  checkoutOpen: false,
  setCheckoutOpen: (open) => set({ checkoutOpen: open }),
  orderPlaced: false,
  setOrderPlaced: (placed) => set({ orderPlaced: placed }),
  orderNumber: '',
  setOrderNumber: (num) => set({ orderNumber: num }),

  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  getCartTotal: () => {
    return get().cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  },
  getCartItemCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0)
  },
}))
