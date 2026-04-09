'use client';

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { label: 'Our Story', href: '#philosophy' },
  { label: 'Cocktails', href: '#cocktails' },
  { label: 'Atmosphere', href: '#atmosphere' },
  { label: 'The Menu', href: '#menu' },
  { label: 'Reserve', href: '#reserve' },
]

const MARQUEE_ITEMS = [
  'Craft Cocktails', 'World-Class Spirits', 'Curated Wine Cellar',
  'Private Dining', 'Bespoke Events', 'Master Mixologists',
  'Live Jazz Nights', 'Chef\'s Pairings', 'Rare Aged Whiskies',
  'Artisan Bitters', 'Hand-Cut Garnishes', 'Estate Gins',
]

const COCKTAILS = [
  {
    name: 'Noir Velvet', tag: 'Signature', price: '£18',
    notes: 'Dark · Floral · Effervescent',
    desc: 'Black fig vodka, elderflower, activated charcoal, vintage prosecco',
    accent: '#7B1F3F', textAccent: '#D4708A',
    bg: 'radial-gradient(ellipse at 40% 80%, rgba(123,31,63,0.55) 0%, rgba(20,0,10,0.95) 65%), #0d0008',
    img: '/cocktails/image1.jpg',
  },
  {
    name: 'Amber Reverie', tag: 'Bestseller', price: '£22',
    notes: 'Smoky · Honeyed · Complex',
    desc: 'Highland single malt, smoked honey, lapsang souchong, orange bitters',
    accent: '#C9A84C', textAccent: '#E8D5A3',
    bg: 'radial-gradient(ellipse at 60% 70%, rgba(180,120,30,0.3) 0%, rgba(15,10,0,0.95) 65%), #0c0800',
    img: '/cocktails/image2.jpg',
  },
  {
    name: 'White Ritual', tag: "Chef's Pick", price: '£24',
    notes: 'Earthy · Crisp · Ethereal',
    desc: "Hendrick's gin, white truffle tincture, dry vermouth, cucumber espuma",
    accent: '#E0DACA', textAccent: '#F5EFE4',
    bg: 'radial-gradient(ellipse at 50% 60%, rgba(220,210,190,0.15) 0%, rgba(10,10,10,0.95) 65%), #080808',
    img: '/cocktails/image3.jpg',
  },

]

const MENU_CATS = [
  {
    name: 'Signature Cocktails', count: 28, icon: '◆',
    items: ['Noir Velvet  ·  £18', 'Amber Reverie  ·  £22', 'White Ritual  ·  £24', 'Crimson Séance  ·  £20']
  },
  {
    name: 'Fine Wines', count: 120, icon: '◈',
    items: ['Château Pétrus 2016  ·  £380', 'Barolo Riserva  ·  £85', 'Sancerre Blanc  ·  £55', 'Tignanello  ·  £140']
  },
  {
    name: 'Premium Spirits', count: 200, icon: '◇',
    items: ['Yamazaki 18yr  ·  £32', 'Hennessy XO  ·  £45', 'Don Julio 1942  ·  £28', 'Clase Azul Ultra  ·  £95']
  },
  {
    name: 'Chef\'s Small Plates', count: 14, icon: '◉',
    items: ['Wagyu Tartare  ·  £28', 'Black Truffle Crostini  ·  £18', 'Oysters Champagne  ·  £32', 'Foie Gras Toast  ·  £24']
  },
]

const TESTIMONIALS = [
  {
    text: 'An unparalleled experience. Every cocktail is a masterpiece, every moment a memory. Thrist has redefined what a bar can be.',
    name: 'Alexandra V.', role: 'Food Critic, The Times', initial: 'A',
  },
  {
    text: 'The atmosphere is intoxicating before a single sip. From the moment you walk in, Thrist wraps you in something extraordinary.',
    name: 'James H.', role: 'Michelin Guide Contributor', initial: 'J',
  },
  {
    text: 'I\'ve visited the finest bars in London, Paris and New York. Thrist stands above them all — pure, consummate elegance.',
    name: 'Sofia M.', role: 'Travel & Lifestyle Editor', initial: 'S',
  },
]

