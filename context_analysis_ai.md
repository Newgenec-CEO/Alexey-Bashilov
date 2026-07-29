# Анализ референсного сайта (`reference_site`)

**Дата анализа:** 2026-07-30  
**Источник:** `reference_site/` — одностраничный портфолио-лендинг гитариста и вокалиста **Alexey Bashilov (Алексей Башилов)**  
**Происхождение:** экспорт / scaffold из **Figma Make** (`figma-make-app`)

---

## 1. Назначение и позиционирование

Сайт задуман не как коммерческий «закажи музыканта» landing с жёсткими продажами, а как **атмосферное личное portfolio / artist statement**:

| Аспект | Описание |
|--------|----------|
| **Жанр** | One-page atmospheric personal website |
| **Герой** | Профессиональный гитарист и вокалист |
| **Настроение** | Intimate live performance, melancholy + strength, cinematic, raw, emotional |
| **Стиль** | Dark cinematic minimalism with rock character |
| **Анти-паттерны** | Glossy corporate, bright gradients, TikTok-эстетика, neon, stock-polished look |

**Ключевой месседж:** живой музыкант с серьёзным отношением к ремеслу — original songs + curated covers, 250+ live shows, своё оборудование, программа под событие.

**География (в UI):** Moscow & tours.  
**Предпочтительный контакт:** Telegram.

---

## 2. Технологический стек

| Слой | Технология | Версия / детали |
|------|------------|-----------------|
| UI | React | ^19 |
| Сборка | Vite | ^8 |
| Язык | TypeScript | ^5.7 |
| Стили | Tailwind CSS | ^4 (`@tailwindcss/vite`) |
| Пакетный менеджер | pnpm | lockfile: `pnpm-lock.yaml` |
| Форматирование | oxfmt | devDependency |
| Шрифты | Google Fonts | Space Grotesk, Inter, Instrument Serif |

### Особенности окружения Figma Make

- `vite.config.ts` содержит плагины Figma: site configuration, error overlay replay, React refresh boundary fallback, make kit.
- `index.html` — shell с placeholder-комментариями `<!-- figma:* -->`.
- `.figma/make/site.json` — meta (description, robots noindex, accessibility flags).
- Alias `@` → `src/`.
- Dev-сервер: host `0.0.0.0`, port `PORT` или **8443**.
- `package.json` name: `figma-make-app`.

### Зависимости

**Runtime:** только `react`, `react-dom`.  
**Нет:** роутера, UI-библиотек, form libraries, animation libs (Framer Motion и т.п.), i18n, backend/API.

Вся логика и разметка сосредоточены в **одном файле** `src/App.tsx` (~560 строк).

---

## 3. Структура проекта

```
reference_site/
├── AGENTS.md / CLAUDE.md     # инструкции для AI в Figma Make
├── index.html                # Vite shell
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts            # React + Tailwind + Figma plugins
├── .figma/make/site.json
└── src/
    ├── main.tsx              # entry, StrictMode
    ├── App.tsx               # весь UI (Nav, Hero, About, Music, Booking, Gallery, Contact)
    ├── index.css             # fonts, theme tokens, grain, scrollbar
    ├── vite-env.d.ts
    └── imports/pasted_text/
        └── alexey-bashilov-portfolio.html   # исходный design brief / prompt
```

**Смежные ассеты вне `reference_site`:** папка `Ref_photo/` в корне `main_project` — реальные фото (концерты, портреты с гитарой, студия, обложка). В референсном коде **не подключены** — используются Unsplash URL.

---

## 4. Дизайн-система

### 4.1 Цвета (design tokens)

Определены в `src/index.css` через `@theme inline` и продублированы inline в JSX:

| Токен | Hex | Роль |
|-------|-----|------|
| `background` | `#0F0F0F` | Основной фон |
| `surface` | `#1A1A1A` | Карточки, блоки |
| — | `#111111` / `#161616` / `#0A0A0A` | Вариации секций (Music, Gallery) |
| `text-primary` | `#F2F0EB` | Заголовки, основной текст |
| `text-secondary` | `#A8A39A` | Вторичный текст, body |
| `accent` | `#C45C3A` | CTA, labels, акценты (тёплый terracotta) |
| `accent-warm` | `#8B7355` | «Дерево гитары», вторичный акцент |
| `border` | `#2E2E2E` | Разделители, рамки, grid-gaps |

### 4.2 Типографика

| Роль | Шрифт | Применение |
|------|-------|------------|
| Headings | **Space Grotesk** (400–700) | h1–h6, логотип, CTA, stats numbers |
| Body / UI | **Inter** (300–600) | body, labels, form, nav |
| Emotional / quotes | **Instrument Serif** (italic) | цитаты, song mood, «Guitar · Voice · Live» |

