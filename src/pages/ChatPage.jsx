import { useState } from 'react'
import {
  LuArrowUp,
  LuBot,
  LuCheck,
  LuCopy,
  LuImagePlus,
  LuLoaderCircle,
  LuPlus,
  LuSparkles,
  LuUserRound,
} from 'react-icons/lu'
import SiteHeader from '../components/SiteHeader'

const colors = [
  { name: 'Ink', value: '#171717' },
  { name: 'Crimson', value: '#E5232B' },
  { name: 'Cloud', value: '#F4F1EB' },
  { name: 'Sage', value: '#76977C' },
]

const placements = ['Front', 'Back']

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    content: 'Let’s create your custom t-shirt image. First, choose a shirt color. Then upload your photo and the anime image you want on the design.',
  },
]

function Message({ role, content }) {
  const isAssistant = role === 'assistant'

  return (
    <div className={`flex gap-3 sm:gap-4 ${isAssistant ? '' : 'justify-end'}`}>
      {isAssistant ? (
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-ink text-white shadow-soft"><LuBot className="h-4 w-4" /></div>
      ) : null}
      <div className={`max-w-[min(42rem,85%)] rounded-2xl px-4 py-3 text-sm leading-6 sm:px-5 ${isAssistant ? 'rounded-tl-md bg-white text-ink shadow-soft' : 'rounded-tr-md bg-ink text-white'}`}>
        {content}
        {isAssistant ? <button type="button" aria-label="Copy response" className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-ink/40 transition-colors hover:text-brand"><LuCopy className="h-3 w-3" /> Copy</button> : null}
      </div>
      {!isAssistant ? <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-ink/10 bg-paper-200 text-ink/60"><LuUserRound className="h-4 w-4" /></div> : null}
    </div>
  )
}

function UploadField({ label, hint, value, icon: Icon, onChange }) {
  return (
    <label className={`group relative flex min-h-28 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-dashed p-3 transition ${value ? 'border-brand/40 bg-brand-50/40' : 'border-ink/15 bg-white hover:border-brand/45 hover:bg-brand-50/30'}`}>
      <input type="file" accept="image/*" className="sr-only" onChange={onChange} />
      {value ? <img src={value} alt={`${label} preview`} className="absolute inset-0 h-full w-full object-cover" /> : null}
      {value ? <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" /> : null}
      <div className={`relative z-10 grid h-8 w-8 place-items-center rounded-full ${value ? 'bg-white/90 text-brand' : 'bg-paper-200 text-ink/65'}`}>{value ? <LuCheck className="h-4 w-4" /> : <Icon className="h-4 w-4" />}</div>
      <div className={`relative z-10 ${value ? 'text-white' : 'text-ink'}`}><p className="text-xs font-semibold">{value ? 'Image added' : label}</p><p className={`mt-1 text-[10px] ${value ? 'text-white/70' : 'text-ink/45'}`}>{value ? 'Click to replace' : hint}</p></div>
    </label>
  )
}

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')
  const [userImage, setUserImage] = useState('')
  const [animeImage, setAnimeImage] = useState('')
  const [color, setColor] = useState(colors[0])
  const [placement, setPlacement] = useState('Front')
  const [pose, setPose] = useState('Confident front-facing pose')
  const [generatedImage, setGeneratedImage] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generationError, setGenerationError] = useState('')

  const readImage = (setter) => (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setter(reader.result)
    reader.readAsDataURL(file)
  }

  const sendMessage = (value = draft) => {
    const text = value.trim()
    if (!text) return
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: 'user', content: text },
      { id: Date.now() + 1, role: 'assistant', content: 'Great — I’ll use your shirt color, uploaded photo, anime reference, print placement, and model pose to create the t-shirt image.' },
    ])
    setDraft('')
  }

  const startNewChat = () => {
    setMessages(initialMessages)
    setDraft('')
    setGeneratedImage('')
    setGenerationError('')
  }

  const generateImage = async () => {
    if (!userImage || !animeImage) return
    setGenerating(true)
    setGenerationError('')

    try {
      const toBlob = async (dataUrl) => (await fetch(dataUrl)).blob()
      const formData = new FormData()
      formData.append('model', 'gpt-image-1.5')
      formData.append('prompt', `Create a wearable anime t-shirt mockup. T-shirt color: ${color.name}. Print placement: ${placement}. Model pose: ${pose || 'confident front-facing pose'}. Combine the user photo and anime reference into a sharp, centered, print-ready graphic integrated naturally into the fabric. Show the shirt clearly.`)
      formData.append('image[]', await toBlob(userImage), 'user-photo.png')
      formData.append('image[]', await toBlob(animeImage), 'anime-reference.png')

      const response = await fetch('/api/generate-image', { method: 'POST', body: formData })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error?.message || payload?.error || 'The image could not be generated.')
      const result = payload?.data?.[0]
      const image = result?.b64_json ? `data:image/png;base64,${result.b64_json}` : result?.url
      if (!image) throw new Error('The image service returned no preview.')
      setGeneratedImage(image)
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : 'The image could not be generated.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader active="chat" />
      <main className="mx-auto flex min-h-[calc(100vh-4.75rem)] max-w-[1520px] overflow-hidden border-x border-ink/[0.06] bg-paper-50">
        <section className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-ink/[0.08] bg-paper-50 px-5 sm:px-8">
            <div><p className="font-heading text-sm font-extrabold tracking-tight">Manga Mart Design Studio</p><p className="text-[11px] text-ink/45">Create your custom anime t-shirt image</p></div>
            <button type="button" onClick={startNewChat} className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand"><LuPlus className="h-3.5 w-3.5" /> New chat</button>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-5 py-8 sm:px-8 lg:px-16">
            <div className="mx-auto w-full max-w-3xl">
              <div className="relative mb-10 overflow-hidden rounded-[2rem] border border-ink/[0.08] bg-white px-6 py-8 text-center shadow-soft sm:px-10 sm:py-10">
                <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-brand/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-ink/5 blur-2xl" />
                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-ink shadow-floating">
                  <div className="absolute inset-2 rounded-[0.9rem] border border-white/20" />
                  <LuSparkles className="relative h-6 w-6 text-brand-300" />
                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-brand shadow-red" />
                </div>
                <p className="relative mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-brand">Manga Mart / AI t-shirt creator</p>
                <h1 className="relative font-heading text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">Design your anime t-shirt<span className="text-brand">.</span></h1>
                <p className="relative mx-auto mt-3 max-w-lg text-sm leading-6 text-ink/55">Choose your t-shirt color, upload your photo and anime reference, then set the print position and model pose.</p>
              </div>
              <div className="space-y-5">
                {messages.map((message) => <Message key={message.id} {...message} />)}
              </div>
              <div className="mt-6 rounded-3xl border border-ink/10 bg-white p-4 shadow-soft sm:p-5">
                <div className="mb-4 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Create in this chat</p><p className="mt-1 text-sm font-semibold">Add your references and design direction</p></div><LuSparkles className="h-5 w-5 text-brand" /></div>
                <div className="grid gap-3 sm:grid-cols-2"><UploadField label="Your photo" hint="Portrait or full body" value={userImage} onChange={readImage(setUserImage)} icon={LuUserRound} /><UploadField label="Anime image" hint="Character, panel, or artwork" value={animeImage} onChange={readImage(setAnimeImage)} icon={LuImagePlus} /></div>
                <div className="mt-5"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45">T-shirt color</p><div className="mt-2 flex flex-wrap gap-2">{colors.map((item) => <button key={item.name} type="button" onClick={() => setColor(item)} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${color.name === item.name ? 'border-brand bg-brand-50 text-brand' : 'border-ink/10 bg-white text-ink/60 hover:border-ink/25'}`}><span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: item.value }} />{item.name}</button>)}</div></div>
                <div className="mt-4"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45">Print position</p><div className="mt-2 grid grid-cols-2 gap-2">{placements.map((item) => <button key={item} type="button" onClick={() => setPlacement(item)} className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${placement === item ? 'border-brand bg-brand-50 text-brand' : 'border-ink/10 bg-white text-ink/60 hover:border-ink/25'}`}>{item}</button>)}</div></div>
                <div className="mt-4"><label htmlFor="model-pose" className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45">Model pose / extra direction</label><input id="model-pose" value={pose} onChange={(event) => setPose(event.target.value)} placeholder="e.g. relaxed three-quarter pose" className="mt-2 w-full rounded-xl border border-ink/10 bg-paper-50 px-3 py-3 text-sm text-ink outline-none transition focus:border-brand/40" /></div>
                <button type="button" onClick={generateImage} disabled={!userImage || !animeImage || generating} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:bg-ink/15">{generating ? <><LuLoaderCircle className="h-4 w-4 animate-spin" /> Creating your t-shirt image...</> : <><LuSparkles className="h-4 w-4" /> Generate t-shirt image</>}</button>
                {generationError ? <p className="mt-3 rounded-xl bg-brand-50 px-3 py-2 text-xs leading-5 text-brand-700">{generationError}</p> : null}
              </div>
              {generatedImage ? <div className="mt-6 overflow-hidden rounded-3xl border border-ink/10 bg-white p-3 shadow-soft"><div className="mb-3 flex items-center justify-between px-2"><p className="text-sm font-semibold">Your generated t-shirt image</p><span className="rounded-full bg-success-light px-3 py-1 text-[10px] font-semibold text-success">Ready</span></div><img src={generatedImage} alt="Generated anime t-shirt design" className="max-h-[42rem] w-full rounded-2xl object-cover" /></div> : null}
            </div>
          </div>

          <div className="shrink-0 px-5 pb-5 sm:px-8 sm:pb-8 lg:px-16"><form onSubmit={(event) => { event.preventDefault(); sendMessage() }} className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-ink/10 bg-white p-2 shadow-soft focus-within:border-brand/40 focus-within:ring-4 focus-within:ring-brand/5"><label htmlFor="chat-message" className="sr-only">Describe your t-shirt design</label><textarea id="chat-message" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage() } }} rows="1" placeholder="Describe your t-shirt design..." className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-sm text-ink outline-none placeholder:text-ink/35" /><button type="submit" aria-label="Send design brief" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-ink/15" disabled={!draft.trim()}><LuArrowUp className="h-4 w-4" /></button></form><p className="mt-3 text-center text-[10px] text-ink/35">Your design brief is temporary and will not be saved.</p></div>
        </section>
      </main>
    </div>
  )
}
