"use client";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  ShoppingCart,
  User,
  LogOut,
  Package,
  Phone,
} from "lucide-react";
import { PhoneOTPLogin } from "./PhoneOTPLogin";
import { useState } from "react";

const navLinks = [
  { label: "Home", page: "home" as const },
  { label: "Shop", page: "shop" as const },
  { label: "About", page: "about" as const },
  { label: "Contact", page: "contact" as const },
];

export function Header() {
  const { ui, setPage, setCartOpen, setLoginOpen, auth, logout, cart } =
    useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <span className="text-3xl">🥭</span>
            <span className="text-xl font-bold text-primary">
              D-<span className="text-accent">Bites</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Button
                key={link.page}
                variant="ghost"
                onClick={() => setPage(link.page)}
                className={`rounded-full px-4 font-medium transition-colors ${
                  ui.currentPage === link.page
                    ? "bg-accent/10 text-accent"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Auth */}
            {auth.isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden items-center gap-2 rounded-full sm:flex"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {auth.phone?.slice(-2) || "U"}
                    </div>
                    <span className="text-sm">{auth.phone}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Package className="h-4 w-4" />
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="gap-2 text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                className="hidden items-center gap-2 rounded-full sm:flex"
                onClick={() => setLoginOpen(true)}
              >
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Sign In</span>
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <span className="text-2xl">🥭</span>
                    D-Bites
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Button
                      key={link.page}
                      variant="ghost"
                      onClick={() => {
                        setPage(link.page);
                        setMobileOpen(false);
                      }}
                      className={`justify-start rounded-lg px-4 ${
                        ui.currentPage === link.page
                          ? "bg-accent/10 text-accent"
                          : ""
                      }`}
                    >
                      {link.label}
                    </Button>
                  ))}
                  <div className="my-3 h-px bg-border" />
                  {auth.isAuthenticated ? (
                    <Button
                      variant="ghost"
                      className="justify-start gap-2 text-destructive"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      className="justify-start gap-2"
                      onClick={() => {
                        setLoginOpen(true);
                        setMobileOpen(false);
                      }}
                    >
                      <Phone className="h-4 w-4" />
                      Sign In with Phone
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <PhoneOTPLogin />
    </>
  );
}
