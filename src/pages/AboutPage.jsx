import { LuArrowRight, LuFlame, LuShieldCheck, LuStar, LuUsers, LuShirt } from 'react-icons/lu'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

const stats = [
  ['100K+', 'Happy Customers', 'Across India and beyond', LuUsers],
  ['200+', 'Unique Designs', 'From classic to rare', LuShirt],
  ['4.9/5', 'Customer Satisfaction', 'Built on trust & passion', LuStar],
]

const values = [
  ['Passion', 'We live and breathe anime. It’s in our DNA.', LuFlame],
  ['Quality', 'Premium fabrics, long-lasting prints.', LuShieldCheck],
  ['Community', 'We’re stronger together.', LuUsers],
  ['Creativity', 'Unique designs for unique people.', LuStar],
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader active="about" />
      <main>
        <section className="relative isolate overflow-hidden border-b border-ink/[0.06] bg-paper">
          <img src="/images/about-hero.png" alt="Luffy artwork with a crimson sun and mountain landscape" className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-center md:block" />
          <div className="relative mx-auto flex min-h-[34rem] max-w-[1680px] items-center px-5 py-14 sm:px-8 lg:min-h-[35rem] lg:px-16 lg:py-20 xl:px-20">
            <div className="max-w-[25rem]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/60 sm:text-[11px]">About us <span className="ml-2 inline-block w-5 align-middle border-t border-ink/60" /></p>
              <h1 className="mt-4 font-heading text-[clamp(3.7rem,7.2vw,6.8rem)] font-extrabold leading-[0.84] tracking-[-0.075em]">Behind<br />Manga Mart<span className="text-brand">.</span></h1>
              <p className="mt-6 max-w-[19rem] text-sm leading-[1.45] text-ink/65 sm:text-base">We’re not just a clothing brand. We’re a community of anime lovers, creators and dreamers.</p>
              <a href="#our-story" className="mt-6 inline-flex items-center gap-4 rounded-full bg-ink px-7 py-3.5 text-xs font-semibold text-white transition-colors hover:bg-brand">Our Story <LuArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        <section id="our-story" className="mx-auto grid max-w-[1680px] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.88fr_1.35fr] lg:items-center lg:gap-12 lg:px-16 lg:py-20 xl:px-20">
          <img src="/images/about-story.png" alt="Naruto and Sasuke overlooking Konoha" className="aspect-square w-full object-cover object-center" />
          <div className="grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:gap-12">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink/60 sm:text-[11px]">Our story <span className="ml-2 inline-block w-5 align-middle border-t border-ink/60" /></p>
              <h2 className="mt-3 max-w-[19rem] font-heading text-[2.4rem] font-extrabold leading-[0.9] tracking-[-0.065em] sm:text-[3.2rem]">From Fans,<br />For Fans<span className="text-brand">.</span></h2>
              <p className="mt-5 max-w-[34rem] text-sm leading-[1.55] text-ink/60">Manga Mart was born from a simple idea — there weren’t enough places where anime lovers could find high-quality, stylish and meaningful apparel. We’re a group of friends who grew up watching anime, reading manga, and dreaming about a world where our favorite characters could be a part of our everyday lives.</p>
              <p className="mt-4 max-w-[34rem] text-sm leading-[1.55] text-ink/60">So we built Manga Mart — a place where anime meets fashion, and where every shirt is a story, a memory, and a piece of you.</p>
            </div>
            <div className="divide-y divide-ink/15 border-t border-ink/15 lg:mt-1 lg:border-l lg:border-t-0 lg:pl-8">
              {stats.map(([value, label, detail, Icon]) => <div key={label} className="flex items-center gap-4 py-5 first:pt-0 lg:py-4"><Icon className="h-8 w-8 shrink-0 stroke-[1.8]" /><div><p className="font-heading text-[1.4rem] font-extrabold tracking-[-0.05em] sm:text-[1.65rem]">{value}</p><p className="text-[12px] font-medium">{label}</p><p className="mt-0.5 text-[10px] text-ink/55">{detail}</p></div></div>)}
            </div>
          </div>
        </section>

        <section className="border-y border-ink/[0.06] bg-[#f2f1ec]">
          <div className="mx-auto grid max-w-[1680px] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16 lg:px-16 lg:py-20 xl:px-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink/60 sm:text-[11px]">Our values <span className="ml-2 inline-block w-5 align-middle border-t border-ink/60" /></p>
              <h2 className="mt-3 font-heading text-[2.5rem] font-extrabold leading-[0.9] tracking-[-0.065em] sm:text-[3.2rem]">What Drives Us<span className="text-brand">.</span></h2>
              <div className="mt-9 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-0">
                {values.map(([title, copy, Icon]) => <div key={title} className="pr-5 sm:border-l sm:border-ink/15 sm:pl-5 first:sm:border-l-0 first:sm:pl-0"><Icon className="h-8 w-8 stroke-[1.7]" /><h3 className="mt-4 text-sm font-semibold">{title}</h3><p className="mt-2 max-w-[9rem] text-[11px] leading-[1.45] text-ink/60">{copy}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="relative isolate min-h-[19rem] overflow-hidden bg-ink text-white sm:min-h-[22rem]">
          <img src="/images/about-community.png" alt="Itachi-inspired red and black manga artwork" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.08)_0%,rgba(17,17,17,0.16)_42%,rgba(17,17,17,0.8)_68%,rgba(17,17,17,0.88)_100%)]" />
          <div className="relative mx-auto flex min-h-[19rem] max-w-[1680px] items-center justify-end px-5 py-10 sm:min-h-[22rem] sm:px-8 lg:px-16 xl:px-20"><div className="w-full max-w-[31rem] lg:mr-[5%]"><p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/75 sm:text-[11px]">Join the crew <span className="ml-2 inline-block w-5 align-middle border-t border-white/70" /></p><h2 className="mt-3 max-w-[21rem] font-heading text-[2.9rem] font-extrabold leading-[0.88] tracking-[-0.07em] sm:text-[4rem]">More Than<br />Just Tees<span className="text-brand">.</span></h2><p className="mt-4 max-w-[21rem] text-sm leading-[1.45] text-white/80">Be part of a growing community of anime fans. Follow us, share your looks, and tag us for a chance to be featured!</p><a href="#instagram" className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-semibold text-ink transition-colors hover:bg-brand hover:text-white">Follow Us <LuArrowRight className="h-4 w-4" /></a></div></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