// ─────────────────────────────────────────────
// SVG LOGO MARK
// ─────────────────────────────────────────────
function TLogo({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <polygon
        points="30,3 48,12 57,30 48,48 30,57 12,48 3,30 12,12"
        fill="none" stroke="#7B1F3F" strokeWidth="1"
      />
      <circle cx="30" cy="30" r="16" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="0.7" />
      <text x="30" y="37" textAnchor="middle"
        fontFamily="Cinzel, serif" fontSize="22" fontWeight="500"
        fill="#F5EFE4"
      >T</text>
      {[[30, 3], [57, 30], [30, 57], [3, 30]].map(([cx, cy], i) => (
        <rect key={i} x={cx - 2.5} y={cy - 2.5} width="5" height="5"
          fill="#C9A84C" opacity="0.7" transform={`rotate(45 ${cx} ${cy})`} />
      ))}
    </svg>
  )
}

// ─────────────────────────────────────────────
// CUSTOM CURSOR
// ─────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    let mx = 0, my = 0, rx = 0, ry = 0, raf

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
    }
    const loop = () => {
      rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      raf = requestAnimationFrame(loop)
    }
    const onEnter = () => ring.classList.add('expanded')
    const onLeave = () => ring.classList.remove('expanded')

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    const timer = setInterval(() => {
      document.querySelectorAll('a,button,[data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }, 500)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

// ─────────────────────────────────────────────
// PAGE LOADER
// ─────────────────────────────────────────────
function Loader() {
  const ref = useRef(null)
  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.classList.add('hidden')
      document.body.style.overflow = ''
    }, 1000)
    document.body.style.overflow = 'hidden'
    return () => clearTimeout(timer)
  }, [])

  return (
    <div id="trivium-loader" ref={ref}>
      <div className="loader-emblem">
        <div className="loader-ring-outer" />
        <div className="loader-ring-inner" />
        <span className="loader-t-letter">T</span>
      </div>
      <div className="loader-bar-wrap">
        <div className="loader-bar-fill" />
      </div>
      <span className="loader-copy">THRIST Bar &nbsp;·&nbsp; Est. MMXXIV</span>
    </div>
  )
}

// ─────────────────────────────────────────────
// REVEAL HOOK
// ─────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 70)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav className={`trivium-nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo-wrap">
          <div className="nav-logo-mark"><TLogo size={46} /></div>
          <div className="nav-logo-text-block">
            <span className="nav-brand">THRIST</span>
            <span className="nav-tagline">Bar &amp; Lounge</span>
          </div>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}><a href={href}>{label}</a></li>
          ))}
        </ul>

        <a href="#reserve"
          className="nav-cta"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span>Reserve a Table</span>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M0 4h10M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </a>

        <button
          className="nav-burger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99, background: 'var(--obsidian)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem'
        }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', color: 'var(--ivory)', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'none' }}>✕</button>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href}
              onClick={() => setMobileOpen(false)}
              style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', letterSpacing: '0.1em', color: 'var(--ivory)', textDecoration: 'none' }}
            >{label}</a>
          ))}
        </div>
      )}
    </>
  )
}

