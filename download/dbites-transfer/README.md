# D-Bites — Premium Dehydrated Fruits E-Commerce Website

## Quick Start (Antigravity / Any Platform)

### 1. Extract the source code
```bash
tar -xzf dbites-source.tar.gz -C your-project-folder
cd your-project-folder
```

### 2. Install dependencies
```bash
npm install
# or
bun install
```

### 3. Setup database
```bash
npx prisma generate
npx prisma db push
```

### 4. Run development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
npm run start
```

---

## Project Structure

```
├── public/
│   ├── dbites-logo.png          # D-Bites logo
│   └── products/                # Product images
│       ├── apple.png, mango.png, pineapple.png, etc.  # Original product images
│       ├── 3d-orange.png, 3d-lemon.png, etc.         # 3D rendered floating fruit images
│       └── tropical-splash.png  # Hero splash image
├── src/
│   ├── app/
│   │   ├── globals.css          # Tropical theme, 3D animations, gradients
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Main page with routing
│   │   └── api/                 # API routes
│   │       ├── products/route.ts
│   │       ├── orders/route.ts
│   │       └── seed/route.ts    # Database seeder
│   ├── components/
│   │   ├── hero.tsx             # Hero with 3D floating fruits
│   │   ├── header.tsx           # Glass-morphism tropical nav
│   │   ├── product-card.tsx     # Product cards with tropical styling
│   │   ├── featured-products.tsx
│   │   ├── product-catalog.tsx  # Full shop with filters
│   │   ├── why-dbites.tsx       # Value propositions
│   │   ├── about-section.tsx    # About D-Bites
│   │   ├── contact-section.tsx  # Contact form & info
│   │   ├── footer.tsx           # Footer with 3D fruit silhouettes
│   │   ├── floating-fruits.tsx  # Reusable 3D floating fruits component
│   │   ├── cart-drawer.tsx      # Shopping cart slide-out
│   │   ├── checkout-modal.tsx   # Checkout flow
│   │   ├── product-detail.tsx   # Product detail modal
│   │   └── ui/                  # shadcn/ui components
│   ├── lib/
│   │   ├── store.ts             # Zustand state management
│   │   ├── utils.ts             # Utility functions
│   │   └── db.ts                # Prisma client
│   └── hooks/
│       ├── use-mobile.ts
│       └── use-toast.ts
├── prisma/
│   └── schema.prisma            # Database schema (SQLite)
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## Tech Stack
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui** components
- **Prisma** ORM with SQLite
- **Zustand** for state management
- **Framer Motion** for animations
- **3D CSS transforms** for floating fruit effects

## Color Palette
- Mango Orange: #FF6B00
- Turquoise Blue: #00C9DB
- Vibrant Purple: #8B5CF6

## 3D Floating Fruits
The website features prominent 3D-rendered fruit images that float throughout the background using CSS 3D transforms and Framer Motion animations. The `FloatingFruits` component supports three variants:
- `hero` — Large, prominent fruits for the hero section
- `section` — Medium fruits for content sections
- `full` — Subtle global background layer

## Environment
The project uses SQLite by default. For production, you may want to switch to PostgreSQL by updating `prisma/schema.prisma` and the `DATABASE_URL` in `.env`.
