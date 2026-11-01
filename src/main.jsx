import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/manrope/latin-500.css'
import '@fontsource/manrope/latin-600.css'
import '@fontsource/manrope/latin-700.css'
import '@fontsource/manrope/latin-800.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ContactPage from './pages/ContactPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import CartPage from './pages/CartPage.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

const markImageReady = (event) => {
  if (event.target instanceof HTMLImageElement) {
    event.target.classList.add('image-loaded')
  }
}

document.addEventListener('load', markImageReady, true)
document.addEventListener('error', markImageReady, true)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

requestAnimationFrame(() => {
  document.querySelectorAll('img').forEach((image) => {
    if (image.complete) image.classList.add('image-loaded')
  })
})