**Паттерны:**
- Labels секций: `text-xs`, `tracking-[0.3em]`, uppercase, accent color
- Hero title: до `text-8xl`, tight letter-spacing `-0.02em`
- Section titles: `text-3xl` → `text-5xl`
- Body: `text-sm` / `text-base`, relaxed line-height

### 4.3 Визуальные эффекты

1. **Grain overlay** (класс `.grain`) — SVG fractal noise, opacity ~0.04, `mix-blend-mode: overlay` (Hero, Music).
2. **Photo treatment:** desaturate / grayscale / brightness filters на `<img>` (не raw stock look).
3. **Градиенты поверх hero:** bottom dark wash + left vignette.
4. **Warm wash** на about portrait (gradient `#8B7355` opacity).
5. **Card grid** через `gap-px` + border color background (тонкие 1px «швы»).
6. **Hover:** scale на CTA (`hover:scale-105`), zoom на gallery images (`scale-105`, 700ms), color transitions на links.
7. **Scrollbar:** 4px, dark track, warm thumb on hover.
8. **scroll-behavior: smooth** на `html`.

### 4.4 Компоненты UI (неформальная система)

- **Primary button:** solid `#C45C3A`, text `#F2F0EB`, rounded, hover lift/scale/brightness.
- **Secondary link:** muted text + accent arrow `→`.
- **Nav CTA «Book»:** compact accent button (desktop only nav).
- **Cards:** surface `#1A1A1A`, hover slightly lighter `#1E1E1E`.
- **Tags/chips:** pill, `#2E2E2E` bg.
- **Form inputs:** dark `#111`, border `#2E2E2E`, focus border accent.
- **Stats grid:** 2×2, number in accent, label muted uppercase.

### 4.5 Spacing / layout

- Container: `max-w-7xl`, `px-6 md:px-10`
- Section vertical: `py-24 md:py-36`
- Desktop: 2-col (About, Music, Contact), 3-col (Booking formats)
- Mobile: stack, generous padding
- Nav: fixed, h-16; transparent → blur + solid + bottom border after scroll > 60px

---

## 5. Информационная архитектура (секции)

Одностраничный scroll с якорной навигацией:

| # | ID / секция | Компонент | Содержание |
|---|-------------|-----------|------------|
| 0 | Fixed header | `Nav` | Logo «BASHILOV», links About/Music/Live/Gallery/Contact, CTA Book |
| 1 | Hero (full viewport) | `Hero` | BG photo, name, tagline, stats line, CTA + secondary link, scroll indicator |
| 2 | `#about` | `About` | Portrait + copy + quote + 4 stats |
| 3 | `#music` | `Music` | Originals list + Covers block + tags + soft CTA |
| 4 | `#live` | `Booking` | 3 format cards + 3 process steps + CTA |
| 5 | `#gallery` | `Gallery` | Masonry (CSS columns) 6 photos |
| 6 | `#contact` + footer | `Contact` | Copy + Telegram/location + form; footer name/socials/© |

### 5.1 Hero

- **Visual:** full-bleed Unsplash, `saturate(0.6) brightness(0.55)` + gradients.
- **Copy:**
  - Eyebrow (serif italic accent): `Guitar · Voice · Live`
  - H1: `Alexey Bashilov` (line break)
  - Sub: Original songs & carefully chosen covers / 250+ live performances
  - Primary CTA → `#contact`: «Book a performance»
  - Secondary → `#gallery`: «Watch live videos →» *(якорь на gallery, не на видео — разрыв смысла)*
- Scroll indicator: thin vertical gradient line, pulse.

### 5.2 About

- **Heading:** «Living sound. Real stage.»
- **Quote:** *«Every performance is a conversation — between the music, the room, and the moment.»*
- **Bio:** 15 years, 250+ shows (bars → private/corporate), originals + covers (Western alt + Russian rock), own gear, atmosphere by moment.
- **Stats:**
  - 15+ Years on stage  
  - 250+ Live performances  
  - 2 Languages — RU & EN  
  - ∞ Repertoire on request  

### 5.3 Music

**A. Original songs** (placeholder tracks):

| # | Title | Duration |
|---|-------|----------|
| 01 | Тишина после | 4:12 |
| 02 | Cold Shore | 3:47 |
| 03 | Осколки | 5:03 |

Play icon `▷` — **без реального audio player / ссылок**.

