import { useState, useEffect } from 'react'
import {
  THEMES,
  type ThemeId,
  getStoredTheme,
  setStoredTheme,
  applyTheme,
  isThemeId,
} from './theme'

// ─── Image assets (Ref_photo) ──────────────────────────────────────────────────
const HERO_IMG = '/photos/studio_room.webp'
const ABOUT_IMG = '/photos/portrait_guitar_3.jpg'
const GALLERY_IMGS = [
  { url: '/photos/portrait_guitar_1.jpg', alt: 'Alexey Bashilov playing acoustic guitar' },
  { url: '/photos/portrait_guitar_2.jpg', alt: 'Studio portrait with Fender acoustic' },
  { url: '/photos/portrait_guitar_4.jpg', alt: 'Electric guitar performance in teal plaid' },
  { url: '/photos/album_cover.webp', alt: 'Outdoor portrait — SUNDER' },
  { url: '/photos/studio_room_2.webp', alt: 'Intimate acoustic set with mic and amp' },
  { url: '/photos/portrait_guitar_5.jpg', alt: 'Electric guitar studio shot' },
  { url: '/photos/concert_room_0.jpg', alt: 'Seated with acoustic guitar' },
  { url: '/photos/concert_room_1.jpg', alt: 'Songwriting with guitar and notebook' },
]

// ─── Theme switcher ────────────────────────────────────────────────────────────
function ThemeSwitcher({
  theme,
  onChange,
}: {
  theme: ThemeId
  onChange: (id: ThemeId) => void
}) {
  return (
    <div className="theme-switcher" role="group" aria-label="Color theme">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          className="theme-switcher__btn"
          aria-pressed={theme === t.id}
          aria-label={t.label}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
function Nav({
  theme,
  onThemeChange,
}: {
  theme: ThemeId
  onThemeChange: (id: ThemeId) => void
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header__inner max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
        <span
          className="text-sm font-bold tracking-[0.2em] uppercase shrink-0 text-primary"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Bashilov
        </span>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {['About', 'Music', 'Live', 'Gallery', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link text-xs tracking-widest uppercase">
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary text-xs tracking-widest uppercase px-4 py-2 rounded transition-all duration-200 hover:scale-105"
          >
            Book
          </a>
        </nav>

        <div className="hidden md:block shrink-0 ml-4">
          <ThemeSwitcher theme={theme} onChange={onThemeChange} />
        </div>

        {/* Mobile: logo + switcher row; switcher full-width via CSS order */}
        <div className="md:hidden contents">
          <ThemeSwitcher theme={theme} onChange={onThemeChange} />
        </div>
      </div>
    </header>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-end grain bg-primary">
      <img
        src={HERO_IMG}
        alt="Alexey Bashilov performing live with acoustic guitar"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ filter: 'saturate(0.6) brightness(0.55)' }}
      />
      <div className="absolute inset-0 hero-gradient-bottom" />
      <div className="absolute inset-0 hero-gradient-side" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28 w-full">
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.3em] uppercase mb-5 font-serif-em italic text-accent">
            Guitar · Voice · Live
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-4 text-primary"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            Alexey
            <br />
            Bashilov
          </h1>
          <p className="text-base md:text-lg mb-8 leading-relaxed text-secondary">
            Original songs & carefully chosen covers.
            <br />
            250+ live performances.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#contact"
              className="btn-primary px-7 py-3.5 rounded text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-105"
            >
              Book a performance
            </a>
            <a href="#gallery" className="link-muted text-sm font-medium tracking-wide flex items-center gap-2">
              Watch live videos <span className="text-accent">→</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div
            className="w-px h-8 animate-pulse"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--accent))' }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--border)' }} />
    </section>
  )
}

