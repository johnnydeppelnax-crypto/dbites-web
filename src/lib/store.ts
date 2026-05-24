import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AuthState {
  phone: string | null;
  isAuthenticated: boolean;
  otpVerified: boolean;
}

interface UIState {
  currentPage: "home" | "shop" | "checkout" | "confirmation" | "about" | "contact" | "legal";
  legalPage: "privacy" | "terms" | "returns" | "shipping" | null;
  cartOpen: boolean;
  loginOpen: boolean;
  selectedProduct: Product | null;
}

interface OrderState {
  orderNumber: string | null;
  orderDate: string | null;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Auth
  auth: AuthState;
  setPhone: (phone: string) => void;
  login: (phone: string) => void;
  logout: () => void;

  // UI
  ui: UIState;
  setPage: (page: UIState["currentPage"]) => void;
  setLegalPage: (page: UIState["legalPage"]) => void;
  setCartOpen: (open: boolean) => void;
  setLoginOpen: (open: boolean) => void;
  setSelectedProduct: (product: Product | null) => void;

  // Order
  order: OrderState;
  setOrder: (orderNumber: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const cart = get().cart;
        const existing = cart.find((item) => item.product.id === product.id);
        if (existing) {
          set({
            cart: cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () =>
        get().cart.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
      getCartCount: () =>
        get().cart.reduce((sum, item) => sum + item.quantity, 0),

      auth: { phone: null, isAuthenticated: false, otpVerified: false },
      setPhone: (phone) =>
        set({ auth: { ...get().auth, phone } }),
      login: (phone) =>
        set({ auth: { phone, isAuthenticated: true, otpVerified: true } }),
      logout: () =>
        set({ auth: { phone: null, isAuthenticated: false, otpVerified: false } }),

      ui: {
        currentPage: "home",
        legalPage: null,
        cartOpen: false,
        loginOpen: false,
        selectedProduct: null,
      },
      setPage: (page) => set({ ui: { ...get().ui, currentPage: page } }),
      setLegalPage: (page) => set({ ui: { ...get().ui, legalPage: page } }),
      setCartOpen: (open) => set({ ui: { ...get().ui, cartOpen: open } }),
      setLoginOpen: (open) => set({ ui: { ...get().ui, loginOpen: open } }),
      setSelectedProduct: (product) =>
        set({ ui: { ...get().ui, selectedProduct: product } }),

      order: { orderNumber: null, orderDate: null },
      setOrder: (orderNumber) =>
        set({
          order: {
            orderNumber,
            orderDate: new Date().toLocaleDateString("en-GB"),
          },
        }),
    }),
    {
      name: "dbites-storage",
      partialize: (state) => ({
        cart: state.cart,
        auth: state.auth,
        order: state.order,
      }),
    }
  )
);
