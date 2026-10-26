import { useState, useEffect } from 'react'
import {
  THEMES,
  type ThemeId,
  getStoredTheme,
  setStoredTheme,
  applyTheme,
  isThemeId,
} from './theme'
import { LOCALES, type LocaleId } from './i18n'
import { useLocale } from './LocaleContext'

function revealDelay(ms: number): React.CSSProperties {
  return { '--d': `${ms}ms` } as React.CSSProperties
}

function usePageMotion() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('js')
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal], [data-color]'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      nodes.forEach((node) => node.classList.add('is-in'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -4% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

// ─── Image assets (Ref_photo) ──────────────────────────────────────────────────
const HERO_IMG = '/photos/studio_room_22.webp'
const ABOUT_IMG = '/photos/portrait_guitar_3.jpg'
const GALLERY_IMGS = [
  '/photos/portrait_guitar_1.jpg',
  '/photos/portrait_guitar_2.jpg',
  '/photos/portrait_guitar_4.jpg',
  '/photos/album_cover.webp',
  '/photos/studio_room_2.webp',
  '/photos/portrait_guitar_5.jpg',
  '/photos/concert_room_0.jpg',
  '/photos/concert_room_1.jpg',
]

function IconSun() {
  return (
    <svg className="theme-switcher__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg className="theme-switcher__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z" />
    </svg>
  )
}

function ThemeSwitcher({
  theme,
  onChange,
  ariaLabel,
}: {
  theme: ThemeId
  onChange: (id: ThemeId) => void
  ariaLabel: string
}) {
  return (
    <div className="theme-switcher" role="group" aria-label={ariaLabel}>
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          className="theme-switcher__btn"
          aria-pressed={theme === t.id}
          aria-label={t.ariaLabel}
          title={t.ariaLabel}
          onClick={() => onChange(t.id)}
        >
          {t.mode === 'light' ? <IconSun /> : <IconMoon />}
        </button>
      ))}
    </div>
  )
}

