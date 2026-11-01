import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LuArrowLeft, LuChevronRight, LuMinus, LuPlus, LuShieldCheck, LuShoppingBag, LuTag, LuTrash2, LuTruck, LuUndo2, LuX } from 'react-icons/lu'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { ProductCard } from '../components/BestSellers'
import { products } from '../data/products'

const initialItems = [
  { id: 'luffy-gear-5-tee', size: 'L', color: 'Black', quantity: 1 },
  { id: 'naruto-sage-tee', size: 'M', color: 'White', quantity: 1 },
  { id: 'gojo-satoru-tee', size: 'L', color: 'Black', quantity: 1 },
]

const recommendations = [
  products.find((product) => product.id === 'tanjiro-hinokami-tee'),
  products.find((product) => product.id === 'sukuna-curse-tee'),
  products.find((product) => product.id === 'tanjiro-breath-tee'),
  products.find((product) => product.id === 'zoro-ink-tee'),
].filter(Boolean)

const formatPrice = (value) => `₹${value.toLocaleString('en-IN')}`

function Benefit({ icon: Icon, title, copy }) {
  return <div className="flex items-center gap-3"><Icon className="h-8 w-8 shrink-0 stroke-[1.7]" /><div><p className="text-xs font-semibold">{title}</p><p className="mt-0.5 text-[10px] text-ink/55">{copy}</p></div></div>
}

