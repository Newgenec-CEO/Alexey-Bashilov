import { useEffect, useMemo, useRef, useState } from 'react'
import { TegakiRenderer, type TegakiRendererHandle } from 'tegaki'
import parisienne from 'tegaki/fonts/parisienne'

/**
 * Handwritten hero surname. Swap `parisienne` for `tegaki/fonts/italianno`
 * or `tegaki/fonts/tangerine` if you want a different script.
 *
 * Ink follows the theme unless `color` is set: cream on Ember, dark ink on
 * Clean so the word stays readable on the pale hero wash.
 */
export const HERO_SIGNATURE = {
  text: 'Bashilov',
  tiltDeg: -8,
  writeSeconds: 3.6,
  holdMs: 1500,
  fadeMs: 900,
} as const

type Phase = 'write' | 'fade'

type HeroSignatureProps = {
  text?: string
  className?: string
  /** Forces one ink. Omit to use the theme color. */
  color?: string
  tiltDeg?: number
  writeSeconds?: number
  /** Pause after the last stroke, before the fade. */
  holdMs?: number
  fadeMs?: number
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return reduced
}

export function HeroSignature({
  text = HERO_SIGNATURE.text,
  className = 'text-5xl md:text-7xl lg:text-8xl',
  color,
  tiltDeg = HERO_SIGNATURE.tiltDeg,
  writeSeconds = HERO_SIGNATURE.writeSeconds,
  holdMs = HERO_SIGNATURE.holdMs,
  fadeMs = HERO_SIGNATURE.fadeMs,
}: HeroSignatureProps) {
  const reduced = usePrefersReducedMotion()
  const slotRef = useRef<HTMLDivElement>(null)
  const penRef = useRef<TegakiRendererHandle>(null)
  const cycle = useRef<'write' | 'hold' | 'fade'>('write')
  const holdTimer = useRef<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [phase, setPhase] = useState<Phase>('write')

  useEffect(() => {
    const node = slotRef.current
    if (!node || reduced) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setPlaying(true)
        observer.disconnect()
      },
      { threshold: 0.35 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduced])

  useEffect(() => {
    return () => {
      if (holdTimer.current !== null) window.clearTimeout(holdTimer.current)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'fade') return
    let cancelled = false
    const id = window.setTimeout(() => {
      if (cancelled) return
      const engine = penRef.current?.engine
      engine?.restart()
      engine?.seek(0)
      requestAnimationFrame(() => {
        if (cancelled) return
        cycle.current = 'write'
        setPhase('write')
      })
    }, fadeMs)
    return () => {
      cancelled = true
      window.clearTimeout(id)
    }
  }, [phase, fadeMs])

  const time = useMemo(
    () => ({
      mode: 'uncontrolled' as const,
      duration: writeSeconds,
      loop: false,
      playing,
      delay: 0.45,
    }),
    [writeSeconds, playing],
  )

  if (reduced) {
    return (
      <span
        className={`mt-1 block font-bold leading-none text-primary ${className}`}
        style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
      >
        {text}
      </span>
    )
  }

  return (
    <div ref={slotRef} className="hero-signature-slot" aria-hidden="true">
      <TegakiRenderer
        ref={penRef}
        font={parisienne}
        text={text}
        time={time}
        reducedMotion="never"
        onComplete={() => {
          if (cycle.current !== 'write') return
          cycle.current = 'hold'
          if (holdTimer.current !== null) window.clearTimeout(holdTimer.current)
          holdTimer.current = window.setTimeout(() => {
            cycle.current = 'fade'
            setPhase('fade')
          }, holdMs)
        }}
        className={`hero-signature font-normal ${className} ${phase === 'fade' ? 'is-fading' : ''}`}
        style={{
          color,
          ['--hero-sign-tilt' as string]: `${tiltDeg}deg`,
          ['--hero-sign-fade' as string]: `${fadeMs}ms`,
        }}
      />
    </div>
  )
}
