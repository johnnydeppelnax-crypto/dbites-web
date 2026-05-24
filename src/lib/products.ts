export interface Product {
  id: number;
  name: string;
  price: number;
  weight: string;
  rating: number;
  reviews: number;
  category: string;
  featured: boolean;
  emoji: string;
  gradient: string;
  description: string;
  shortDesc: string;
}

export const products: Product[] = [
  {
    id: 1, name: "Classic Mango Slices", price: 12.99, weight: "100g", rating: 4.8, reviews: 124,
    category: "Tropical", featured: true, emoji: "🥭",
    gradient: "from-yellow-400 to-orange-500",
    description: "Sweet, sun-dried mango perfection. Our Classic Mango Slices are made from premium Alphonso mangoes, carefully dehydrated to preserve their natural sweetness and vibrant flavor. Each bite delivers a burst of tropical sunshine that transports you to paradise.",
    shortDesc: "Sweet, sun-dried mango perfection from premium Alphonso mangoes."
  },
  {
    id: 2, name: "Tropical Pineapple Chunks", price: 11.49, weight: "120g", rating: 4.7, reviews: 98,
    category: "Tropical", featured: true, emoji: "🍍",
    gradient: "from-yellow-300 to-green-400",
    description: "Sweet and tangy dried pineapple chunks that capture the essence of the tropics. These golden bites are dehydrated at peak ripeness to lock in the bold, vibrant pineapple flavor. Perfect as a snack or a tropical addition to your trail mix.",
    shortDesc: "Sweet and tangy golden pineapple chunks bursting with tropical flavor."
  },
  {
    id: 3, name: "Coconut Strips", price: 9.49, weight: "110g", rating: 4.4, reviews: 67,
    category: "Tropical", featured: false, emoji: "🥥",
    gradient: "from-amber-100 to-amber-700",
    description: "Toasted coconut strips with a satisfying crunch and rich, nutty flavor. Made from freshly harvested Thai coconuts, these strips are lightly toasted to bring out their natural oils and deepen their tropical flavor.",
    shortDesc: "Crunchy toasted coconut strips with rich, nutty tropical flavor."
  },
  {
    id: 4, name: "Sunset Papaya Strips", price: 10.99, weight: "100g", rating: 4.5, reviews: 82,
    category: "Tropical", featured: false, emoji: "🍈",
    gradient: "from-orange-400 to-pink-400",
    description: "Vibrant orange papaya strips that taste like a tropical sunset. Our papaya is harvested at peak sweetness from lush Caribbean orchards, then gently dehydrated to lock in its buttery texture and honeyed flavor.",
    shortDesc: "Vibrant orange papaya strips with buttery honeyed sweetness."
  },
  {
    id: 5, name: "Guava Paradise Bites", price: 13.49, weight: "100g", rating: 4.6, reviews: 91,
    category: "Tropical", featured: true, emoji: "🫐",
    gradient: "from-pink-400 to-rose-500",
    description: "Chewy dried guava slices bursting with tropical fragrance and sweet-tart flavor. These pink-hued gems are made from hand-picked tropical guavas, slowly dehydrated to concentrate their irresistible aroma.",
    shortDesc: "Chewy guava slices with tropical fragrance and sweet-tart flavor."
  },
  {
    id: 6, name: "Golden Jackfruit Chips", price: 14.99, weight: "90g", rating: 4.3, reviews: 56,
    category: "Tropical", featured: false, emoji: "🍈",
    gradient: "from-yellow-400 to-yellow-600",
    description: "Crispy jackfruit chips that deliver the unique sweet banana-pineapple flavor of this tropical giant. Each chip is thinly sliced from ripe jackfruit and slow-dehydrated until perfectly crunchy.",
    shortDesc: "Crispy chips with sweet banana-pineapple jackfruit flavor."
  },
  {
    id: 7, name: "Lychee Gems", price: 15.99, weight: "80g", rating: 4.7, reviews: 103,
    category: "Tropical", featured: true, emoji: "🍈",
    gradient: "from-pink-200 to-pink-100",
    description: "Delicate dried lychee with a floral, rose-like sweetness that melts in your mouth. These translucent gems are crafted from premium lychees harvested at the peak of their aromatic bloom.",
    shortDesc: "Delicate lychee with floral, rose-like sweetness."
  },
  {
    id: 8, name: "Star Fruit Crisps", price: 12.49, weight: "90g", rating: 4.4, reviews: 45,
    category: "Tropical", featured: false, emoji: "⭐",
    gradient: "from-yellow-300 to-lime-300",
    description: "Stunning star-shaped fruit crisps with a sweet-tart tropical flavor. These golden stars are sliced from perfectly ripe star fruit and dehydrated into crunchy, visually striking snacks.",
    shortDesc: "Star-shaped crisps with sweet-tart tropical crunch."
  },
  {
    id: 9, name: "Cantaloupe Ribbons", price: 10.49, weight: "100g", rating: 4.5, reviews: 52,
    category: "Tropical", featured: false, emoji: "🍈",
    gradient: "from-orange-300 to-orange-200",
    description: "Sweet, juicy cantaloupe dried into tender ribbons that melt with concentrated melon flavor. Our cantaloupe is vine-ripened under the hot sun, then sliced and dehydrated into vibrant orange strips.",
    shortDesc: "Tender melon ribbons with concentrated sweet cantaloupe flavor."
  },
  {
    id: 10, name: "Berry Medley Mix", price: 14.99, weight: "150g", rating: 4.9, reviews: 156,
    category: "Berries", featured: true, emoji: "🫐",
    gradient: "from-purple-500 to-red-400",
    description: "A luxurious blend of strawberries, blueberries, and raspberries. Our Berry Medley combines three of nature's finest berries into one irresistible mix. Each berry is individually dried to preserve its unique flavor profile.",
    shortDesc: "Luxurious strawberry, blueberry & raspberry blend."
  },
  {
    id: 11, name: "Strawberry Crisps", price: 13.99, weight: "80g", rating: 4.8, reviews: 132,
    category: "Berries", featured: true, emoji: "🍓",
    gradient: "from-red-400 to-pink-300",
    description: "Intensely flavored dried strawberry slices that capture the essence of peak-season berries. Each slice is freeze-dried to preserve its vivid red color and concentrated sweetness.",
    shortDesc: "Intensely flavored freeze-dried strawberry slices."
  },
  {
    id: 12, name: "Wild Blueberry Bites", price: 15.49, weight: "100g", rating: 4.7, reviews: 87,
    category: "Berries", featured: false, emoji: "🫐",
    gradient: "from-blue-700 to-purple-600",
    description: "Tiny but mighty, these wild blueberries are dried to perfection for a burst of antioxidant-rich flavor. Smaller and more intensely flavored than cultivated berries.",
    shortDesc: "Wild blueberries packed with antioxidant-rich intense flavor."
  },
  {
    id: 13, name: "Raspberry Crumbles", price: 14.49, weight: "90g", rating: 4.6, reviews: 74,
    category: "Berries", featured: false, emoji: "🫐",
    gradient: "from-red-500 to-pink-400",
    description: "Tangy-sweet dried raspberry pieces that deliver an explosion of berry flavor. These ruby-red crumbles are made from perfectly ripe raspberries, gently dried to preserve their signature tartness.",
    shortDesc: "Tangy-sweet ruby-red raspberry pieces bursting with flavor."
  },
  {
    id: 14, name: "Dark Cherry Bites", price: 14.99, weight: "100g", rating: 4.6, reviews: 93,
    category: "Berries", featured: false, emoji: "🍒",
    gradient: "from-red-800 to-purple-700",
    description: "Rich, sweet-tart dried cherries with a deep, complex flavor that cherry lovers adore. These dark beauties are made from Montmorency cherries, slowly dried to develop their natural sweetness.",
    shortDesc: "Rich Montmorency cherries with deep complex sweetness."
  },
  {
    id: 15, name: "Cranberry Zing", price: 11.99, weight: "120g", rating: 4.5, reviews: 68,
    category: "Berries", featured: false, emoji: "🫐",
    gradient: "from-red-500 to-orange-400",
    description: "Bright, tangy dried cranberries with just a whisper of natural sweetness. These vibrant red gems are infused with a touch of apple juice to balance their natural tartness.",
    shortDesc: "Bright tangy cranberries with balanced sweet-sour taste."
  },
  {
    id: 16, name: "Acai Superberries", price: 18.99, weight: "70g", rating: 4.8, reviews: 109,
    category: "Berries", featured: true, emoji: "🫐",
    gradient: "from-purple-800 to-blue-700",
    description: "Dried acai berries packed with powerful antioxidants and a deep, rich berry-chocolate flavor. These superfruit gems are freeze-dried to preserve their legendary nutritional profile.",
    shortDesc: "Antioxidant-rich acai with deep berry-chocolate flavor."
  },
  {
    id: 17, name: "Zesty Orange Slices", price: 10.99, weight: "100g", rating: 4.5, reviews: 76,
    category: "Citrus", featured: false, emoji: "🍊",
    gradient: "from-orange-500 to-yellow-400",
    description: "Candied orange slices with natural zest that deliver a bright, citrusy burst of flavor. These sun-kissed slices capture the full essence of Valencia oranges.",
    shortDesc: "Bright candied Valencia orange slices with natural zest."
  },
  {
    id: 18, name: "Sunny Lemon Rings", price: 9.99, weight: "100g", rating: 4.4, reviews: 58,
    category: "Citrus", featured: false, emoji: "🍋",
    gradient: "from-yellow-400 to-lime-300",
    description: "Tangy dried lemon rings that deliver a zingy, refreshing citrus punch. These bright yellow rings are dehydrated with their peel intact for an intense, aromatic lemon experience.",
    shortDesc: "Zingy dried lemon rings with intense aromatic citrus punch."
  },
  {
    id: 19, name: "Lime Zest Wheels", price: 9.99, weight: "90g", rating: 4.3, reviews: 41,
    category: "Citrus", featured: false, emoji: "🍈",
    gradient: "from-green-400 to-lime-300",
    description: "Intensely flavored dried lime wheels with an aromatic, tangy kick. These emerald-green wheels capture the bold, fragrant essence of fresh limes in a convenient dried form.",
    shortDesc: "Aromatic emerald lime wheels with bold tangy kick."
  },
  {
    id: 20, name: "Tangerine Dream Segments", price: 11.49, weight: "100g", rating: 4.7, reviews: 95,
    category: "Citrus", featured: true, emoji: "🍊",
    gradient: "from-orange-400 to-amber-300",
    description: "Sweet, easy-to-love dried tangerine segments with a milder, honeyed citrus flavor. These golden-orange segments are made from premium Murcott tangerines, dried to chewy perfection.",
    shortDesc: "Honeyed Murcott tangerine segments, sweet and chewy."
  },
  {
    id: 21, name: "Ruby Grapefruit Slices", price: 11.99, weight: "100g", rating: 4.5, reviews: 63,
    category: "Citrus", featured: false, emoji: "🫐",
    gradient: "from-pink-500 to-red-400",
    description: "Beautiful dried grapefruit slices with a delightful bitter-sweet balance and stunning ruby hue. These rosy-pink slices capture the complex flavor profile of ruby red grapefruit.",
    shortDesc: "Ruby-red grapefruit with delightful bitter-sweet balance."
  },
  {
    id: 22, name: "Exotic Dragon Fruit", price: 16.99, weight: "80g", rating: 4.7, reviews: 88,
    category: "Exotic", featured: false, emoji: "🫐",
    gradient: "from-fuchsia-500 to-pink-400",
    description: "Premium dried dragon fruit with its stunning magenta color and subtle sweetness. This exotic superfruit is carefully dehydrated to preserve its vibrant hue and delicate flavor.",
    shortDesc: "Stunning magenta dragon fruit, rich in antioxidants."
  },
  {
    id: 23, name: "Sweet Kiwi Coins", price: 11.99, weight: "100g", rating: 4.3, reviews: 54,
    category: "Exotic", featured: false, emoji: "🥝",
    gradient: "from-green-400 to-amber-600",
    description: "Chewy kiwi slices that pack a tangy-sweet punch. These emerald-green coins are made from sun-ripened kiwis, dehydrated to chewy perfection.",
    shortDesc: "Emerald kiwi coins with tangy-sweet tropical punch."
  },
  {
    id: 24, name: "Pomegranate Arils", price: 15.99, weight: "90g", rating: 4.6, reviews: 79,
    category: "Exotic", featured: false, emoji: "🫐",
    gradient: "from-red-600 to-red-800",
    description: "Tart-sweet dried pomegranate seeds that burst with flavor. These ruby-red arils are carefully extracted and dehydrated to create a crunchy, tangy-sweet superfood snack.",
    shortDesc: "Crunchy ruby-red pomegranate arils, nature's candy."
  },
  {
    id: 25, name: "Passion Fruit Leather", price: 13.99, weight: "80g", rating: 4.8, reviews: 117,
    category: "Exotic", featured: true, emoji: "🫐",
    gradient: "from-purple-500 to-yellow-400",
    description: "A roll of pure passion fruit leather that captures the intense tropical flavor of fresh passion fruit. This artisan fruit leather is made from 100% passion fruit puree, slow-dried into a chewy strip.",
    shortDesc: "100% pure passion fruit leather, chewy and intense."
  },
  {
    id: 26, name: "Persimmon Petals", price: 13.49, weight: "100g", rating: 4.5, reviews: 48,
    category: "Exotic", featured: false, emoji: "🫐",
    gradient: "from-orange-500 to-orange-700",
    description: "Honey-sweet dried persimmon slices with a rich, date-like flavor and silky texture. These deep orange petals are crafted from fully ripened Fuyu persimmons.",
    shortDesc: "Honey-sweet Fuyu persimmon petals with silky texture."
  },
  {
    id: 27, name: "Mango Chili Explosion", price: 13.99, weight: "100g", rating: 4.9, reviews: 143,
    category: "Exotic", featured: true, emoji: "🥭",
    gradient: "from-red-500 to-orange-500",
    description: "Sweet mango meets fiery chili in this addictive sweet-spicy snack. Premium Alphonso mango slices are dusted with a blend of chili, lime, and sea salt for a flavor rollercoaster.",
    shortDesc: "Addictive chili-dusted mango — sweet, tangy, fiery kick!"
  },
  {
    id: 28, name: "Watermelon Jerky", price: 14.49, weight: "80g", rating: 4.4, reviews: 62,
    category: "Exotic", featured: false, emoji: "🍉",
    gradient: "from-red-500 to-green-500",
    description: "Thick, chewy watermelon jerky that captures the essence of summer in every bite. These ruby-red strips are made from seedless watermelon, slow-dehydrated into a surprisingly meaty, jerky-like texture.",
    shortDesc: "Unique chewy watermelon jerky — summer in every bite."
  },
  {
    id: 29, name: "Crispy Apple Rings", price: 9.99, weight: "100g", rating: 4.6, reviews: 101,
    category: "Classic", featured: true, emoji: "🍎",
    gradient: "from-red-400 to-green-400",
    description: "Light, crunchy apple rings with a hint of cinnamon. Made from freshly picked Granny Smith apples, these crispy rings are the perfect balance of tart and sweet with a warm cinnamon finish.",
    shortDesc: "Crunchy cinnamon-kissed Granny Smith apple rings."
  },
  {
    id: 30, name: "Golden Banana Chips", price: 8.99, weight: "120g", rating: 4.4, reviews: 89,
    category: "Classic", featured: false, emoji: "🍌",
    gradient: "from-yellow-300 to-yellow-500",
    description: "Crispy unsweetened banana chips that are naturally sweet and satisfyingly crunchy. Made from perfectly ripe Cavendish bananas, slowly dehydrated to achieve the ideal crispiness.",
    shortDesc: "Naturally sweet crispy Cavendish banana chips."
  },
  {
    id: 31, name: "Cinnamon Pear Bites", price: 10.49, weight: "120g", rating: 4.5, reviews: 55,
    category: "Classic", featured: false, emoji: "🍈",
    gradient: "from-yellow-200 to-amber-700",
    description: "Spiced dried pear pieces infused with warm cinnamon. These tender pear bites combine the natural sweetness of Bartlett pears with the comforting warmth of Ceylon cinnamon.",
    shortDesc: "Warm cinnamon-infused Bartlett pear bites."
  },
  {
    id: 32, name: "Royal Apricot Halves", price: 11.99, weight: "120g", rating: 4.6, reviews: 77,
    category: "Classic", featured: false, emoji: "🫛",
    gradient: "from-orange-400 to-yellow-400",
    description: "Sun-ripened dried apricot halves with a velvety texture and rich, tangy-sweet flavor. These golden-orange gems are made from Turkish apricots, naturally sun-dried.",
    shortDesc: "Velvety Turkish apricot halves, sun-ripened perfection."
  },
  {
    id: 33, name: "Summer Peach Rings", price: 12.49, weight: "110g", rating: 4.7, reviews: 94,
    category: "Classic", featured: true, emoji: "🍈",
    gradient: "from-peach-300 to-orange-400",
    description: "Sweet, chewy dried peach rings that capture the juicy essence of a perfect summer peach. These golden rings are made from tree-ripened Georgia peaches, slowly dehydrated.",
    shortDesc: "Chewy Georgia peach rings — summer orchard goodness."
  },
  {
    id: 34, name: "Velvet Fig Halves", price: 13.99, weight: "110g", rating: 4.6, reviews: 71,
    category: "Classic", featured: false, emoji: "🫐",
    gradient: "from-purple-600 to-amber-700",
    description: "Luxuriously sweet dried fig halves with a jammy, honeyed center. These Mediterranean figs are sun-dried until their natural sugars caramelize into a rich, complex sweetness.",
    shortDesc: "Luxurious Mediterranean figs with jammy honeyed centers."
  },
  {
    id: 35, name: "Dark Plum Prunes", price: 10.99, weight: "130g", rating: 4.4, reviews: 46,
    category: "Classic", featured: false, emoji: "🫐",
    gradient: "from-purple-900 to-stone-600",
    description: "Impossibly juicy dried plums with a deep, wine-like sweetness and silky texture. These premium prunes are made from sun-ripened d'Agen plums, slow-dried to perfection.",
    shortDesc: "Juicy d'Agen prunes with deep wine-like sweetness."
  },
  {
    id: 36, name: "Medjool Date Jewels", price: 16.49, weight: "150g", rating: 4.9, reviews: 138,
    category: "Classic", featured: true, emoji: "🫐",
    gradient: "from-amber-700 to-yellow-500",
    description: "Premium Medjool dates, nature's candy, with a caramel-like richness and creamy, melt-in-your-mouth texture. These royal dates are hand-selected for their exceptional size and quality.",
    shortDesc: "Royal hand-selected Medjool dates — nature's caramel candy."
  },
  {
    id: 37, name: "Vineyard Grape Raisins", price: 7.99, weight: "150g", rating: 4.3, reviews: 83,
    category: "Classic", featured: false, emoji: "🫐",
    gradient: "from-purple-500 to-green-400",
    description: "Plump, juicy raisins made from premium Thompson seedless grapes, sun-dried to perfection. These are not your average raisins — each one is a tiny burst of concentrated grape sweetness.",
    shortDesc: "Premium sun-dried Thompson raisins, plump and sweet."
  },
  {
    id: 38, name: "Tropical Paradise Mix", price: 15.99, weight: "200g", rating: 4.9, reviews: 167,
    category: "Mixes", featured: true, emoji: "🫐",
    gradient: "from-yellow-400 via-pink-400 to-purple-500",
    description: "An irresistible blend of mango, pineapple, papaya, coconut, and banana. Our signature Tropical Paradise Mix takes you on a flavor vacation with every handful.",
    shortDesc: "Signature 5-fruit tropical blend — a flavor vacation!"
  },
];

export const categories = ["All", "Tropical", "Berries", "Citrus", "Exotic", "Classic", "Mixes"];