export default function CartPage() {
  const [items, setItems] = useState(initialItems)
  const [coupon, setCoupon] = useState('ANIME300')
  const [couponInput, setCouponInput] = useState('')

  const cartItems = useMemo(() => items.map((item) => ({ ...item, product: products.find((product) => product.id === item.id) })).filter((item) => item.product), [items])
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discount = coupon ? 300 : 0
  const total = Math.max(0, subtotal - discount)

  const changeQuantity = (id, amount) => setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item))
  const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id))

  const applyCoupon = (event) => {
    event.preventDefault()
    if (couponInput.trim().toUpperCase() === 'ANIME300') setCoupon('ANIME300')
    setCouponInput('')
  }

  return <div className="min-h-screen bg-paper text-ink">
    <SiteHeader cartCount={itemCount} />

    <main>
      <section className="relative isolate overflow-hidden border-b border-ink/[0.06] bg-paper">
        <div className="absolute inset-0 hidden md:block"><img src="/images/contact-hero.webp" alt="Luffy illustration with a crimson sun and mountain landscape" className="h-full w-full object-cover object-center" fetchPriority="high" decoding="async" /></div>
        <div className="relative mx-auto flex min-h-[9.5rem] max-w-[1680px] items-center px-5 py-20 sm:px-8 lg:min-h-[9.5rem] lg:px-16 xl:px-20">
          <div><nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] text-ink/55 sm:text-[11px]"><Link to="/" className="hover:text-brand">Home</Link><LuChevronRight className="h-3 w-3" /><span className="text-ink">Cart</span></nav><h1 className="mt-4 font-heading text-[clamp(3.4rem,7vw,4.7rem)] font-extrabold leading-[0.84] tracking-[-0.075em]">Your Cart<span className="text-brand">.</span></h1><p className="mt-2 text-sm text-ink/65">Great choices. Good anime. Better days.</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-[1680px] px-5 py-6 sm:px-8 lg:px-16 lg:py-8 xl:px-20">
        {cartItems.length ? <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_21rem] xl:gap-6">
          <div>
            <div className="hidden grid-cols-[minmax(16rem,1.7fr)_5.5rem_8rem_8.5rem] gap-5 px-1 pb-2 text-[10px] font-bold uppercase sm:grid"><span>Product</span><span>Price</span><span>Quantity</span><span>Total</span></div>
            <div className="grid gap-2">
              {cartItems.map(({ product, size, color, quantity }) => <article key={product.id} className="relative grid gap-4 rounded-lg border border-ink/10 p-2.5 sm:grid-cols-[minmax(16rem,1.7fr)_5.5rem_8rem_8.5rem] sm:items-center sm:gap-5 sm:p-2.5">
                <div className="flex min-w-0 items-center gap-4"><img src={product.image} alt={product.alt} className="h-[5.4rem] w-[8rem] shrink-0 rounded-md bg-paper-200 object-cover object-[50%_24%] sm:h-[5.4rem]" /><div className="min-w-0"><h2 className="text-sm font-bold">{product.name}</h2><p className="mt-1 text-[11px] text-ink/60">Size: {size}</p><p className="text-[11px] text-ink/60">Color: {color}</p><p className="mt-1 flex items-center gap-1 text-[11px] text-success"><span className="h-2 w-2 rounded-full bg-success" /> In Stock</p></div></div>
                <p className="hidden text-sm font-bold sm:block">{formatPrice(product.price)}</p>
                <div className="flex items-center justify-between sm:justify-start"><span className="text-[11px] font-medium sm:hidden">Quantity</span><div className="flex h-9 items-center rounded-md border border-ink/15"><button type="button" onClick={() => changeQuantity(product.id, -1)} className="grid h-full w-9 place-items-center hover:text-brand" aria-label={`Decrease ${product.name} quantity`}><LuMinus className="h-3.5 w-3.5" /></button><span className="w-7 text-center text-sm">{quantity}</span><button type="button" onClick={() => changeQuantity(product.id, 1)} className="grid h-full w-9 place-items-center hover:text-brand" aria-label={`Increase ${product.name} quantity`}><LuPlus className="h-3.5 w-3.5" /></button></div></div>
                <p className="hidden text-sm font-bold sm:block">{formatPrice(product.price * quantity)}</p>
                <button type="button" onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name}`} className="absolute right-2 top-2 text-ink transition-colors hover:text-brand sm:right-3 sm:top-3"><LuX className="h-4 w-4" /></button>
              </article>)}
            </div>
            <div className="mt-2 flex items-center justify-between"><Link to="/gallery" className="inline-flex items-center gap-3 rounded-md border border-ink px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-ink hover:text-white"><LuArrowLeft className="h-4 w-4" /> Continue Shopping</Link><button type="button" onClick={() => setItems([])} className="inline-flex items-center gap-2 text-xs text-ink/75 transition-colors hover:text-brand"><LuTrash2 className="h-4 w-4" /> Clear Cart</button></div>
          </div>

          <aside className="rounded-xl bg-[#f0efe9] p-5 sm:p-6"><h2 className="font-heading text-2xl font-extrabold tracking-[-0.05em]">Order Summary<span className="text-brand">.</span></h2><div className="mt-5 grid gap-3 text-sm"><div className="flex justify-between"><span>Subtotal ({itemCount} items)</span><span>{formatPrice(subtotal)}</span></div><div className="flex justify-between"><span>Shipping <small className="mt-0.5 block text-[10px] text-ink/55">Free shipping on orders above ₹1,499</small></span><span>₹0</span></div><div className="flex justify-between"><span>Discount</span><span className="font-bold text-brand">− {formatPrice(discount)}</span></div></div><div className="mt-4 flex items-center justify-between border-t border-ink/15 pt-4"><span className="text-xl font-bold">Total</span><span className="text-2xl font-extrabold">{formatPrice(total)}<small className="block text-right text-[10px] font-normal text-ink/55">Incl. of all taxes</small></span></div><button type="button" className="mt-5 h-11 w-full rounded-full bg-ink text-xs font-semibold text-white transition-colors hover:bg-brand">Proceed to Checkout <span className="ml-2">→</span></button><form onSubmit={applyCoupon} className="mt-5 flex gap-2"><label htmlFor="coupon" className="sr-only">Coupon code</label><div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-ink/10 bg-white/40 px-3"><LuTag className="h-3.5 w-3.5 text-brand" /><input id="coupon" value={couponInput} onChange={(event) => setCouponInput(event.target.value)} placeholder={coupon || 'Coupon code'} className="min-w-0 flex-1 bg-transparent py-2 text-xs outline-none placeholder:text-ink/45" /></div><button type="submit" className="rounded-md bg-ink px-3 text-xs font-semibold text-white">Apply</button></form>{coupon ? <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-brand/20 bg-brand/10 px-3 py-2 text-[10px] font-semibold text-brand">{coupon} <button type="button" onClick={() => setCoupon('')} aria-label="Remove coupon"><LuX className="h-3.5 w-3.5" /></button></div> : null}<div className="mt-6 grid gap-4 border-t border-ink/10 pt-5"><Benefit icon={LuTruck} title="Free Shipping" copy="On orders above ₹1,499" /><Benefit icon={LuUndo2} title="Easy Returns" copy="7 day hassle free returns" /><Benefit icon={LuShieldCheck} title="Secure Checkout" copy="100% safe and secure payments" /></div></aside>
        </div> : <div className="grid min-h-[22rem] place-items-center rounded-xl border border-dashed border-ink/15 text-center"><div><LuShoppingBag className="mx-auto h-10 w-10 text-ink/35" /><h2 className="mt-4 font-heading text-2xl font-bold">Your cart is empty<span className="text-brand">.</span></h2><Link to="/gallery" className="mt-5 inline-flex rounded-full bg-ink px-5 py-3 text-xs font-semibold text-white">Start Shopping</Link></div></div>}
      </section>

      <section className="border-t border-ink/[0.08] px-5 py-9 sm:px-8 lg:px-16 lg:py-12 xl:px-20"><div className="mx-auto max-w-[1680px]"><div className="flex items-end justify-between"><h2 className="font-heading text-2xl font-extrabold tracking-[-0.05em] sm:text-3xl">You Might Also Like<span className="text-brand">.</span></h2><Link to="/gallery" className="text-xs font-semibold hover:text-brand">View All <span className="ml-2">→</span></Link></div><div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-5">{recommendations.map((product) => <ProductCard key={product.id} product={product} />)}</div></div></section>
    </main>
    <SiteFooter />
  </div>
}
