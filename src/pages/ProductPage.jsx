import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LuChevronDown, LuChevronRight, LuHeart, LuMinus, LuPlus, LuRuler, LuShare2, LuShoppingBag, LuTruck, LuUndo2, LuBadgeCheck } from 'react-icons/lu'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { ProductCard } from '../components/BestSellers'
import { getProduct, products } from '../data/products'

const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`

function Benefit({ icon: Icon, title, copy }) {
  return <div className="flex items-center gap-4 border-r border-ink/10 last:border-r-0 sm:justify-center"><Icon className="h-7 w-7 shrink-0 text-ink" strokeWidth={1.7} /><div><p className="text-[11px] font-semibold text-ink sm:text-xs">{title}</p><p className="mt-1 text-[10px] text-ink/55">{copy}</p></div></div>
}

export default function ProductPage() {
  const { productId } = useParams()
  const product = getProduct(productId)
  const [selectedSize, setSelectedSize] = useState('L')
  const [quantity, setQuantity] = useState(1)
  const [liked, setLiked] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [openTab, setOpenTab] = useState('Description')

  if (!product) {
    return <><SiteHeader /><main className="mx-auto min-h-[60vh] max-w-[1680px] px-5 py-24 text-center sm:px-8 lg:px-16 xl:px-20"><h1 className="font-heading text-4xl font-extrabold">Product not found<span className="text-brand">.</span></h1><Link to="/" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">Back to shop</Link></main><SiteFooter /></>
  }

  const related = products.filter((item) => item.id !== product.id).slice(0, 5)
  const gallery = product.images?.length ? product.images : [product.image]

  const selectedImage = Math.min(activeImage, gallery.length - 1)

  return <>
    <SiteHeader />
    <main className="bg-paper text-ink">
      <div className="mx-auto max-w-[1680px] px-5 pb-10 pt-6 sm:px-8 sm:pt-8 lg:px-16 xl:px-20">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] text-ink/55 sm:text-[11px]"><Link to="/" className="hover:text-brand">Home</Link><LuChevronRight className="h-3 w-3" /><Link to="/#new-arrivals" className="hover:text-brand">T-Shirts</Link><LuChevronRight className="h-3 w-3" /><span className="text-ink">{product.name}</span></nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.9fr] lg:gap-12 xl:mt-7 xl:gap-16">
          <section className="grid gap-3 sm:grid-cols-[5.5rem_1fr] lg:gap-4" aria-label={`${product.name} images`}>
            <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
              {gallery.slice(0, 4).map((image, index) => <button key={`${image}-${index}`} type="button" onClick={() => setActiveImage(index)} className={`relative aspect-square w-20 overflow-hidden rounded-xl border bg-paper-200 sm:w-[5.5rem] ${selectedImage === index ? 'border-brand ring-1 ring-brand' : 'border-ink/[0.08]'}`} aria-label={`View product image ${index + 1}`}><img src={image} alt="" className="h-full w-full object-cover object-[50%_25%]" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" /></button>)}
              {gallery.length > 4 ? <button type="button" className="grid h-10 w-10 place-items-center self-center rounded-full bg-ink/[0.05]" aria-label="More product images"><LuChevronDown className="h-4 w-4" /></button> : null}
            </div>
            <div className="relative order-1 aspect-[4/4.5] overflow-hidden rounded-2xl border border-ink/[0.06] bg-paper-200 sm:order-2"><img src={gallery[selectedImage]} alt={product.alt} className="h-full w-full object-cover object-[50%_25%] transition-opacity duration-300" /><button type="button" onClick={() => setLiked(!liked)} aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'} className={`absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/90 shadow-sm ${liked ? 'text-brand' : 'text-ink'}`}><LuHeart className="h-5 w-5" fill={liked ? 'currentColor' : 'none'} /></button></div>
          </section>

          <section className="lg:pt-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/55">{product.series}</p>
            <h1 className="mt-3 font-heading text-[clamp(2.35rem,5vw,4.1rem)] font-extrabold leading-[0.92] tracking-[-0.06em]">{product.name}<span className="text-brand">.</span></h1>
            <p className="mt-4 max-w-xl text-sm leading-[1.6] text-ink/65">{product.description ?? 'Premium anime-inspired streetwear designed for everyday comfort and bold expression.'}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3"><span className="font-heading text-3xl font-extrabold tracking-tight">{formatPrice(product.price)}</span>{product.compareAt ? <><span className="text-base text-ink/45 line-through">{formatPrice(product.compareAt)}</span><span className="rounded-lg bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand">{product.discount}</span></> : null}</div>
            <div className="mt-5 flex flex-wrap items-center gap-5 border-y border-ink/10 py-4 text-xs"><span className="font-semibold">★ {product.rating ?? '4.9'}</span><span className="text-ink/65">({product.reviews ?? '1,248'} reviews)</span><span className="text-ink/65">♨ {product.bought ?? '2.3K+'} bought this month</span></div>

            <div className="mt-6 flex items-center justify-between"><p className="text-xs font-bold">Size</p><button type="button" className="inline-flex items-center gap-1 text-[11px] font-medium underline underline-offset-4"><LuRuler className="h-3.5 w-3.5" /> Size Guide</button></div>
            <div className="mt-3 grid grid-cols-5 gap-2">{(product.sizes ?? ['S','M','L','XL','XXL']).map((size) => <button key={size} type="button" onClick={() => setSelectedSize(size)} className={`h-11 rounded-lg border text-xs font-medium transition-colors ${selectedSize === size ? 'border-ink bg-ink text-white' : 'border-ink/15 hover:border-ink/50'}`}>{size}</button>)}</div>
            <p className="mt-6 text-xs font-bold">Color: <span className="font-normal text-ink/65">{product.colors?.[0]?.name ?? 'Black'}</span></p>
            <div className="mt-3 flex gap-3">{product.colors?.map((color, index) => <button key={color.name} type="button" title={color.name} aria-label={`Select ${color.name}`} className={`h-7 w-7 rounded-full border-2 ${index === 0 ? 'border-ink' : 'border-ink/20'}`} style={{ backgroundColor: color.value }} />)}</div>
            <div className="mt-6 flex items-center gap-3"><p className="text-xs font-bold">Quantity</p><div className="ml-2 flex h-11 items-center rounded-lg border border-ink/15"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="grid h-full w-10 place-items-center hover:text-brand" aria-label="Decrease quantity"><LuMinus className="h-3.5 w-3.5" /></button><span className="w-9 text-center text-sm">{quantity}</span><button type="button" onClick={() => setQuantity(quantity + 1)} className="grid h-full w-10 place-items-center hover:text-brand" aria-label="Increase quantity"><LuPlus className="h-3.5 w-3.5" /></button></div></div>
            <div className="mt-7 grid gap-3 sm:grid-cols-[1.2fr_1fr]"><button type="button" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ink text-sm font-semibold text-white transition-colors hover:bg-brand"><LuShoppingBag className="h-4 w-4" /> Add to Cart</button><button type="button" className="h-12 rounded-xl border border-ink text-sm font-semibold transition-colors hover:bg-ink hover:text-white">Buy Now <span className="ml-2">→</span></button></div>
            <div className="mt-7 grid gap-4 border-t border-ink/10 pt-6 sm:grid-cols-3"><div className="flex items-center gap-2 text-[10px] text-ink/60"><LuShare2 className="h-4 w-4" /> Share product</div><div className="text-[10px] text-ink/60">Free shipping over ₹1,499</div><div className="text-[10px] text-ink/60">7-day easy returns</div></div>
          </section>
        </div>
      </div>

      <div className="border-y border-ink/[0.08] bg-white/35"><div className="mx-auto grid max-w-[1680px] gap-5 px-5 py-6 sm:grid-cols-3 sm:px-8 lg:px-16 xl:px-20"><Benefit icon={LuTruck} title="Free Shipping" copy="On orders above ₹1,499" /><Benefit icon={LuUndo2} title="Easy Returns" copy="7-day hassle free returns" /><Benefit icon={LuBadgeCheck} title="Premium Quality" copy="Soft, durable & long-lasting" /></div></div>

      <section className="mx-auto max-w-[1680px] px-5 py-10 sm:px-8 lg:px-16 lg:py-14 xl:px-20"><div className="flex gap-8 border-b border-ink/10 overflow-x-auto">{['Description', 'Details', 'Size Chart', `Reviews (${product.reviews ?? '1,248'})`].map((tab) => <button key={tab} type="button" onClick={() => setOpenTab(tab)} className={`shrink-0 pb-3 text-sm font-medium ${openTab === tab ? 'border-b-2 border-brand text-ink' : 'text-ink/60'}`}>{tab}</button>)}</div><div className="pt-7"><div><h2 className="font-heading text-2xl font-extrabold tracking-tight">About This Product</h2><p className="mt-3 max-w-2xl text-sm leading-[1.7] text-ink/70">{product.description ?? 'Made for fans who want premium comfort with a little more story in every outfit.'}</p>{product.bullets ? <ul className="mt-5 grid gap-2 text-xs text-ink/75">{product.bullets.map((bullet) => <li key={bullet} className="flex gap-2"><span className="text-brand">✓</span>{bullet}</li>)}</ul> : null}</div></div></section>

      <section className="border-t border-ink/[0.08] px-5 py-10 sm:px-8 lg:px-16 lg:py-14 xl:px-20"><div className="mx-auto max-w-[1680px]"><div className="flex items-end justify-between"><h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">You Might Also Like<span className="text-brand">.</span></h2><Link to="/#new-arrivals" className="text-xs font-semibold hover:text-brand">View All →</Link></div><div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></div></section>


      <section className="relative isolate min-h-[18rem] overflow-hidden bg-ink text-white sm:min-h-[22rem]"><img src="/images/one-piece-collection.webp" alt="Luffy overlooking a crimson castle landscape" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" decoding="async" /><div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" /><div className="relative mx-auto flex min-h-[18rem] max-w-[1680px] items-center px-5 py-10 sm:min-h-[22rem] sm:px-8 lg:px-16 xl:px-20"><div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60">Explore the collection</p><h2 className="mt-3 max-w-sm font-heading text-4xl font-extrabold leading-[0.9] tracking-[-0.06em] sm:text-6xl">One Piece<br />Collection<span className="text-brand">.</span></h2><p className="mt-4 text-sm text-white/70">T-shirts, hoodies and more — for every Straw Hat fan.</p><Link to="/#new-arrivals" className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-xs font-semibold text-ink hover:bg-brand hover:text-white">Shop One Piece <span className="ml-3">→</span></Link></div></div></section>
    </main>
    <SiteFooter />
  </>
}