**B. Covers & atmosphere**  
Упомянутые артисты: System of a Down, Nirvana, Radiohead, The Cure, The Beatles, Кино, Би-2, Звери, Король и Шут.  
Tags: Alternative Rock, Classic Rock, Russian Rock, Indie, Post-punk, Acoustic.  
Note: full repertoire on request, program tailored to event. Soft link to contact.

### 5.4 Live / Booking

**Formats:**
1. Acoustic sets — intimate, bars/restaurants/dinners  
2. Electric full sets — energy, stage presence  
3. Private events — birthdays, anniversaries, corporate  

**Process:**
1. Write about date and format  
2. Discuss repertoire and mood  
3. Confirm and prepare the set  

CTA: «Discuss your event» → `#contact`

### 5.5 Gallery

- CSS multi-column masonry (`columns-2 md:columns-3`)
- 6 Unsplash stock images (не фото Алексея)
- Alternating filters (grayscale every 3rd-ish)
- Hover zoom only, no captions, no lightbox, no video

### 5.6 Contact + Footer

**Left:**
- «Let's talk.»
- Invite: date, place, mood, special requests
- Preferred: Telegram (no real @username)
- Location: Moscow & tours

**Form fields:** Name*, Event date, Format (select), Message  
Submit: client-only `setSent(true)` — **нет backend / email / Telegram API**

**Success state:** «Message received.»

**Footer:** Alexey Bashilov · Telegram / VK / YouTube (href `#`) · © 2026

---

## 6. Контент-бриф (из `alexey-bashilov-portfolio.html`)

Исходный промпт для Figma Make полностью задаёт:

1. Mood & anti-patterns  
2. Design system (цвета, шрифты, кнопки, grain)  
3. Точную структуру 6 секций  
4. Требования к фото: large, emotional, slightly desaturated; mix color live + B&W studio; «real and lived-in»  
5. Mobile-first, strong hierarchy, emotional consistency  

Реализация в `App.tsx` **в целом соответствует** брифу с небольшими отклонениями (см. §8).

---

## 7. UX / взаимодействие

| Паттерн | Реализация |
|---------|------------|
| Якорная навигация | `href="#about"` и т.д. |
| Sticky nav | Fixed + scroll state |
| Mobile nav | **Скрыта** (`hidden md:flex`) — на mobile только logo, без меню/бургер |
| Form | Controlled React state, preventDefault, fake success |
| Accessibility | Частично: alt на img, labels у form; нет skip link (в site.json `addBypassLinks: false`); нет focus-visible system; decorative emoji-icons |
| SEO | robots noindex; title/description через Figma site.json (description generic, не про музыканта) |
| i18n | **Только English UI**; имена треков/артистов частично RU |
| Performance | Внешние Unsplash + Google Fonts; нет lazy loading / srcset / local assets |

---

## 8. Соответствие брифу vs фактическая реализация

| Элемент брифа | Статус |
|---------------|--------|
| Dark cinematic minimalism | ✅ |
| Design tokens / fonts | ✅ |
| 6 секций single page | ✅ |
| Grain, generous spacing | ✅ |
| Stats / repertoire / formats | ✅ |
| Contact form fields | ✅ |
| Реальные фото артиста | ❌ Unsplash placeholders |
| Watch live videos | ❌ Ссылка ведёт на Gallery, видео нет |
| Audio play originals | ❌ UI-only play icon |
| Telegram / social real links | ❌ `#` / без username |
| Form submission | ❌ mock only |
| Mobile navigation | ⚠️ нет menu на mobile |
| Secondary outline buttons | ⚠️ в основном text-links |
| Captions on gallery | ❌ отсутствуют (бриф: very small muted) |
| Logo top-left in hero | ⚠️ logo в fixed nav, не отдельно в hero |

---

## 9. Сильные стороны референса (что переносить в прод)

1. **Цельная атмосфера** — palette + type + grain + photo filters создают узнаваемый artist brand.
2. **Простая IA** — один scroll, понятный путь: who → music → formats → proof (gallery) → contact.
3. **Сильная типографическая иерархия** — labels → display → body → muted.
4. **Карточный «gap-px» паттерн** — аккуратные dark UI блоки без тяжёлых теней.
5. **Контентные крючки** — цифры (15+, 250+), цитата, dual repertoire (RU/EN rock), process steps.
6. **CTA-цепочка** — Book / Discuss / Just tell me / Send → всегда к контакту.
7. **Минимальный tech surface** — легко переписать на любой стек, сохранив дизайн.

---

## 10. Пробелы и риски для продакшена

