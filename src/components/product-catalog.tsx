'use client'

import { useStore } from '@/lib/store'
import ProductCard from './product-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const categories = ['All', 'Tropical', 'Berries', 'Citrus', 'Exotic', 'Classic', 'Mixes']

const categoryColors: Record<string, string> = {
  All: 'from-emerald-500 to-teal-500',
  Tropical: 'from-orange-500 to-amber-500',
  Berries: 'from-rose-500 to-pink-500',
  Citrus: 'from-yellow-500 to-orange-500',
  Exotic: 'from-purple-500 to-violet-500',
  Classic: 'from-emerald-500 to-green-500',
  Mixes: 'from-cyan-500 to-blue-500',
}

export default function ProductCatalog() {
  const { products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, sortBy, setSortBy } = useStore()

  let filtered = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  switch (sortBy) {
    case 'price-low': filtered.sort((a, b) => a.price - b.price); break
    case 'price-high': filtered.sort((a, b) => b.price - a.price); break
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break
    default: break
  }

  return (
    <section className="py-20 md:py-28 bg-tropical-gradient relative overflow-hidden">
      {/* Lightweight floating fruit accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-10 animate-float-gentle-1">
          <span className="text-4xl md:text-6xl opacity-15 select-none" role="img" aria-label="pineapple">🍍</span>
        </div>
        <div className="absolute bottom-10 -right-8 animate-float-gentle-2">
          <span className="text-3xl md:text-5xl opacity-15 select-none" role="img" aria-label="mango">🥭</span>
        </div>
        <div className="absolute top-1/3 right-[2%] animate-float-gentle-3 hidden lg:block">
          <span className="text-2xl opacity-18 select-none" role="img" aria-label="orange">🍊</span>
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-cyan-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
            <span className="bg-gradient-to-r from-orange-600 to-cyan-600 bg-clip-text text-transparent">Our Collection</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-5">Explore <span className="gradient-text">All Flavors</span></h2>
          <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed text-lg">From tropical delights to classic favorites, there is a perfect bite for every palate.</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 backdrop-blur-sm border border-orange-200/30 shadow-sm">
          <div className="relative flex-1 max-w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400" />
            <Input placeholder="Search delicious fruits..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 border-orange-200/50 focus:border-orange-400 bg-white/80 h-10" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-foreground/40 hover:text-foreground transition-colors" />
              </button>
            )}
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px] border-orange-200/50 bg-white/80 h-10">
              <SlidersHorizontal className="h-4 w-4 mr-2 text-orange-400" />
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

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          {categories.map((cat) => (
            <Button 
              key={cat} 
              variant={selectedCategory === cat ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setSelectedCategory(cat)} 
              className={`rounded-full px-3 sm:px-5 transition-all duration-300 text-xs sm:text-sm font-bold border-0 h-8 sm:h-9 ${
                selectedCategory === cat 
                  ? `bg-gradient-to-r ${categoryColors[cat]} text-white shadow-md` 
                  : 'bg-white/60 backdrop-blur-sm text-foreground/60 hover:text-foreground hover:bg-white/80'
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-cyan-100 flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-orange-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">No products found</h3>
            <p className="text-sm text-foreground/50 mb-6 max-w-sm mx-auto">Try adjusting your search or filter to find what you&apos;re looking for.</p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('All') }} className="px-6 rounded-xl">Clear Filters</Button>
          </motion.div>
        )}

        {filtered.length > 0 && (
          <p className="text-center text-sm text-foreground/40 mt-10 font-medium">Showing {filtered.length} of {products.length} products</p>
        )}
      </div>
    </section>
  )
}
