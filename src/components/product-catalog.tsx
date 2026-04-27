'use client'

import { useStore } from '@/lib/store'
import ProductCard from './product-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X, SlidersHorizontal, Leaf } from 'lucide-react'
import { motion } from 'framer-motion'

const categories = ['All', 'Tropical', 'Berries', 'Citrus', 'Exotic', 'Classic']

const categoryIcons: Record<string, string> = {
  All: '🌿',
  Tropical: '🌴',
  Berries: '🫐',
  Citrus: '🍊',
  Exotic: '🐉',
  Classic: '🍎',
}

export default function ProductCatalog() {
  const { products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, sortBy, setSortBy } = useStore()

  let filtered = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  switch (sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
    default:
      break
  }

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-accent tracking-widest uppercase mb-3 block">
            Our Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Explore <span className="gradient-text">All Flavors</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            From tropical delights to classic favorites, there is a perfect bite for every palate.
          </p>
        </motion.div>

        {/* Filters bar - clean minimal */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 p-4 rounded-xl bg-muted/30 border border-border/30">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search delicious fruits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border-border/50 focus:border-primary bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            )}
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px] border-border/50 bg-white">
              <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category pills - clean minimal */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 transition-all duration-300 text-sm ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-sm border-primary'
                  : 'border-border/50 hover:border-primary/30 hover:text-primary'
              }`}
            >
              <span className="mr-1">{categoryIcons[cat]}</span>
              {cat}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              Try adjusting your search or filter to find what you&apos;re looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="px-6"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Results count */}
        {filtered.length > 0 && (
          <p className="text-center text-sm text-muted-foreground mt-10">
            Showing {filtered.length} of {products.length} products
          </p>
        )}
      </div>
    </section>
  )
}
