import { useState, useEffect } from 'react'

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

// ─── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(15,15,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #2E2E2E' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <span
          className="text-sm font-bold tracking-[0.2em] uppercase"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F2F0EB' }}
        >
          Bashilov
        </span>
        <nav className="hidden md:flex items-center gap-8">
          {['About', 'Music', 'Live', 'Gallery', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: '#A8A39A' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F2F0EB')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A8A39A')}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="text-xs tracking-widest uppercase px-4 py-2 rounded transition-all duration-200 hover:scale-105"
            style={{ background: '#C45C3A', color: '#F2F0EB' }}
          >
            Book
          </a>
        </nav>
      </div>
    </header>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-end grain" style={{ background: '#0F0F0F' }}>
      <img
        src={HERO_IMG}
        alt="Alexey Bashilov performing live with acoustic guitar"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ filter: 'saturate(0.6) brightness(0.55)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, #0F0F0F 0%, rgba(15,15,15,0.55) 40%, transparent 75%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(15,15,15,0.6) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28 w-full">
        <div className="max-w-xl">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-5 font-serif-em italic"
            style={{ color: '#C45C3A' }}
          >
            Guitar · Voice · Live
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-4"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              color: '#F2F0EB',
              letterSpacing: '-0.02em',
            }}
          >
            Alexey
            <br />
            Bashilov
          </h1>
          <p className="text-base md:text-lg mb-8 leading-relaxed" style={{ color: '#A8A39A' }}>
            Original songs & carefully chosen covers.
            <br />
            250+ live performances.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#contact"
              className="px-7 py-3.5 rounded text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-105 hover:brightness-110"
              style={{ background: '#C45C3A', color: '#F2F0EB', fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Book a performance
            </a>
            <a
              href="#gallery"
              className="text-sm font-medium tracking-wide transition-colors duration-200 flex items-center gap-2"
              style={{ color: '#A8A39A' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F2F0EB')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A8A39A')}
            >
              Watch live videos <span style={{ color: '#C45C3A' }}>→</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div
            className="w-px h-8 animate-pulse"
            style={{ background: 'linear-gradient(to bottom, transparent, #C45C3A)' }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: '#2E2E2E' }} />
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
    <section id="about" className="relative py-24 md:py-36" style={{ background: '#0F0F0F' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div
            className="relative w-full aspect-[3/4] rounded-sm overflow-hidden"
            style={{ background: '#1A1A1A' }}
          >
            <img
              src={ABOUT_IMG}
              alt="Alexey Bashilov portrait"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'grayscale(30%) contrast(1.05)' }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3"
              style={{ background: 'linear-gradient(to top, rgba(139,115,85,0.18), transparent)' }}
            />
          </div>

          <div className="flex flex-col justify-center pt-0 md:pt-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#C45C3A' }}>
              About
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              Living sound.
              <br />
              Real stage.
            </h2>
            <blockquote
              className="font-serif-em italic text-lg md:text-xl mb-8 leading-relaxed"
              style={{ color: '#A8A39A', borderLeft: '2px solid #C45C3A', paddingLeft: '1.25rem' }}
            >
              "Every performance is a conversation — between the music, the room, and the moment."
            </blockquote>
            <div className="space-y-4 mb-10" style={{ color: '#A8A39A' }}>
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

            <div className="grid grid-cols-2 gap-px" style={{ background: '#2E2E2E' }}>
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col p-5" style={{ background: '#1A1A1A' }}>
                  <span
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#C45C3A' }}
                  >
                    {f.num}
                  </span>
                  <span className="text-xs tracking-wide uppercase" style={{ color: '#A8A39A' }}>
                    {f.label}
                  </span>
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
    <section id="music" className="relative py-24 md:py-36 grain" style={{ background: '#111111' }}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 79px, #2E2E2E 80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C45C3A' }}>
            Repertoire
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            Music
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#2E2E2E' }}>
          <div className="p-8 md:p-12" style={{ background: '#1A1A1A' }}>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-xs tracking-[0.25em] uppercase font-semibold"
                style={{ color: '#C45C3A' }}
              >
                Original songs
              </span>
            </div>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: '#A8A39A' }}>
              Songs written and composed by Alexey — shaped by years on stage, by melancholy,
              movement and the quiet between notes.
            </p>
            <div className="space-y-px" style={{ borderTop: '1px solid #2E2E2E' }}>
              {originals.map((t, i) => (
                <div
                  key={t.title}
                  className="flex items-center justify-between py-4 group cursor-default transition-colors duration-150"
                  style={{ borderBottom: '1px solid #2E2E2E' }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs w-4 text-right" style={{ color: '#2E2E2E' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="text-sm font-medium transition-colors"
                      style={{ color: '#F2F0EB' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#C45C3A')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#F2F0EB')}
                    >
                      {t.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: '#A8A39A' }}>
                      {t.duration}
                    </span>
                    <span
                      className="text-lg transition-transform group-hover:scale-110"
                      style={{ color: '#C45C3A' }}
                    >
                      ▷
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12" style={{ background: '#161616' }}>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-xs tracking-[0.25em] uppercase font-semibold"
                style={{ color: '#8B7355' }}
              >
                Covers & atmosphere
              </span>
            </div>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: '#A8A39A' }}>
              From{' '}
              <span style={{ color: '#F2F0EB' }}>
                System of a Down, Nirvana, Radiohead, The Cure
              </span>{' '}
              and <span style={{ color: '#F2F0EB' }}>The Beatles</span> to{' '}
              <span style={{ color: '#F2F0EB' }}>Кино, Би-2, Звери</span> and{' '}
              <span style={{ color: '#F2F0EB' }}>Король и Шут</span> — and many more.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Alternative Rock', 'Classic Rock', 'Russian Rock', 'Indie', 'Post-punk', 'Acoustic'].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: '#2E2E2E', color: '#A8A39A' }}
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
            <p
              className="text-xs leading-relaxed italic font-serif-em"
              style={{ color: '#A8A39A', borderLeft: '1px solid #8B7355', paddingLeft: '1rem' }}
            >
              Full repertoire available on request. The program is always tailored to the event and
              its mood.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-serif-em italic" style={{ color: '#A8A39A' }}>
            Looking for a specific song or mood?{' '}
            <a href="#contact" style={{ color: '#C45C3A' }}>
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
    <section id="live" className="py-24 md:py-36" style={{ background: '#0F0F0F' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C45C3A' }}>
            Formats
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            Live performances
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-16" style={{ background: '#2E2E2E' }}>
          {formats.map((f) => (
            <div
              key={f.title}
              className="group p-8 transition-colors duration-300"
              style={{ background: '#1A1A1A' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#1E1E1E')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#1A1A1A')}
            >
              <span className="block text-2xl mb-5" style={{ color: '#C45C3A' }}>
                {f.icon}
              </span>
              <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#A8A39A' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <p className="text-xs tracking-[0.25em] uppercase mb-8" style={{ color: '#A8A39A' }}>
            How it works
          </p>
          <div className="flex flex-col md:flex-row gap-8 md:gap-0">
            {steps.map((s, i) => (
              <div key={s.n} className="flex-1 flex items-start gap-5 relative">
                <div>
                  <span
                    className="text-xs font-bold tracking-widest"
                    style={{ color: '#C45C3A', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {s.n}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: '#F2F0EB' }}>
                    {s.text}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute right-0 top-1 w-8 h-px"
                    style={{ background: '#2E2E2E' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-105 hover:brightness-110"
          style={{ background: '#C45C3A', color: '#F2F0EB', fontFamily: 'Space Grotesk, sans-serif' }}
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
    <section id="gallery" className="py-24 md:py-36" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#C45C3A' }}>
            Gallery
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            On stage
          </h2>
        </div>

        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {GALLERY_IMGS.map((img, i) => (
            <div
              key={img.url}
              className="break-inside-avoid overflow-hidden rounded-sm group cursor-pointer"
              style={{ background: '#1A1A1A' }}
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

  const inputStyle: React.CSSProperties = {
    background: '#111111',
    border: '1px solid #2E2E2E',
    borderRadius: '4px',
    color: '#F2F0EB',
    padding: '12px 14px',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'Inter, sans-serif',
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-36"
      style={{ background: '#0F0F0F', borderTop: '1px solid #2E2E2E' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#C45C3A' }}>
              Contact
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              Let's talk.
            </h2>
            <p className="text-sm leading-relaxed mb-10" style={{ color: '#A8A39A' }}>
              Tell me about your event — date, place, desired mood and any special requests. I'll get
              back to you quickly.
            </p>

            <div className="space-y-6">
              <div
                className="flex items-center gap-4 p-4 rounded"
                style={{ background: '#1A1A1A', border: '1px solid #2E2E2E' }}
              >
                <span style={{ color: '#C45C3A', fontSize: '20px' }}>✈</span>
                <div>
                  <p className="text-xs tracking-wider uppercase mb-0.5" style={{ color: '#A8A39A' }}>
                    Preferred contact
                  </p>
                  <p className="text-sm font-medium" style={{ color: '#F2F0EB' }}>
                    Telegram
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-4 p-4 rounded"
                style={{ background: '#1A1A1A', border: '1px solid #2E2E2E' }}
              >
                <span style={{ color: '#8B7355', fontSize: '20px' }}>◎</span>
                <div>
                  <p className="text-xs tracking-wider uppercase mb-0.5" style={{ color: '#A8A39A' }}>
                    Location
                  </p>
                  <p className="text-sm font-medium" style={{ color: '#F2F0EB' }}>
                    Moscow & tours
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="flex flex-col items-start justify-center h-full gap-4">
                <span className="text-3xl" style={{ color: '#C45C3A' }}>
                  ◆
                </span>
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Message received.
                </h3>
                <p className="text-sm" style={{ color: '#A8A39A' }}>
                  I'll be in touch soon. Talk soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{ color: '#A8A39A' }}
                  >
                    Your name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Alexei Ivanov"
                    required
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#C45C3A')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#2E2E2E')}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{ color: '#A8A39A' }}
                  >
                    Event date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#C45C3A')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#2E2E2E')}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{ color: '#A8A39A' }}
                  >
                    Format
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#C45C3A')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#2E2E2E')}
                  >
                    <option value="">Select a format</option>
                    <option value="acoustic">Acoustic set</option>
                    <option value="electric">Full electric set</option>
                    <option value="private">Private event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{ color: '#A8A39A' }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your event, mood, venue..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#C45C3A')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#2E2E2E')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded text-sm font-semibold tracking-wide transition-all duration-200 hover:brightness-110 hover:scale-[1.01]"
                  style={{
                    background: '#C45C3A',
                    color: '#F2F0EB',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-6 md:px-10 mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid #2E2E2E' }}
      >
        <span
          className="text-sm font-bold tracking-[0.15em] uppercase"
          style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F2F0EB' }}
        >
          Alexey Bashilov
        </span>
        <div className="flex items-center gap-6">
          {['Telegram', 'VK', 'YouTube'].map((label) => (
            <a
              key={label}
              href="#"
              className="text-xs tracking-wide transition-colors duration-200"
              style={{ color: '#A8A39A' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C45C3A')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A8A39A')}
            >
              {label}
            </a>
          ))}
        </div>
        <span className="text-xs" style={{ color: '#2E2E2E' }}>
          © 2026
        </span>
      </div>
    </section>
  )
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: '#0F0F0F', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <About />
      <Music />
      <Booking />
      <Gallery />
      <Contact />
    </div>
  )
}