// ─────────────────────────────────────────────
// HERO — Parallax zoom + pan + cinematic text animations
// ─────────────────────────────────────────────
function Hero() {
  const videoRef = useRef(null)
  const bgTRef = useRef(null)
  const heroRef = useRef(null)
  const scrollYRef = useRef(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    // ── Smooth RAF loop for combined scroll + mouse parallax on video
    let raf
    const update = () => {
      const video = videoRef.current
      if (video) {
        const scrollProgress = Math.min(scrollYRef.current / window.innerHeight, 1)
        // Scroll: zoom out (1.18 → 1.0) and pan up slightly
        const scaleFromScroll = 1.18 - scrollProgress * 0.18
        // Mouse: subtle tilt (±2%)
        const tx = (mouseRef.current.x - 0.5) * 3
        const ty = (mouseRef.current.y - 0.5) * 2 - scrollProgress * 8
        video.style.transform = `scale(${scaleFromScroll}) translate(${tx}%, ${ty}%)`
      }
      // Giant T parallax
      if (bgTRef.current) {
        const x = (mouseRef.current.x - 0.5) * 28
        const y = (mouseRef.current.y - 0.5) * 18
        bgTRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-48% + ${y}px))`
      }
      raf = requestAnimationFrame(update)
    }

    const onScroll = () => { scrollYRef.current = window.scrollY }
    const onMouse = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })
    raf = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="hero-section" ref={heroRef}>
      {/* Video background — parallax target */}
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          className="hero-video hero-video--parallax"
          src="/videos/bar_background.mp4"
          autoPlay muted playsInline
          onTimeUpdate={(e) => {
            const video = e.target;
            if (video.duration - video.currentTime <= 1 && !video.dataset.fading) {
              video.dataset.fading = 'true';
              video.style.transition = 'opacity 1s ease-out';
              video.style.opacity = '0';
              video.parentElement.style.transition = 'background-color 1s ease-out';
              video.parentElement.style.backgroundColor = '#000000';
            }
          }}
        />
      </div>

      {/* Overlays */}
      <div className="hero-overlay" />
      <div className="hero-grid-bg" />
      <div className="hero-orb-1" />
      <div className="hero-orb-2" />

      {/* Giant T */}
      <div className="hero-bg-t" ref={bgTRef}>T</div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-line" />
          <span className="hero-eyebrow-text">Est. 2024 &nbsp;·&nbsp; The Art of Indulgence</span>
          <span className="hero-eyebrow-line" />
        </div>

        {/* ── Cinematic word-by-word headline ── */}
        <h1 className="hero-h2">
          <span className="line-wrap">
            <span className="line-inner l1">
              {'Where Craft'.split('').map((ch, i) => (
                <span
                  key={i}
                  className="hero-char"
                  style={{ animationDelay: `${2.8 + i * 0.04}s` }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </span>
          </span>
          <span className="line-wrap">
            <span className="line-inner l2">
              {'Meets'.split('').map((ch, i) => (
                <span
                  key={i}
                  className="hero-char"
                  style={{ animationDelay: `${3.1 + i * 0.04}s` }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </span>
          </span>
          <span className="line-wrap">
            <span className="line-inner l3">
              {'Ritual & Desire'.split('').map((ch, i) => (
                <span
                  key={i}
                  className="hero-char"
                  style={{ animationDelay: `${3.35 + i * 0.05}s` }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </span>
          </span>
        </h1>

        {/* Animated underline accent */}
        <div className="hero-title-underline" />

        <p className="hero-subtitle">
          A sanctuary for the discerning palate — where every pour tells a story
          and every evening becomes an unforgettable memory.
        </p>

        <div className="hero-divider">
          <span className="hero-divider-line" />
          <span className="hero-diamond" />
          <span className="hero-divider-line rev" />
        </div>

        <div className="hero-cta-row">
          <a href="#reserve" className="btn-primary" data-hover>
            <span className="btn-primary-inner">
              Reserve a Table
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </span>
          </a>
          <a href="#cocktails" className="btn-outline" data-hover>Explore Cocktails</a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// MARQUEE
// ─────────────────────────────────────────────
function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="marquee-section">
      <div className="marquee-fade-l" />
      <div className="marquee-fade-r" />
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// PHILOSOPHY
// ─────────────────────────────────────────────
function Philosophy() {
  return (
    <section id="philosophy" className="philosophy-section">
      <div className="philosophy-grid">
        <div className="phil-visual reveal">
          <div className="phil-img-frame">
            <div className="phil-corner tl" /><div className="phil-corner tr" />
            <div className="phil-corner bl" /><div className="phil-corner br" />
            <div className="phil-img-inner">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="phil-video"
              >
                <source src="/videos/philisophy_video.mp4" type="video/mp4" />
              </video>

              {/* overlay for luxury tint */}
              <div className="phil-video-overlay" />
            </div>
          </div>
          <div className="phil-border-deco" />
          <div className="phil-stat-badge">
            <div className="phil-stat-num">200+</div>
            <div className="phil-stat-label">Curated Spirits</div>
          </div>
        </div>

        <div className="phil-text">
          <div className="reveal">
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Our Philosophy</span>
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', marginTop: '0.5rem' }}>
              Crafted with<br />
              <span style={{ fontStyle: 'italic', color: 'rgba(245,239,228,0.55)' }}>intention.</span><br />
              Served with reverence.
            </h2>
          </div>

          <p className="phil-body reveal reveal-delay-1">
            Thrist was born from a belief that a great drink is more than its ingredients —
            it is a moment suspended in time, a conversation between the maker and the guest.
          </p>
          <p className="phil-body-regular reveal reveal-delay-2">
            Each cocktail on our menu is the result of months of refinement, sourced from
            the world's finest distilleries and complemented by hand-cut garnishes,
            rare bitters, and house-made infusions that transform the familiar into the extraordinary.
          </p>

          <div className="phil-stats-row reveal reveal-delay-3">
            {[['200+', 'Curated Spirits'], ['12', 'Signature Cocktails'], ['8', 'Years of Mastery']].map(([n, l]) => (
              <div key={l} className="phil-stat">
                <div className="phil-stat-n">{n}</div>
                <div className="phil-stat-l">{l}</div>
              </div>
            ))}
          </div>

          <a href="#story" data-hover
            className="reveal reveal-delay-4"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
              fontFamily: 'Jost, sans-serif', fontSize: '0.6rem',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--gold)', textDecoration: 'none',
              transition: 'color 0.3s', marginTop: '0.5rem'
            }}
          >
            <span>Read Our Story</span>
            <svg width="28" height="8" viewBox="0 0 28 8" fill="none"
              style={{ transition: 'transform 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateX(6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <path d="M0 4h26M22 1l4 3-4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// COCKTAILS — 3D Card Flip (photo → details)
// ─────────────────────────────────────────────
function Cocktails() {
  const [flipped, setFlipped] = useState({})

  const setCardFlip = (i, value) => {
    setFlipped(prev => ({ ...prev, [i]: value }))
  }

  const toggleFlip = (i) => {
    setFlipped(prev => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <section id="cocktails" className="cocktails-section">
      <div className="cocktails-header">
        <div className="reveal">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">The Cocktail List</span>
          </div>
          <h2
            className="section-title"
            style={{ fontSize: 'clamp(2.5rem,5.5vw,4.8rem)', marginTop: '0.5rem' }}
          >
            Signature<br />
            <span style={{ fontStyle: 'italic', color: 'rgba(245,239,228,0.5)' }}>
              Creations
            </span>
          </h2>
        </div>

        <p
          className="reveal reveal-delay-2"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.2rem',
            fontStyle: 'italic',
            color: 'rgba(237,229,208,0.48)',
            maxWidth: '340px',
            lineHeight: 1.75,
            textAlign: 'right'
          }}
        >
          Each creation is a narrative — a blend of the world's finest spirits
          and the imagination of our master mixologists.
        </p>
      </div>

      <div className="cocktails-grid">
        {COCKTAILS.map((c, i) => (
          <div
            key={c.name}
            className={`cocktail-flip-wrap reveal reveal-delay-${i + 1}`}
            onClick={() => toggleFlip(i)}
            onMouseEnter={() => setCardFlip(i, true)}
            onMouseLeave={() => setCardFlip(i, false)}
            data-hover
          >
            <div className={`cocktail-flip-inner ${flipped[i] ? 'flipped' : ''}`}>
              {/* FRONT */}
              <div
                className="cocktail-flip-face cocktail-flip-front"
                style={{
                  backgroundImage: `linear-gradient(
                  to bottom,
                  rgba(0,0,0,0.18) 0%,
                  rgba(0,0,0,0.08) 28%,
                  rgba(0,0,0,0.28) 55%,
                  rgba(0,0,0,0.82) 100%
                ), url(${c.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="cocktail-tag">{c.tag}</div>
                <div className="cocktail-num">0{i + 1}</div>

                <div className="cocktail-front-top-content">
                  <h3 className="cocktail-name">{c.name}</h3>
                  <p className="cocktail-notes" style={{ color: c.textAccent }}>
                    {c.notes}
                  </p>

                  <div className="cocktail-flip-hint">
                    <span>Hover to reveal</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        style={{ transform: 'rotate(45deg)', transformOrigin: 'center' }}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* BACK */}
              <div
                className="cocktail-flip-face cocktail-flip-back"
                style={{ background: c.bg }}
              >
                <div className="cocktail-back-tag">{c.tag}</div>
                <div className="cocktail-back-num">0{i + 1}</div>

                <div
                  className="cocktail-back-circle"
                  style={{ borderColor: c.accent + '55' }}
                />

                <div className="cocktail-back-content">
                  <div className="cocktail-back-name-wrap">
                    <span
                      className="cocktail-back-line"
                      style={{ background: c.textAccent }}
                    />
                    <h3 className="cocktail-back-name">{c.name}</h3>
                    <span
                      className="cocktail-back-line"
                      style={{ background: c.textAccent }}
                    />
                  </div>

                  <p className="cocktail-back-notes" style={{ color: c.textAccent }}>
                    {c.notes}
                  </p>

                  <p className="cocktail-back-desc">{c.desc}</p>

                  <div
                    className="cocktail-back-divider"
                    style={{ background: c.accent + '40' }}
                  />

                  <div className="cocktail-back-footer">
                    <span
                      className="cocktail-back-price"
                      style={{ color: c.textAccent }}
                    >
                      {c.price}
                    </span>

                    <a
                      href="#reserve"
                      className="cocktail-back-cta"
                      style={{ borderColor: c.accent + '80', color: c.textAccent }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Order Now →
                    </a>
                  </div>
                </div>

                <div className="cocktail-flip-close">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1 1l10 10M11 1L1 11"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ATMOSPHERE 
// ─────────────────────────────────────────────
const VENUE = 'THE THRIST BAR';
const PARAGRAPH =
  "WHERE INQUISITIVE MINDS FIND EXQUISITE COCKTAILS. Here, amongst the historic dreaming spires, you'll discover a retreat ON THE WESTGATE CENTRE";

const IMAGES = [
  {
    src: 'https://a.storyblok.com/f/321600/2048x1395/88df40f969/restaurant-1.jpg/m/1771x0/filters:quality(40)',
    tag: 'RESTAURANT',
    alt: 'Restaurant interior',
  },
  {
    src: 'https://a.storyblok.com/f/321600/2048x1366/8b0539d5e5/bar-area-17.jpg/m/1771x0/filters:quality(40)',
    tag: 'BAR AREA',
    alt: 'Bar area',
  },
  {
    src: 'https://a.storyblok.com/f/321600/2048x1366/8e33aadaaa/external-6.jpg/m/1771x0/filters:quality(40)',
    tag: 'ROOFTOP TERRACE',
    alt: 'Rooftop terrace',
  },
  {
    src: 'https://images.unsplash.com/photo-1597290282695-edc43d0e7129?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyfGVufDB8fDB8fHww',
    tag: 'PRIVATE DINING',
    alt: 'Private dining room',
  },
  {
    src: 'https://a.storyblok.com/f/32160https://img.frehttps://plus.unsplash.com/premium_photo-1670984940156-c7f833fe8397?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Depik.com/free-photo/wide-shot-bottles-glasses-display-cabinet-bar-scandic-hotel-copenhagen-denmark_181624-2920.jpg?semt=ais_hybrid&w=740&q=800/2048x1366/some-id2/cocktails-5.jpg/m/1771x0/filters:quality(40)',
    tag: 'COCKTAIL BAR',
    alt: 'Cocktail bar',
  },
];

/* scroll height that powers the sticky effect */
const FAKE_SCROLL_HEIGHT = 7160;

/* Phase split:
   0% → 45%  = word reveal
   45% → 100% = image slider  */
const WORD_PHASE_END = 0.45;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
function Atmosphere() {
  const sectionRef = useRef(null);

  const words      = PARAGRAPH.split(' ');
  const totalWords = words.length;

  const [visibleCount,  setVisibleCount]  = useState(0);
  const [activeSlide,   setActiveSlide]   = useState(0);
  const [imagesVisible, setImagesVisible] = useState(false);

  /* ── scroll handler ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function onScroll() {
      const rect     = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const viewH    = window.innerHeight;

     const scrolled  = viewH - rect.top;        // distance from viewport top to section top
      const maxScroll = sectionH;
      const progress  = Math.max(0, Math.min(1, scrolled / maxScroll));

      /* Phase 1 — words */
      const wordProgress = Math.min(1, progress / WORD_PHASE_END);
      setVisibleCount(Math.floor(wordProgress * totalWords));

      /* Phase 2 — images (only after ALL words shown) */
      const allDone = wordProgress >= 1;
      setImagesVisible(allDone);

      if (allDone) {
        const slideProgress = (progress - WORD_PHASE_END) / (1 - WORD_PHASE_END);
        setActiveSlide(
          Math.min(
            IMAGES.length - 1,
            Math.floor(Math.max(0, slideProgress) * IMAGES.length)
          )
        );
      } 
      else {
        setActiveSlide(0);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [totalWords]);

  /* ── render ── */
  return (
    <section
      ref={sectionRef}
      className="atm-section"
      style={{ height: `calc(${FAKE_SCROLL_HEIGHT}px + 100vh)` }}
    >
      {/* ─── STICKY VIEWPORT ─── */}
      <div className="atm-sticky">

        {/* ══════════════════════════════════════
            LAYER 1 — TEXT (z-index: 1, behind)
            Always visible, never hidden
        ══════════════════════════════════════ */}
        <div className="atm-text-layer">

          {/* venue label */}
          <span className="atm-venue">{VENUE}</span>

          {/* animated words */}
          <p className="atm-para">
            {words.map((word, i) => (
              <span
                key={i}
                className={`atm-word${i < visibleCount ? ' visible' : ''}`}
                style={{ '--wi': i }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        <div className={`atm-img-layer${imagesVisible ? ' active' : ''}`}>

          {/* slider strip */}
          <div
            className="atm-slider"
            style={{ transform: `translateX(${-activeSlide * 100}%)` }}
          >
            {IMAGES.map((img, i) => (
              <div
                key={i}
                className={`atm-slide${activeSlide === i ? ' is-active' : ''}`}
              >
                <div className="atm-slide-inner">
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={1771}
                    height={1000}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  <span className="atm-img-tag">{img.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── indicators ── */}
        <div className={`atm-indicators${imagesVisible ? ' active' : ''}`}>
          {IMAGES.map((_, i) => (
            <button
              key={i}
              className={`atm-dot${activeSlide === i ? ' active' : ''}`}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActiveSlide(i)}
            />
          ))}
        </div>

      </div>{/* /atm-sticky */}

      <div
        className="atm-fake-scroll"
        style={{ height: `${FAKE_SCROLL_HEIGHT}px` }}
        aria-hidden="true"
      />
    </section>
  );
}
// ────────────────────────────────────────────
// MENU TEASE
// ─────────────────────────────────────────────
function MenuTease() {
  const [hoveredCat, setHoveredCat] = useState(null)

  return (
    <section id="menu" className="menu-tease-section">
      <div className="menu-tease-grid">
        <div>
          <div className="reveal">
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">The Menu</span>
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem,4.5vw,4rem)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              Every Pour.<br />
              <span style={{ fontStyle: 'italic', color: 'rgba(245,239,228,0.5)' }}>Every Plate.</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-1"
            style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem',
              fontStyle: 'italic', color: 'rgba(237,229,208,0.52)',
              lineHeight: 1.8, maxWidth: '400px', marginBottom: '2.5rem'
            }}
          >
            From the first sip to the final morsel — our menu is a curated journey through
            the world's most exceptional flavors, guided by the hands of masters.
          </p>
          <a href="/menu" data-hover
            className="reveal reveal-delay-2 btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
          >
            <span className="btn-primary-inner">
              View Full Menu
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </span>
          </a>

          <div className="reveal reveal-delay-4"
            style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.2 }}
          >
            <TLogo size={52} />
            <div>
              <div style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.3em', color: 'var(--ivory)', fontSize: '0.9rem' }}>THRIST</div>
              <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.42rem', letterSpacing: '0.45em', color: 'var(--gold)', textTransform: 'uppercase' }}>Est. MMXXIV</div>
            </div>
          </div>
        </div>

        <div className="menu-categories reveal reveal-delay-2">
          {MENU_CATS.map((cat, i) => (
            <div
              key={cat.name}
              className="menu-cat-item"
              onMouseEnter={() => setHoveredCat(i)}
              onMouseLeave={() => setHoveredCat(null)}
              data-hover
            >
              <div className="menu-cat-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: 'var(--wine-light)', fontSize: '0.7rem', opacity: 0.7 }}>{cat.icon}</span>
                  <span className="menu-cat-name">{cat.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <span className="menu-cat-count">{cat.count} Items</span>
                  <svg
                    width="18" height="18" viewBox="0 0 18 18" fill="none"
                    style={{
                      color: 'var(--gold)',
                      transition: 'transform 0.3s',
                      transform: hoveredCat === i ? 'translateX(5px)' : 'translateX(0)'
                    }}
                  >
                    <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="menu-cat-preview" style={{ maxHeight: hoveredCat === i ? '100px' : '0' }}>
                <div style={{ paddingTop: '0.8rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem 1rem' }}>
                  {cat.items.map(item => (
                    <span key={item} style={{ display: 'block' }}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="testimonials-section">
      <div style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '4rem' }}>
        <div className="reveal">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Press &amp; Guests</span>
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', marginTop: '0.5rem' }}>
            Voices of<br />
            <span style={{ fontStyle: 'italic', color: 'rgba(245,239,228,0.5)' }}>Distinction</span>
          </h2>
        </div>
      </div>

      <div className="testi-grid" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={t.name} className={`testi-card reveal reveal-delay-${i + 1}`} data-hover>
            <span className="testi-quote-mark">"</span>
            <p className="testi-text">"{t.text}"</p>
            <div className="testi-stars">
              {[...Array(5)].map((_, j) => (
                <span key={j} className="testi-star">★</span>
              ))}
            </div>
            <div className="testi-author">
              <div className="testi-avatar">{t.initial}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// RESERVE
// ─────────────────────────────────────────────
function Reserve() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="reserve" className="reserve-section">
      <div className="reserve-inner">
        <div className="reserve-left">
          <div className="reserve-left-content">
            <div className="section-label" style={{ marginBottom: '1.5rem' }}>
              <span className="section-label-line" />
              <span className="section-label-text">Make a Reservation</span>
            </div>
            <h2 className="reserve-title">
              Begin Your<br />Evening at<br />THRIST
            </h2>
            <p className="reserve-desc">
              Secure your table and allow us to craft an evening tailored entirely to you.
              Walk-ins welcome, reservations treasured.
            </p>
            <div className="reserve-details">
              {[
                ['📍', 'The Grand Pavilion, 12 Ivory Lane, London EC2'],
                ['🕐', 'Mon – Thu: 5pm – 1am  ·  Fri – Sat: 4pm – 3am'],
                ['📞', '+44 (0) 20 7123 4567'],
                ['✉', 'reservations@thristbar.co.uk'],
              ].map(([icon, text]) => (
                <div key={text} className="reserve-detail">
                  <span className="reserve-detail-icon">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: '1rem', opacity: 0.35 }}>
              <span style={{ flex: 1, height: '1px', background: 'rgba(245,239,228,0.15)' }} />
              <TLogo size={36} />
              <span style={{ flex: 1, height: '1px', background: 'rgba(245,239,228,0.15)' }} />
            </div>
          </div>
        </div>

        <div className="reserve-right">
          <div className="section-label" style={{ marginBottom: '2rem' }}>
            <span className="section-label-line" style={{ background: 'var(--wine-light)' }} />
            <span className="section-label-text">Reserve Your Table</span>
          </div>

          {submitted ? (
            <div style={{
              textAlign: 'center', padding: '4rem 2rem',
              fontFamily: 'Cinzel, serif', color: 'var(--gold)',
              fontSize: '1.2rem', letterSpacing: '0.05em'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>◆</div>
              Reservation Received.<br />
              <span style={{ fontStyle: 'italic', color: 'rgba(237,229,208,0.55)', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem' }}>
                We look forward to welcoming you.
              </span>
            </div>
          ) : (
            <form className="reserve-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" placeholder="Alexandra" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input type="text" placeholder="Voss" className="form-input" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" placeholder="alex@example.com" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input type="tel" placeholder="+44 7700 900000" className="form-input" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-input" required style={{ colorScheme: 'dark' }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <select className="form-select" required>
                    <option value="">Select time</option>
                    {['17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Guests</label>
                  <select className="form-select" required>
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Occasion</label>
                  <select className="form-select">
                    <option value="">Optional</option>
                    {['Birthday', 'Anniversary', 'Business Dinner', 'Date Night', 'Celebration', 'Other'].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Special Requests</label>
                <input type="text" placeholder="Dietary requirements, preferred table, etc." className="form-input" />
              </div>
              <button type="submit" className="form-submit" data-hover>
                <span>Confirm Reservation</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-logo">
            <TLogo size={44} />
            <span className="footer-brand-name">THRIST</span>
          </div>
          <p className="footer-brand-desc">
            A sanctuary of craft and elegance. Where every evening becomes an extraordinary memory.
          </p>
          <div className="footer-socials">
            {['IG', 'FB', 'TW', 'YT'].map(s => (
              <a key={s} href="#" className="footer-social" data-hover>{s}</a>
            ))}
          </div>
        </div>
        {[
          { title: 'Explore', links: ['Our Story', 'Cocktail Menu', 'Wine Cellar', 'Private Events', 'Gift Vouchers'] },
          { title: 'Visit', links: ['Find Us', 'Opening Hours', 'Reservations', 'Private Hire', 'Press Enquiries'] },
          { title: 'Legal', links: ['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Accessibility', 'Careers'] },
        ].map(col => (
          <div key={col.title}>
            <div className="footer-col-title">{col.title}</div>
            <ul className="footer-links">
              {col.links.map(l => (
                <li key={l}><a href="#" data-hover>{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© MMXXIV THRIST Bar &amp; Lounge. All rights reserved.</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ width: '24px', height: '1px', background: 'rgba(237,229,208,0.1)' }} />
          Crafted with Intention
          <span style={{ width: '24px', height: '1px', background: 'rgba(237,229,208,0.1)' }} />
        </span>
        <span>London, United Kingdom</span>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────
export default function Page() {
  useReveal()

  return (
    <>
      <Cursor />
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Philosophy />
        <Cocktails />
        <Atmosphere />
        <MenuTease />
        <Testimonials />
        <Reserve />
      </main>
      <Footer />
    </>
  )
}