### Контент
- Placeholder треки (нужны реальные названия / ссылки Bandcamp, VK, YouTube, SoundCloud).
- Stock-фото вместо `Ref_photo/` (портреты, концерт, студия).
- Нет реальных social/Telegram handles.
- Нет видео (YouTube embed / reels).
- Нет прайса, FAQ, географии детально, rider/tech requirements (может быть ок для artist-statement подхода).

### Функциональность
- Форма не отправляет данные.
- Нет cookie/privacy, analytics (кроме optional GA slot в Figma config).
- Mobile nav отсутствует.
- Нет lightbox / zoom gallery, нет keyboard trap considerations.

### Техдолг / scaffold
- Monolithic `App.tsx` — для роста лучше разбить на компоненты/секции.
- Inline styles + Tailwind mix — дублирование токенов.
- Figma Make plugins в `vite.config` — при выносе из Figma упростить конфиг.
- `site.json` description нерелевантен («Analyzes HTML file prompts…»).
- `lang` placeholder / English-only — целевая аудитория может быть RU-first (Moscow).

### Бренд / локализация
- Имя: Alexey (EN) vs Алексей; логотип BASHILOV.
- Решение: RU site / EN site / bilingual — в референсе не заложено.

---

## 11. Связь с `Ref_photo/` (реальные ассеты проекта)

| Файл | Вероятное использование на лендинге |
|------|-------------------------------------|
| `portrait_guitar_1…5.jpg` | About, Gallery, Hero candidates |
| `concert_room_0/1.jpg` | Hero / Gallery live atmosphere |
| `studio_room.webp`, `studio_room_2.webp` | About / Gallery studio mood |
| `album_cover.webp` | Music section visual / OG image |

Рекомендация при сборке боевого сайта: заменить Unsplash, применить ту же desaturate/contrast обработку (CSS или preprocess), подготовить WebP + responsive sizes.

---

## 12. Рекомендуемый checklist для реализации «боевого» сайта

На базе этого референса:

1. **Сохранить** design tokens, section order, tone of voice, CTA hierarchy.  
2. **Подключить** реальные фото из `Ref_photo/`, OG image, favicon.  
3. **Заменить** mock form → Telegram bot / email / Formspree / backend.  
4. **Добавить** реальные ссылки: Telegram, VK, YouTube (+ embeds).  
5. **Решить** originals: audio players или deep links.  
6. **Mobile nav** (burger / bottom sheet).  
7. **Локализация** (RU primary или bilingual).  
8. **SEO:** title, description, Open Graph, indexable robots.  
9. **Вычистить** Figma-only tooling если деплой вне Make.  
10. **Опционально:** lightbox, sticky Book CTA on mobile, reduced-motion.

---

## 13. Краткая выжимка для AI / разработки

```
PROJECT: One-page dark cinematic portfolio for guitarist-vocalist Alexey Bashilov.
STACK (ref): React 19 + Vite 8 + Tailwind 4 + TypeScript (Figma Make origin).
MOOD: intimate, melancholic strength, rock, minimal, grain, warm wood + cold stage.
COLORS: bg #0F0F0F | surface #1A1A1A | text #F2F0EB / #A8A39A | accent #C45C3A | warm #8B7355 | border #2E2E2E
FONTS: Space Grotesk (H) | Inter (body) | Instrument Serif (quotes)
SECTIONS: Nav → Hero → About → Music → Live/Booking → Gallery → Contact/Footer
CTAs: Book a performance / Discuss your event / Send message → contact
CONTENT HOOKS: 15+ years, 250+ shows, RU+EN repertoire, own gear, Moscow & tours, Telegram preferred
GAPS: Unsplash not real photos, mock form, no real socials/audio/video, no mobile nav, EN-only UI
REAL ASSETS: ../Ref_photo/* (portraits, concert, studio, album cover)
GOAL: artist statement first, booking second — not corporate hire-a-musician template.
```

---

## 14. Файлы-источники анализа

| Файл | Роль |
|------|------|
| `reference_site/src/App.tsx` | Полная реализация UI |
| `reference_site/src/index.css` | Tokens, fonts, grain, scrollbar |
| `reference_site/src/imports/pasted_text/alexey-bashilov-portfolio.html` | Design & content brief |
| `reference_site/package.json` | Dependencies & scripts |
| `reference_site/vite.config.ts` | Build / Figma plugins |
| `reference_site/AGENTS.md` | Project conventions for AI |
| `reference_site/.figma/make/site.json` | Site meta (noindex) |
| `Ref_photo/` | Реальные фото для продакшена |

---

*Документ подготовлен как контекст для дальнейшей разработки / редизайна сайта Алексея Башилова на основе референса `reference_site`.*
