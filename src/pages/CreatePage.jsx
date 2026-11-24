import { useMemo, useState } from 'react'
import {
  LuArrowLeft,
  LuArrowUp,
  LuCheck,
  LuImagePlus,
  LuLayers3,
  LuLoaderCircle,
  LuSparkles,
  LuSend,
  LuUpload,
  LuUserRound,
} from 'react-icons/lu'

const colors = [
  { name: 'Ink', value: '#171717' },
  { name: 'Crimson', value: '#E5232B' },
  { name: 'Cloud', value: '#F4F1EB' },
  { name: 'Sage', value: '#76977C' },
]

const positions = [
  { name: 'Left', value: 'left-[8%] top-[33%]' },
  { name: 'Center', value: 'left-1/2 top-[30%] -translate-x-1/2' },
  { name: 'Right', value: 'right-[8%] top-[33%]' },
]

function UploadCard({ label, hint, value, onChange, icon: Icon, accent }) {
  return (
    <label className={`group relative flex min-h-[11.5rem] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-dashed p-4 transition ${value ? 'border-brand/40 bg-brand-50/40' : 'border-ink/15 bg-white hover:border-brand/45 hover:bg-brand-50/30'}`}>
      <input type="file" accept="image/*" className="sr-only" onChange={onChange} />
      {value ? (
        <img src={value} alt={`${label} preview`} className="absolute inset-0 h-full w-full object-cover opacity-100 transition duration-500 group-hover:scale-105" />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className={`relative z-10 grid h-9 w-9 place-items-center rounded-full ${value ? 'bg-white/90 text-brand' : accent ? 'bg-brand-50 text-brand' : 'bg-paper-200 text-ink/70'}`}>
        {value ? <LuCheck className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
      </div>
      <div className={`relative z-10 ${value ? 'text-white' : 'text-ink'}`}>
        <p className="text-sm font-semibold">{value ? 'Image added' : label}</p>
        <p className={`mt-1 text-xs ${value ? 'text-white/75' : 'text-ink/45'}`}>{value ? 'Click to replace' : hint}</p>
      </div>
    </label>
  )
}

function CreatePage() {
  const [userImage, setUserImage] = useState('')
  const [animeImage, setAnimeImage] = useState('')
  const [color, setColor] = useState(colors[0])
  const [position, setPosition] = useState(positions[1])
  const [generated, setGenerated] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState('')
  const [generationError, setGenerationError] = useState('')
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hey! I’m your Manga Maker AI. Start by uploading your photo and an anime image, then tell me the mood you want.' },
  ])

  const readImage = (setter) => (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setter(reader.result)
    reader.readAsDataURL(file)
  }

  const canGenerate = Boolean(userImage && animeImage)
  const imageStyle = useMemo(() => ({ backgroundColor: color.value }), [color])

  const dataUrlToBlob = async (dataUrl) => {
    const response = await fetch(dataUrl)
    return response.blob()
  }

  const handleGenerate = async () => {
    if (!canGenerate) return
    setGenerating(true)
    setGenerationError('')

    try {
      const formData = new FormData()
      formData.append('model', 'gpt-image-1.5')
      formData.append('prompt', `Create a wearable anime t-shirt mockup using the two reference images. T-shirt color: ${color.name}. Print placement: ${position.name}. Model pose and framing: ${prompt.trim() || 'a confident front-facing pose with the shirt clearly visible'}. Keep the graphic sharp, centered, print-ready, and integrated naturally into the fabric. Show the full shirt clearly and preserve the person’s recognizable features from the user photo.`)
      formData.append('image[]', await dataUrlToBlob(userImage), 'user-photo.png')
      formData.append('image[]', await dataUrlToBlob(animeImage), 'anime-reference.png')

      const response = await fetch('/api/generate-image', { method: 'POST', body: formData })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error?.message || payload?.error || 'The image could not be generated.')

      const result = payload?.data?.[0]
      const image = result?.b64_json ? `data:image/png;base64,${result.b64_json}` : result?.url
      if (!image) throw new Error('The image service returned no preview.')
      setGeneratedImage(image)
      setGenerated(true)
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : 'The image could not be generated.')
    } finally {
      setGenerating(false)
    }
  }

  const sendPrompt = (value = prompt) => {
    const text = value.trim()
    if (!text) return
    setMessages((current) => [
      ...current,
      { role: 'user', text },
      { role: 'assistant', text: 'Love that direction. I’ll keep the artwork bold, clean, and ready for your placement choice.' },
    ])
    setPrompt('')
  }

  return (
    <main className="min-h-screen bg-[#F2F1ED] font-body text-ink">
      <header className="border-b border-ink/[0.08] bg-paper/90 px-5 py-4 backdrop-blur sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1420px] items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-ink/60 transition hover:text-brand">
            <LuArrowLeft className="h-4 w-4" /> Back to shop
          </a>
          <div className="flex items-center gap-2 font-heading text-sm font-extrabold uppercase tracking-[-0.06em]">
            Manga Mart<span className="text-brand">.</span>
          </div>
          <span className="hidden rounded-full border border-ink/10 bg-white/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-label text-ink/45 sm:block">AI studio</span>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1420px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(30rem,1.1fr)] lg:gap-12 lg:px-12 lg:py-12">
        <section className="flex flex-col">
          <div className="max-w-[34rem]">
            <p className="text-[10px] font-semibold uppercase tracking-label text-brand">Wear your story</p>
            <h1 className="mt-4 font-heading text-[clamp(3.2rem,8vw,6.2rem)] font-extrabold leading-[0.88] tracking-tightest">Make it <span className="text-brand">yours.</span></h1>
            <p className="mt-5 max-w-[30rem] text-sm leading-7 text-ink/55 sm:text-base">Give the studio two images. I’ll blend your portrait with an anime world and turn it into a one-of-one tee concept.</p>
          </div>

          <div className="mt-8 rounded-3xl border border-ink/10 bg-white/75 p-4 shadow-soft sm:p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-ink/40">BUILD YOUR DESIGN</p>
                <p className="mt-1 text-sm font-semibold">Tell the studio what to make</p>
              </div>
              <LuSparkles className="h-5 w-5 text-brand" />
            </div>
            <div className="mb-5 rounded-2xl bg-paper-100 p-3">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-label text-ink/40"><span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-white"><LuSparkles className="h-3 w-3" /></span> Manga Maker AI</div>
              <div className="max-h-36 space-y-2 overflow-y-auto pr-1">
                {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><p className={`max-w-[88%] rounded-2xl px-3 py-2 text-xs leading-5 ${message.role === 'user' ? 'rounded-br-md bg-ink text-white' : 'rounded-bl-md bg-white text-ink/65'}`}>{message.text}</p></div>)}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['Make it cinematic', 'Add red ink energy', 'Keep it minimal'].map((suggestion) => <button key={suggestion} type="button" onClick={() => sendPrompt(suggestion)} className="rounded-full border border-ink/10 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-ink/50 transition hover:border-brand/40 hover:text-brand">{suggestion}</button>)}
              </div>
              <form className="mt-3 flex items-center gap-2 rounded-full border border-ink/10 bg-white p-1.5 pl-3" onSubmit={(event) => { event.preventDefault(); sendPrompt() }}>
                <input value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Describe your vibe..." className="min-w-0 flex-1 bg-transparent text-xs text-ink outline-none placeholder:text-ink/35" aria-label="Message Manga Maker AI" />
                <button type="submit" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-white transition hover:bg-brand" aria-label="Send message"><LuSend className="h-3.5 w-3.5" /></button>
              </form>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <UploadCard label="Upload your image" hint="Portrait or full body works best" value={userImage} onChange={readImage(setUserImage)} icon={LuUserRound} accent />
              <UploadCard label="Upload anime image" hint="Character, panel, or artwork" value={animeImage} onChange={readImage(setAnimeImage)} icon={LuImagePlus} />
            </div>
            {!animeImage ? <button type="button" onClick={() => setAnimeImage('/images/feature-find-your-world.webp')} className="mt-3 text-left text-xs font-semibold text-brand transition hover:text-brand-700">Use sample anime artwork for a quick demo</button> : null}

            <div className="mt-6 border-t border-ink/10 pt-5">
              <div className="flex items-center gap-2 text-sm font-semibold"><span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[11px] text-white">3</span> Choose the vibe</div>
              <div className="mt-4">
                <p className="text-xs font-semibold text-ink/50">PRINT COLOR</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {colors.map((item) => <button key={item.name} type="button" onClick={() => setColor(item)} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${color.name === item.name ? 'border-brand bg-brand-50 text-brand' : 'border-ink/10 bg-white text-ink/60 hover:border-ink/25'}`}><span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: item.value }} />{item.name}</button>)}
                </div>
              </div>
              <div className="mt-5">
                <p className="text-xs font-semibold text-ink/50">YOUR POSITION</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {positions.map((item) => <button key={item.name} type="button" onClick={() => setPosition(item)} className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${position.name === item.name ? 'border-brand bg-brand-50 text-brand' : 'border-ink/10 bg-white text-ink/60 hover:border-ink/25'}`}>{item.name}</button>)}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#171717] p-3 text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10"><LuSparkles className="h-4 w-4 text-brand-300" /></div>
                <p className="flex-1 text-xs leading-5 text-white/75">{generated ? 'Your concept is ready. Want to try a different placement?' : 'Ready when you are. The studio will generate a preview in a few seconds.'}</p>
                <button type="button" onClick={handleGenerate} disabled={!canGenerate || generating} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-white/15" aria-label="Generate design">
                  {generating ? <LuLoaderCircle className="h-4 w-4 animate-spin" /> : <LuArrowUp className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {generationError ? <p className="mt-3 rounded-xl bg-brand-50 px-3 py-2 text-xs leading-5 text-brand-700">{generationError}</p> : null}
          </div>
        </section>

        <section className="lg:pt-3">
          <div className="mb-4 flex items-end justify-between">
            <div><p className="text-[10px] font-semibold uppercase tracking-label text-ink/40">LIVE CANVAS</p><h2 className="mt-1 font-heading text-2xl font-bold tracking-tight">Your concept</h2></div>
            <span className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${generated ? 'bg-success-light text-success' : 'bg-white text-ink/45'}`}>{generated ? 'Generated' : 'Preview mode'}</span>
          </div>
          <div className="relative min-h-[30rem] overflow-hidden rounded-[2rem] border border-ink/10 bg-[#E8E5DC] shadow-floating sm:min-h-[40rem]" style={imageStyle}>
            {generatedImage ? <img src={generatedImage} alt="Generated anime t-shirt design" className="absolute inset-0 h-full w-full object-cover" /> : <><img src={animeImage} alt="Anime artwork preview" className="absolute inset-0 h-full w-full object-cover opacity-100 mix-blend-multiply" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/10" />{userImage ? <img src={userImage} alt="Your uploaded portrait preview" className={`absolute h-[52%] w-[52%] rounded-[1.5rem] object-cover shadow-2xl ring-4 ring-white/75 transition-all duration-500 ${position.value}`} /> : <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center text-ink/45"><div className="grid h-16 w-16 place-items-center rounded-full bg-white/65"><LuUpload className="h-6 w-6" /></div><p className="mt-4 text-sm font-semibold">Upload your image</p><p className="mt-1 max-w-[12rem] text-xs leading-5">Your portrait will appear here in the final concept.</p></div>}</>}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white"><div><p className="text-[10px] font-semibold uppercase tracking-label text-white/70">MANGA MART / 001</p><p className="mt-2 font-heading text-2xl font-extrabold tracking-tight">YOUR STORY<span className="text-brand">.</span></p></div><LuLayers3 className="h-5 w-5 text-white/70" /></div>
          </div>
          <p className="mt-4 text-center text-xs leading-5 text-ink/40">Your preview is generated through the local Manga Mart image studio and is not saved after this session.</p>
        </section>
      </div>
    </main>
  )
}

export default CreatePage
