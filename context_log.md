# Context log — site changes

## 2026-07-30 — EN / RU language switcher

- Added bilingual UI: **EN | RU** pill next to theme toggle
- Full quality Russian translation of all sections (nav, hero, about, music, live, gallery, contact/form)
- Persistence: `localStorage` key `bashilov-lang`; default **RU** (browser EN → EN)
- Mobile: lang + theme stay in header; hamburger menu for section links
- Files: `src/i18n.ts`, `src/LocaleContext.tsx`, updates to `App.tsx`, `main.tsx`, `index.html`, `index.css`

---

## 2026-07-30 — Light/Dark only (Clean + Ember)

- Left **two themes**: `clean-light` (light, sun icon) and `ember` (dark, moon icon)
- Theme switcher → compact icon toggle (no theme name labels)
- Default theme: **Clean** (`clean-light`)
- Legacy localStorage ids map to Clean (former lights) or Ember (former darks)
- Unused theme CSS blocks removed from `src/index.css`

---

## 2026-07-30 — Hero fog opacity (light themes) + gitignore

### Hero fog (transparency only, no hue change)
- Softened mist overlay on Hero photo for light themes only: **Warm, Clean, Soft, Mist, Sage**
- Tokens: `--hero-scrim` alpha `0.55 → 0.22`; new `--hero-side-mix: 28%`; `--hero-bottom-solid: 72%`
- Dark themes (Dark, Ember, Mocha) unchanged (stronger scrim / 60% side / 100% bottom)
- Goal: photo (`studio_room.webp`) more visible under light fog

### Gitignore (not for GitHub push)
- `node_modules/`, `dist/`, `.vite/`, env/IDE junk
- `reference_site/` — Figma Make reference app  
- `Ref_photo/` — raw source photos (site uses `public/photos/`)  
- `re-design/` — Coolors SCSS sources (already applied in CSS)

### Kept for push (docs / product)
- `context_log.md`, `design-system.md`, `context_analysis_ai.md`
- `src/`, `public/`, app config (`package.json`, `vite.config.ts`, etc.)

---

## 2026-07-30 — Expanded to 8 themes (re-design Coolors)

### What was added
- **4 new design systems** mapped from `re-design/coolors_*.scss` onto full token set:
  5. `mist` — Mist (lavender / granite / silver) — light  
  6. `sage` — Sage (sand-dune / blue-slate / dry-sage) — light  
  7. `ember` — Ember (pitch-black / khaki / toasted-almond) — dark  
  8. `mocha` — Mocha (shadow-grey / bone / deep-mocha) — dark  
- Switcher now has **8 options**: Dark · Warm · Clean · Soft · Mist · Sage · Ember · Mocha  
- Missing tokens (hover, muted, scrim, btn-text, etc.) logically extended from each Coolors palette  
- Docs: `design-system.md` updated with all 8 themes  

### Files touched
| File | Change |
|------|--------|
| `src/index.css` | +4 theme blocks; dark grain for ember/mocha; denser switcher for 8 items |
| `src/theme.ts` | THEMES list → 8 entries |
| `src/App.tsx` | `isThemeId` for boot validation |
| `index.html` | valid theme ids in FOUC script |
| `design-system.md` | Themes 5–8 documented |
| `context_log.md` | This entry |

### Sources
| Theme | SCSS file |
|-------|-----------|
| Mist | `re-design/coolors_1.scss` |
| Sage | `re-design/coolors_2.scss` |
| Ember | `re-design/coolors_3.scss` |
| Mocha | `re-design/coolors_4.scss` |

---

## 2026-07-30 — Multi-theme system (4 themes)

### What was added
- **4 color themes** driven by CSS variables on `:root` / `[data-theme="…"]`:
  1. `dark-rock` — original dark cinematic palette  
  2. `warm-acoustic` — warm light (default)  
  3. `clean-light` — cool green-accent light  
  4. `soft-golden` — soft golden light  
- **Theme switcher** in the fixed header: segmented pill control with labels  
  `1 · Dark` | `2 · Warm` | `3 · Clean` | `4 · Soft`  
- **Persistence:** selected theme saved to `localStorage` under `bashilov-theme`  
- **FOUC prevention:** inline script in `index.html` restores theme before paint  
- **Default theme:** Warm Acoustic (`warm-acoustic`)

### Files touched
| File | Change |
|------|--------|
| `src/index.css` | Theme token definitions; utility classes; switcher + header styles; transitions (~0.3s) |
| `src/theme.ts` | Theme IDs, storage helpers, apply/set theme |
| `src/App.tsx` | Refactored hardcoded colors → CSS vars/utilities; `ThemeSwitcher` + theme state in `Nav` |
| `index.html` | `data-theme` default + boot script for localStorage |
| `context_log.md` | This log |

### Behavior notes
- All major sections (Hero, About, Music, Booking, Gallery, Contact/Footer) use theme variables for backgrounds, text, accents, borders, cards, buttons, and form controls.
- Mobile: switcher moves to a full-width row under the logo (still tappable).
- Desktop: switcher sits in the header next to nav links.
- Layout and section structure unchanged; only colors and header chrome were extended.