// ─── About ─────────────────────────────────────────────────────────────────────
function About() {
  const facts = [
    { num: '15+', label: 'Years on stage' },
    { num: '250+', label: 'Live performances' },
    { num: '2', label: 'Languages — RU & EN' },
    { num: '∞', label: 'Repertoire on request' },
  ]

  return (
    <section id="about" className="relative py-24 md:py-36 bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden bg-card">
            <img
              src={ABOUT_IMG}
              alt="Alexey Bashilov portrait"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'grayscale(30%) contrast(1.05)' }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3"
              style={{
                background: 'linear-gradient(to top, color-mix(in srgb, var(--accent-warm) 18%, transparent), transparent)',
              }}
            />
          </div>

          <div className="flex flex-col justify-center pt-0 md:pt-16">
            <p className="section-label mb-4">About</p>
            <h2
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-primary"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              Living sound.
              <br />
              Real stage.
            </h2>
            <blockquote
              className="font-serif-em italic text-lg md:text-xl mb-8 leading-relaxed text-secondary"
              style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1.25rem' }}
            >
              "Every performance is a conversation — between the music, the room, and the moment."
            </blockquote>
            <div className="space-y-4 mb-10 text-secondary">
              <p className="text-sm leading-relaxed">
                Professional guitarist and vocalist with 15 years of experience. More than 250 live
                shows — from intimate bar sets to private celebrations and corporate events.
              </p>
              <p className="text-sm leading-relaxed">
                Plays both original material and a wide repertoire of covers spanning Western
                alternative rock and classic Russian rock. Always brings his own professional
                equipment and reads the room — creating a warm, emotional or energetic atmosphere
                depending on the moment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px gap-line">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col p-5 bg-card">
                  <span
                    className="text-2xl font-bold mb-1 text-accent"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {f.num}
                  </span>
                  <span className="text-xs tracking-wide uppercase text-secondary">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Music ─────────────────────────────────────────────────────────────────────
function Music() {
  const originals = [
    { title: 'Тишина после', duration: '4:12' },
    { title: 'Cold Shore', duration: '3:47' },
    { title: 'Осколки', duration: '5:03' },
  ]

  return (
    <section id="music" className="relative py-24 md:py-36 grain bg-muted">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 79px, var(--border) 80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-16">
          <p className="section-label mb-3">Repertoire</p>
          <h2
            className="text-3xl md:text-5xl font-bold text-primary"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            Music
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px gap-line">
          <div className="p-8 md:p-12 bg-card">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs tracking-[0.25em] uppercase font-semibold text-accent">
                Original songs
              </span>
            </div>
            <p className="text-sm mb-8 leading-relaxed text-secondary">
              Songs written and composed by Alexey — shaped by years on stage, by melancholy,
              movement and the quiet between notes.
            </p>
            <div className="space-y-px" style={{ borderTop: '1px solid var(--border)' }}>
              {originals.map((t, i) => (
                <div
                  key={t.title}
                  className="flex items-center justify-between py-4 group cursor-default"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs w-4 text-right" style={{ color: 'var(--border)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium track-title">{t.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-secondary">{t.duration}</span>
                    <span className="text-lg text-accent transition-transform group-hover:scale-110">
                      ▷
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12 bg-surface-alt">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs tracking-[0.25em] uppercase font-semibold text-accent-warm">
                Covers & atmosphere
              </span>
            </div>
            <p className="text-sm mb-6 leading-relaxed text-secondary">
              From{' '}
              <span className="text-primary">System of a Down, Nirvana, Radiohead, The Cure</span> and{' '}
              <span className="text-primary">The Beatles</span> to{' '}
              <span className="text-primary">Кино, Би-2, Звери</span> and{' '}
              <span className="text-primary">Король и Шут</span> — and many more.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Alternative Rock', 'Classic Rock', 'Russian Rock', 'Indie', 'Post-punk', 'Acoustic'].map(
                (tag) => (
                  <span key={tag} className="tag-chip text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ),
              )}
            </div>
            <p
              className="text-xs leading-relaxed italic font-serif-em text-secondary"
              style={{ borderLeft: '1px solid var(--accent-warm)', paddingLeft: '1rem' }}
            >
              Full repertoire available on request. The program is always tailored to the event and
              its mood.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-serif-em italic text-secondary">
            Looking for a specific song or mood?{' '}
            <a href="#contact" className="link-accent">
              Just tell me.
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Booking ───────────────────────────────────────────────────────────────────
function Booking() {
  const formats = [
    {
      icon: '♪',
      title: 'Acoustic sets',
      desc: 'Intimate, warm atmosphere. Voice and guitar, up close. Perfect for small bars, restaurants, private dinners.',
    },
    {
      icon: '⚡',
      title: 'Electric full sets',
      desc: 'Full-energy live performance with electric guitar. Wider dynamic range, bigger presence on stage.',
    },
    {
      icon: '◇',
      title: 'Private events',
      desc: 'Birthdays, anniversaries, corporate evenings. Custom program built around the occasion and atmosphere you want.',
    },
  ]

  const steps = [
    { n: '01', text: 'Write about the date and format' },
    { n: '02', text: 'Discuss repertoire and mood' },
    { n: '03', text: 'Confirm and prepare the set' },
  ]

  return (
    <section id="live" className="py-24 md:py-36 bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-16">
          <p className="section-label mb-3">Formats</p>
          <h2
            className="text-3xl md:text-5xl font-bold text-primary"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            Live performances
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-16 gap-line">
          {formats.map((f) => (
            <div key={f.title} className="group p-8 bg-card transition-colors duration-300">
              <span className="block text-2xl mb-5 text-accent">{f.icon}</span>
              <h3
                className="text-lg font-semibold mb-3 text-primary"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-secondary">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <p className="text-xs tracking-[0.25em] uppercase mb-8 text-secondary">How it works</p>
          <div className="flex flex-col md:flex-row gap-8 md:gap-0">
            {steps.map((s, i) => (
              <div key={s.n} className="flex-1 flex items-start gap-5 relative">
                <div>
                  <span
                    className="text-xs font-bold tracking-widest text-accent"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {s.n}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-primary">{s.text}</p>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute right-0 top-1 w-8 h-px"
                    style={{ background: 'var(--border)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <a
          href="#contact"
          className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-105"
        >
          Discuss your event
        </a>
      </div>
    </section>
  )
}

// ─── Gallery ───────────────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-36 bg-muted">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-12">
          <p className="section-label mb-3">Gallery</p>
          <h2
            className="text-3xl md:text-5xl font-bold text-primary"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            On stage
          </h2>
        </div>

        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {GALLERY_IMGS.map((img, i) => (
            <div
              key={img.url}
              className="break-inside-avoid overflow-hidden rounded-sm group cursor-pointer bg-card"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  filter: i % 3 === 1 ? 'grayscale(80%) contrast(1.1)' : 'saturate(0.7) brightness(0.9)',
                  display: 'block',
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', date: '', type: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 md:py-36 bg-primary border-t-theme">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <p className="section-label mb-4">Contact</p>
            <h2
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-primary"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              Let's talk.
            </h2>
            <p className="text-sm leading-relaxed mb-10 text-secondary">
              Tell me about your event — date, place, desired mood and any special requests. I'll get
              back to you quickly.
            </p>

            <div className="space-y-6">
              <div
                className="flex items-center gap-4 p-4 rounded bg-card"
                style={{ border: '1px solid var(--border)' }}
              >
                <span className="text-accent" style={{ fontSize: '20px' }}>
                  ✈
                </span>
                <div>
                  <p className="text-xs tracking-wider uppercase mb-0.5 text-secondary">
                    Preferred contact
                  </p>
                  <p className="text-sm font-medium text-primary">Telegram</p>
                </div>
              </div>
              <div
                className="flex items-center gap-4 p-4 rounded bg-card"
                style={{ border: '1px solid var(--border)' }}
              >
                <span className="text-accent-warm" style={{ fontSize: '20px' }}>
                  ◎
                </span>
                <div>
                  <p className="text-xs tracking-wider uppercase mb-0.5 text-secondary">Location</p>
                  <p className="text-sm font-medium text-primary">Moscow & tours</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="flex flex-col items-start justify-center h-full gap-4">
                <span className="text-3xl text-accent">◆</span>
                <h3
                  className="text-2xl font-bold text-primary"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  Message received.
                </h3>
                <p className="text-sm text-secondary">I'll be in touch soon. Talk soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-secondary">
                    Your name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Alexei Ivanov"
                    required
                    className="form-control"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-secondary">
                    Event date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-secondary">
                    Format
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="form-control"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">Select a format</option>
                    <option value="acoustic">Acoustic set</option>
                    <option value="electric">Full electric set</option>
                    <option value="private">Private event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-secondary">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your event, mood, venue..."
                    className="form-control"
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full py-4 rounded text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-[1.01]"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <footer className="max-w-7xl mx-auto px-6 md:px-10 mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t-theme">
        <span
          className="text-sm font-bold tracking-[0.15em] uppercase text-primary"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Alexey Bashilov
        </span>
        <div className="flex items-center gap-6">
          {['Telegram', 'VK', 'YouTube'].map((label) => (
            <a key={label} href="#" className="footer-link text-xs tracking-wide">
              {label}
            </a>
          ))}
        </div>
        <span className="text-xs" style={{ color: 'var(--border)' }}>
          © 2026
        </span>
      </footer>
    </section>
  )
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState<ThemeId>(() => {
    if (typeof document !== 'undefined') {
      const attr = document.documentElement.getAttribute('data-theme')
      if (isThemeId(attr)) return attr
    }
    return getStoredTheme()
  })

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const handleThemeChange = (id: ThemeId) => {
    setTheme(id)
    setStoredTheme(id)
  }

  return (
    <div className="bg-primary min-h-screen theme-surface">
      <Nav theme={theme} onThemeChange={handleThemeChange} />
      <Hero />
      <About />
      <Music />
      <Booking />
      <Gallery />
      <Contact />
    </div>
  )
}