function LangSwitcher({
  locale,
  onChange,
  ariaLabel,
}: {
  locale: LocaleId
  onChange: (id: LocaleId) => void
  ariaLabel: string
}) {
  return (
    <div className="lang-switcher" role="group" aria-label={ariaLabel}>
      {LOCALES.map((l) => (
        <button
          key={l.id}
          type="button"
          className="lang-switcher__btn"
          aria-pressed={locale === l.id}
          aria-label={l.ariaLabel}
          title={l.ariaLabel}
          onClick={() => onChange(l.id)}
        >
          {l.label}
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
  const { t, locale, setLocale } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [locale])

  const navItems = [
    { href: '#about', label: t.nav.about },
    { href: '#music', label: t.nav.music },
    { href: '#live', label: t.nav.live },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header className={`site-header fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || menuOpen ? 'is-scrolled' : ''}`}>
      <div className="site-header__inner max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between gap-3">
        <span
          className="text-sm font-bold tracking-[0.2em] uppercase shrink-0 text-primary"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Bashilov
        </span>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link text-xs tracking-widest uppercase whitespace-nowrap">
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary site-header__book text-xs tracking-widest uppercase px-4 py-2 rounded whitespace-nowrap"
          >
            {t.nav.book}
          </a>
        </nav>

        <div className="header-controls shrink-0">
          <LangSwitcher locale={locale} onChange={setLocale} ariaLabel={t.nav.langGroup} />
          <ThemeSwitcher theme={theme} onChange={onThemeChange} ariaLabel={t.nav.themeGroup} />
          <button
            type="button"
            className="mobile-menu-btn lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={menuOpen ? 'is-open' : undefined} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" className="mobile-nav lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-nav__link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary mt-2 text-center text-xs tracking-widest uppercase px-4 py-3 rounded"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.book}
          </a>
        </nav>
      )}
    </header>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useLocale()

  return (
    <section className="hero relative w-full min-h-screen flex items-end grain bg-primary">
      <img
        src={HERO_IMG}
        alt={t.hero.imgAlt}
        className="hero-photo color-window"
        data-color=""
      />
      <div className="absolute inset-0 hero-gradient-bottom" />
      <div className="absolute inset-0 hero-gradient-side" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28 w-full">
        <div className="hero-seq max-w-xl">
          <p className="hero-seq__item text-xs tracking-[0.3em] uppercase mb-5 font-serif-em italic text-accent">
            {t.hero.eyebrow}
          </p>
          <h1
            className="hero-seq__item text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-4 text-primary"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            {t.hero.nameLine1}
            <br />
            {t.hero.nameLine2}
          </h1>
          <p className="hero-seq__item text-base md:text-lg mb-8 leading-relaxed text-secondary">
            {t.hero.lead}
            <br />
            {t.hero.leadStat}
          </p>
          <div className="hero-seq__item flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#contact"
              className="btn-primary px-7 py-3.5 rounded text-sm font-semibold tracking-wide"
            >
              {t.hero.ctaPrimary}
            </a>
            <a href="#gallery" className="link-muted text-sm font-medium tracking-wide flex items-center gap-2">
              {t.hero.ctaSecondary} <span className="text-accent">→</span>
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
  const { t } = useLocale()
  const facts = [
    { num: '15+', label: t.about.facts.years },
    { num: '250+', label: t.about.facts.shows },
    { num: '2', label: t.about.facts.languages },
    { num: '∞', label: t.about.facts.repertoire },
  ]

  return (
    <section id="about" className="section bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="reveal" data-reveal="">
            <div className="tilt tilt-photo group relative w-full aspect-[3/4] rounded-sm overflow-hidden bg-card">
            <img
              src={ABOUT_IMG}
              alt={t.about.imgAlt}
              className="color-window w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              data-color=""
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3"
              style={{
                background: 'linear-gradient(to top, color-mix(in srgb, var(--accent-warm) 18%, transparent), transparent)',
              }}
            />
            </div>
          </div>

          <div className="reveal flex flex-col justify-center pt-0 md:pt-16" data-reveal="" style={revealDelay(120)}>
            <p className="section-label mb-4">{t.about.label}</p>
            <h2
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-primary"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              {t.about.titleLine1}
              <br />
              {t.about.titleLine2}
            </h2>
            <blockquote
              className="font-serif-em italic text-lg md:text-xl mb-8 leading-relaxed text-secondary"
              style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1.25rem' }}
            >
              {t.about.quote}
            </blockquote>
            <div className="space-y-4 mb-10 text-secondary">
              <p className="text-sm leading-relaxed">{t.about.p1}</p>
              <p className="text-sm leading-relaxed">{t.about.p2}</p>
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
  const { t } = useLocale()
  const originals = [
    { title: 'Тишина после', duration: '4:12' },
    { title: 'Cold Shore', duration: '3:47' },
    { title: 'Осколки', duration: '5:03' },
  ]

  return (
    <section id="music" className="section section-flip relative grain bg-muted">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 79px, var(--border) 80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="section-head reveal" data-reveal="">
          <p className="section-label mb-3">{t.music.label}</p>
          <h2
            className="text-3xl md:text-5xl font-bold text-primary"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            {t.music.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px gap-line">
          <div className="reveal h-full" data-reveal="" style={revealDelay(80)}>
          <div className="tilt h-full p-8 md:p-12 bg-card">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs tracking-[0.25em] uppercase font-semibold text-accent">
                {t.music.originals}
              </span>
            </div>
            <p className="text-sm mb-8 leading-relaxed text-secondary">{t.music.originalsDesc}</p>
            <div className="space-y-px" style={{ borderTop: '1px solid var(--border)' }}>
              {originals.map((track, i) => (
                <div
                  key={track.title}
                  className="track-row flex items-center justify-between py-4 px-2 -mx-2 group cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs w-4 text-right text-secondary">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium track-title">{track.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-secondary">{track.duration}</span>
                    <span className="text-lg text-accent transition-transform group-hover:scale-110">
                      ▷
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>

          <div className="reveal h-full" data-reveal="" style={revealDelay(160)}>
          <div className="tilt h-full p-8 md:p-12 bg-surface-alt">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs tracking-[0.25em] uppercase font-semibold text-accent-warm">
                {t.music.covers}
              </span>
            </div>
            <p className="text-sm mb-6 leading-relaxed text-secondary">
              {t.music.coversBefore}{' '}
              <span className="text-primary">System of a Down, Nirvana, Radiohead, The Cure</span>{' '}
              {t.music.coversAnd} <span className="text-primary">The Beatles</span> {t.music.coversTo}{' '}
              <span className="text-primary">Кино, Би-2, Звери</span> {t.music.coversAnd}{' '}
              <span className="text-primary">Король и Шут</span> {t.music.coversAfter}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {t.music.tags.map((tag) => (
                <span key={tag} className="tag-chip text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p
              className="text-xs leading-relaxed italic font-serif-em text-secondary"
              style={{ borderLeft: '1px solid var(--accent-warm)', paddingLeft: '1rem' }}
            >
              {t.music.note}
            </p>
          </div>
          </div>
        </div>

        <div className="reveal mt-8 text-center" data-reveal="" style={revealDelay(120)}>
          <p className="text-sm font-serif-em italic text-secondary">
            {t.music.softCta}{' '}
            <a href="#contact" className="link-accent">
              {t.music.softLink}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Booking ───────────────────────────────────────────────────────────────────
function Booking() {
  const { t } = useLocale()

  return (
    <section id="live" className="section bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="section-head reveal" data-reveal="">
          <p className="section-label mb-3">{t.live.label}</p>
          <h2
            className="text-3xl md:text-5xl font-bold text-primary"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            {t.live.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-16 gap-line">
          {t.live.formats.map((f, i) => (
            <div key={f.title} className="reveal h-full" data-reveal="" style={revealDelay(i * 90)}>
            <div className="tilt group h-full p-8 bg-card">
              <span className="block text-2xl mb-5 text-accent">{f.icon}</span>
              <h3
                className="text-lg font-semibold mb-3 text-primary"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-secondary">{f.desc}</p>
            </div>
            </div>
          ))}
        </div>

        <div className="reveal mb-12" data-reveal="" style={revealDelay(80)}>
          <p className="text-xs tracking-[0.25em] uppercase mb-8 text-secondary">{t.live.how}</p>
          <div className="flex flex-col md:flex-row gap-8 md:gap-0">
            {t.live.steps.map((text, i) => (
              <div key={text} className="flex-1 flex items-start gap-5 relative">
                <div>
                  <span
                    className="text-xs font-bold tracking-widest text-accent"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-primary">{text}</p>
                </div>
                {i < t.live.steps.length - 1 && (
                  <div
                    className="hidden md:block absolute right-0 top-1 w-8 h-px"
                    style={{ background: 'var(--border)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="reveal" data-reveal="" style={revealDelay(120)}>
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded text-sm font-semibold tracking-wide"
          >
            {t.live.cta}
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Gallery ───────────────────────────────────────────────────────────────────
function Gallery() {
  const { t } = useLocale()

  return (
    <section id="gallery" className="section section-flip bg-muted">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="section-head reveal" data-reveal="">
          <p className="section-label mb-3">{t.gallery.label}</p>
          <h2
            className="text-3xl md:text-5xl font-bold text-primary"
            style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
          >
            {t.gallery.title}
          </h2>
        </div>

        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {GALLERY_IMGS.map((url, i) => (
            <div
              key={url}
              className="reveal reveal-fade break-inside-avoid"
              data-reveal=""
              style={revealDelay((i % 3) * 80)}
            >
              <div className="tilt overflow-hidden rounded-sm group bg-card">
              <img
                src={url}
                alt={t.gallery.alts[i] ?? ''}
                className="color-window block w-full object-cover group-hover:scale-[1.04]"
                data-color=""
                loading="lazy"
              />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const { t } = useLocale()
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
    <section id="contact" className="section bg-primary border-t-theme">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="reveal" data-reveal="">
            <p className="section-label mb-4">{t.contact.label}</p>
            <h2
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-primary"
              style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
            >
              {t.contact.title}
            </h2>
            <p className="text-sm leading-relaxed mb-10 text-secondary">{t.contact.lead}</p>

            <div className="space-y-6">
              <div className="tilt flex items-center gap-4 p-4 rounded bg-card" style={{ border: '1px solid var(--border)' }}>
                <span className="text-accent" style={{ fontSize: '20px' }}>
                  ✈
                </span>
                <div>
                  <p className="text-xs tracking-wider uppercase mb-0.5 text-secondary">
                    {t.contact.preferred}
                  </p>
                  <p className="text-sm font-medium text-primary">Telegram</p>
                </div>
              </div>
              <div className="tilt flex items-center gap-4 p-4 rounded bg-card" style={{ border: '1px solid var(--border)' }}>
                <span className="text-accent-warm" style={{ fontSize: '20px' }}>
                  ◎
                </span>
                <div>
                  <p className="text-xs tracking-wider uppercase mb-0.5 text-secondary">
                    {t.contact.location}
                  </p>
                  <p className="text-sm font-medium text-primary">{t.contact.locationValue}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="form-success flex flex-col items-start justify-center h-full gap-4" role="status">
                <span className="form-success__mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5 9.2 17 19 7.5" />
                  </svg>
                </span>
                <h3
                  className="text-2xl font-bold text-primary"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {t.contact.successTitle}
                </h3>
                <p className="text-sm text-secondary">{t.contact.successBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="reveal space-y-4" data-reveal="" style={revealDelay(100)}>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-secondary">
                    {t.contact.name}
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.contact.namePlaceholder}
                    required
                    className="form-control"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-secondary">
                    {t.contact.date}
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
                    {t.contact.format}
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="form-control"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">{t.contact.formatPlaceholder}</option>
                    <option value="acoustic">{t.contact.formatAcoustic}</option>
                    <option value="electric">{t.contact.formatElectric}</option>
                    <option value="private">{t.contact.formatPrivate}</option>
                    <option value="other">{t.contact.formatOther}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2 text-secondary">
                    {t.contact.message}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={t.contact.messagePlaceholder}
                    className="form-control"
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full py-4 rounded text-sm font-semibold tracking-wide"
                >
                  {t.contact.submit}
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
          {t.contact.footerName}
        </span>
        <div className="flex items-center gap-6">
          {['Telegram', 'VK', 'YouTube'].map((label) => (
            <a key={label} href="#" className="footer-link text-xs tracking-wide">
              {label}
            </a>
          ))}
        </div>
        <span className="text-xs text-secondary">
          © 2026
        </span>
      </footer>
    </section>
  )
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  usePageMotion()
  const [theme, setTheme] = useState<ThemeId>(() => {
    if (typeof document !== 'undefined') {
      const attr = document.documentElement.getAttribute('data-theme')
      if (isThemeId(attr)) return attr
    }
    return getStoredTheme()
  })

  useEffect(() => {
    setStoredTheme(theme)
  }, [])

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
