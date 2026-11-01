import { chromium } from 'playwright-core'
import { mkdir } from 'node:fs/promises'

const baseUrl = 'http://127.0.0.1:5174'
const browserPath = '/home/sabari/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome'
const viewports = [
  { key: 'phone', width: 390, height: 844, label: 'Phone · 390×844' },
  { key: 'tablet', width: 768, height: 1024, label: 'Tablet · 768×1024' },
  { key: 'desktop', width: 1440, height: 900, label: 'Desktop · 1440×900' },
]
const screens = [
  { key: 'home', path: '/' },
  { key: 'gallery', path: '/gallery' },
  { key: 'product', path: '/product/luffy-gear-5-tee' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
  { key: 'cart', path: '/cart' },
]

await mkdir(new URL('./screenshots/', import.meta.url), { recursive: true })
const browser = await chromium.launch({ headless: true, executablePath: browserPath, args: ['--no-sandbox'] })

for (const viewport of viewports) {
  for (const screen of screens) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 })
    await page.goto(`${baseUrl}${screen.path}`, { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight)
      await new Promise((resolve) => setTimeout(resolve, 500))
      window.scrollTo(0, 0)
      await new Promise((resolve) => setTimeout(resolve, 250))
    })
    await page.screenshot({ path: `report/screenshots/${screen.key}-${viewport.key}.png`, fullPage: true })
    await page.close()
    console.log(`${screen.key}-${viewport.key}`)
  }
}

await browser.close()
