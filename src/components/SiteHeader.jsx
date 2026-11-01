import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LuMenu, LuSearch, LuShoppingBag, LuUserRound, LuX } from 'react-icons/lu'

const links = [
  ['Home', '/', 'home'],
  ['About', '/about', 'about'],
  ['Cart', '/cart', 'cart'],
  ['Contact Us', '/contact', 'contact'],
  ['Gallery', '/gallery', 'gallery'],
]

export default function SiteHeader({ active = '', cartCount = 0 }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-30 border-b border-ink/[0.07] bg-paper font-body text-ink">
      <div className="mx-auto flex min-h-[6.25rem] w-full max-w-[1680px] items-center gap-6 px-7 sm:min-h-[6.5rem] sm:px-10 lg:min-h-[4.75rem] lg:px-16 xl:px-20">
        <Link to="/" aria-label="Manga Mart home" className="shrink-0 font-heading text-[2rem] font-extrabold uppercase leading-[0.8] tracking-[-0.08em] lg:text-[1.3rem]">
          <span className="block">Manga</span>
          <span className="block">Mart<span className="text-brand">.</span></span>
          <span className="mt-1.5 block text-[0.55rem] tracking-[0.24em] text-ink/50 lg:mt-1 lg:text-[0.4rem]">マンガマート</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden flex-1 items-center justify-center gap-7 lg:flex xl:gap-9">
          {links.map(([label, href, key]) => <Link key={label} to={href} className={`transition-colors hover:text-brand ${active === key ? 'text-[13px] font-bold text-brand' : 'text-[12px] font-semibold text-ink/85 xl:text-[13px]'}`}>{label}</Link>)}
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <form className="hidden h-9 w-40 items-center gap-2 rounded-full bg-ink/[0.045] px-3 text-ink/40 xl:flex xl:w-48" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="site-search" className="sr-only">Search anime tees</label>
            <LuSearch aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            <input id="site-search" type="search" placeholder="Search anime tees..." className="min-w-0 flex-1 bg-transparent text-[10px] text-ink outline-none placeholder:text-ink/35" />
          </form>
          <a href="#account" aria-label="Account" className="hidden text-ink/70 transition-colors hover:text-brand lg:block"><LuUserRound className="h-[1.1rem] w-[1.1rem]" /></a>
          <Link to="/cart" aria-label={`Shopping bag${cartCount ? `, ${cartCount} items` : ''}`} className="relative text-ink/70 transition-colors hover:text-brand"><LuShoppingBag className="h-6 w-6 lg:h-[1.1rem] lg:w-[1.1rem]" /><span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-semibold leading-none text-white lg:h-3.5 lg:min-w-3.5 lg:text-[8px]">{cartCount}</span></Link>
          <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid h-12 w-12 place-items-center rounded-full border border-ink/10 text-ink/70 transition-colors hover:border-ink/30 hover:text-brand lg:h-9 lg:w-9 lg:hidden">{open ? <LuX className="h-5 w-5 lg:h-4 lg:w-4" /> : <LuMenu className="h-5 w-5 lg:h-4 lg:w-4" />}</button>
        </div>
      </div>
      {open ? <nav aria-label="Mobile navigation" className="border-t border-ink/[0.07] px-7 py-6 sm:px-10 lg:hidden"><div className="grid gap-5">{links.map(([label, href]) => <Link key={label} to={href} onClick={() => setOpen(false)} className="text-base font-semibold text-ink/85 transition-colors hover:text-brand">{label}</Link>)}</div></nav> : null}
    </header>
  )
}
