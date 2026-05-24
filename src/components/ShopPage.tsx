"use client";

import { products, categories } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "./ProductCard";
import { ProductDetail } from "./ProductDetail";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState, useMemo } from "react";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "rating", label: "Top Rated" },
];

export function ShopPage() {
  const { ui } = useStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q)
      );
    }

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [search, category, sort]);

  return (
    <div className="px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Our Collection
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Explore All Flavors
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            From tropical delights to classic favorites, there&apos;s a perfect
            bite for every palate.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search delicious fruits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-full border-border/50"
            />
          </div>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full rounded-full border-border/50 sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(cat)}
              className={`rounded-full ${
                category === cat
                  ? "bg-accent text-white hover:bg-accent/90"
                  : "border-border/50 hover:border-accent hover:text-accent"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <span className="text-5xl">🔍</span>
            <h3 className="mt-4 text-lg font-semibold">No products found</h3>
            <p className="mt-1 text-muted-foreground">
              Try adjusting your search or filter
            </p>
            <Button
              variant="outline"
              className="mt-4 rounded-full"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Showing {filtered.length} of {products.length} products
        </p>
      </div>

      {/* Product detail modal */}
      {ui.selectedProduct && <ProductDetail />}
    </div>
  );
}
