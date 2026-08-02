# Design system — Alexey Bashilov landing

Цвета задаются CSS-переменными на `html[data-theme="…"]` (см. `src/index.css`).  
Тема по умолчанию: **Warm Acoustic** (`warm-acoustic`).

---

## Общие роли токенов

| Токен | Назначение |
|-------|------------|
| `--bg-primary` | Основной фон страницы, секции Hero / About / Live / Contact |
| `--bg-secondary` | Вторичный «плоский» фон (карточки-поверхности, контраст к primary) |
| `--bg-muted` | Приглушённый фон секций Music и Gallery |
| `--surface-alt` | Альтернативная поверхность (блок Covers в Music) |
| `--card-bg` | Фон карточек: stats, booking formats, contact info, gallery placeholders |
| `--text-primary` | Заголовки, основной акцентный текст, логотип, имена |
| `--text-secondary` | Body-текст, labels, muted links, подписи |
| `--accent` | CTA, section labels, иконки, активный пункт theme switcher, focus полей |
| `--accent-hover` | Hover для кнопок и accent-ссылок |
| `--accent-warm` | Вторичный «тёплый» акцент (Covers label, location icon, scrollbar hover) |
| `--border` | Разделители, рамки карточек/форм, сетка gap-px, scrollbar thumb |
| `--btn-text` | Текст на accent-кнопках |
| `--input-bg` | Фон input / select / textarea |
| `--nav-scrolled` | Фон sticky header после скролла |
| `--hero-scrim` | Прозрачный слой градиента Hero (связка фото → `--bg-primary`) |
| `--grain-opacity` | Сила grain-оверлея |
| `--color-scheme` | `light` / `dark` — native UI (date picker и т.п.) |

---

## Theme 1 — Dark Rock (`dark-rock`)

Тёмная cinematic-палитра исходного референса.

| Токен | Hex | Для чего |
|-------|-----|----------|
| `--bg-primary` | `#0F0F0F` | Основной фон сайта и секций |
| `--bg-secondary` | `#1A1A1A` | Вторичные поверхности |
| `--bg-muted` | `#111111` | Music, Gallery — чуть отличный тёмный слой |
| `--surface-alt` | `#161616` | Блок Covers & atmosphere |
| `--card-bg` | `#1A1A1A` | Карточки, stats, contact blocks |
| `--text-primary` | `#F2F0EB` | Заголовки, основной светлый текст |
| `--text-secondary` | `#A8A39A` | Вторичный текст, body, nav links |
| `--accent` | `#C45C3A` | CTA, labels, активная тема, play-иконки |
| `--accent-hover` | `#D4785A` | Hover кнопок и accent-ссылок |
| `--accent-warm` | `#8B7355` | «Дерево гитары», soft-акценты |
| `--border` | `#2E2E2E` | Границы, швы сеток, scrollbar |
| `--btn-text` | `#F2F0EB` | Текст на terracotta-кнопках |
| `--input-bg` | `#111111` | Поля формы |
| `--nav-scrolled` | `rgba(15,15,15,0.92)` | Header при скролле |
| `--hero-scrim` | `rgba(15,15,15,0.55)` | Затемнение Hero-градиента |
| `--color-scheme` | `dark` | Тёмные native-контролы |

**Настроение:** intimate stage, high contrast, rock minimalism.

---

## Theme 2 — Warm Acoustic (`warm-acoustic`) — default

Светлая тёплая палитра «акустика / бумага / дерево».

| Токен | Hex | Для чего |
|-------|-----|----------|
| `--bg-primary` | `#F7F4EF` | Основной кремовый фон |
| `--bg-secondary` | `#FFFFFF` | Чистые белые поверхности |
| `--bg-muted` | `#EFEAE3` | Music, Gallery — тёплый off-white |
| `--surface-alt` | `#FAF8F4` | Блок Covers |
| `--card-bg` | `#FFFFFF` | Карточки на кремовом фоне |
| `--text-primary` | `#2C2A26` | Тёмно-коричневый основной текст |
| `--text-secondary` | `#6B6560` | Приглушённый body / UI |
| `--accent` | `#B85C38` | Тёплый terracotta CTA |
| `--accent-hover` | `#C96B47` | Hover accent |
| `--accent-warm` | `#8B7355` | Вторичный wood-tone |
| `--border` | `#E5DFD6` | Мягкие светлые границы |
| `--btn-text` | `#FFFDFB` | Текст на accent-кнопках |
| `--input-bg` | `#FFFFFF` | Поля формы |
| `--nav-scrolled` | `rgba(247,244,239,0.92)` | Header при скролле |
| `--hero-scrim` | `rgba(247,244,239,0.55)` | Переход Hero → фон |
| `--color-scheme` | `light` | Светлые native-контролы |

**Настроение:** warm paper, acoustic intimacy, approachable booking.

---

## Theme 3 — Clean Light (`clean-light`)

Светлая «чистая» палитра с холодным зелёным акцентом.

| Токен | Hex | Для чего |
|-------|-----|----------|
| `--bg-primary` | `#F8F7F4` | Основной светло-серый/ivory фон |
| `--bg-secondary` | `#FFFFFF` | Белые поверхности |
| `--bg-muted` | `#F0EEE9` | Music, Gallery |
| `--surface-alt` | `#FAFAF8` | Блок Covers |
| `--card-bg` | `#FFFFFF` | Карточки |
| `--text-primary` | `#1A1A1A` | Почти чёрный основной текст |
| `--text-secondary` | `#5C5C5C` | Серый secondary |
| `--accent` | `#2F5D50` | Глубокий forest-green CTA |
| `--accent-hover` | `#3A7264` | Hover accent |
| `--accent-warm` | `#5A7A6E` | Приглушённый green secondary |
| `--border` | `#E5E2DC` | Нейтральные границы |
| `--btn-text` | `#F8F7F4` | Текст на green-кнопках |
| `--input-bg` | `#FFFFFF` | Поля формы |
| `--nav-scrolled` | `rgba(248,247,244,0.92)` | Header при скролле |
| `--hero-scrim` | `rgba(248,247,244,0.55)` | Переход Hero → фон |
| `--color-scheme` | `light` | Светлые native-контролы |

**Настроение:** calm, editorial, studio/clean professional.

---

## Theme 4 — Soft Golden (`soft-golden`)

Мягкая золотистая светлая палитра.

| Токен | Hex | Для чего |
|-------|-----|----------|
| `--bg-primary` | `#F5F1EB` | Основной sand/beige фон |
| `--bg-secondary` | `#FFFCF7` | Тёплый off-white |
| `--bg-muted` | `#EBE4DA` | Music, Gallery |
| `--surface-alt` | `#FAF6F0` | Блок Covers |
| `--card-bg` | `#FFFCF7` | Карточки в soft cream |
| `--text-primary` | `#2A2622` | Тёплый тёмный текст |
| `--text-secondary` | `#6F675F` | Muted taupe body |
| `--accent` | `#A67C52` | Золотисто-коричневый CTA |
| `--accent-hover` | `#B8906A` | Hover accent |
| `--accent-warm` | `#9A8568` | Secondary gold/wood |
| `--border` | `#E8E0D5` | Мягкие sand-границы |
| `--btn-text` | `#FFFCF7` | Текст на golden-кнопках |
| `--input-bg` | `#FFFCF7` | Поля формы |
| `--nav-scrolled` | `rgba(245,241,235,0.92)` | Header при скролле |
| `--hero-scrim` | `rgba(245,241,235,0.55)` | Переход Hero → фон |
| `--color-scheme` | `light` | Светлые native-контролы |

**Настроение:** soft golden hour, album-cover warmth, gentle premium.

---

## Theme 5 — Mist (`mist`)

Источник: `re-design/coolors_1.scss`  
Палитра Coolors: grey-olive · granite · khaki-beige · silver · lavender.

| Токен | Hex | Источник / роль |
|-------|-----|-----------------|
| `--bg-primary` | `#E8E4F2` | Осветлённый lavender — основной фон |
| `--bg-secondary` | `#F4F2F9` | Почти-белый с violet cast |
| `--bg-muted` | `#DAD4EF` | **lavender** — Music / Gallery |
| `--surface-alt` | `#EFEAF5` | Мягкий violet surface (Covers) |
| `--card-bg` | `#F7F5FB` | Карточки на mist-фоне |
| `--text-primary` | `#2C3535` | Углублённый **granite** — заголовки |
| `--text-secondary` | `#586A6A` | **granite** — body / muted UI |
| `--accent` | `#586A6A` | **granite** — CTA, labels, active switcher |
| `--accent-hover` | `#6A7E7E` | Осветлённый granite |
| `--accent-warm` | `#B9A394` | **khaki-beige** — soft secondary |
| `--border` | `#D4C5C7` | **silver** — границы |
| `--btn-text` | `#F7F6FB` | Текст на accent-кнопках |
| `--input-bg` | `#F7F5FB` | Поля формы |
| `--nav-scrolled` | `rgba(232,228,242,0.92)` | Header при скролле |
| `--hero-scrim` | `rgba(232,228,242,0.55)` | Hero-градиент |
| `--color-scheme` | `light` | Native light UI |

**Настроение:** cool lavender mist, soft studio haze, muted grey-olive calm.

---

## Theme 6 — Sage (`sage`)

Источник: `re-design/coolors_2.scss`  
Палитра Coolors: sand-dune · almond-silk · dry-sage · grey-olive · blue-slate.

| Токен | Hex | Источник / роль |
|-------|-----|-----------------|
| `--bg-primary` | `#EAE0CC` | **sand-dune** — основной песочный фон |
| `--bg-secondary` | `#F4EFE4` | Осветлённый sand |
| `--bg-muted` | `#DFD4BC` | Приглушённый dune (Music / Gallery) |
| `--surface-alt` | `#EFE6D6` | Тёплый alt surface |
| `--card-bg` | `#F7F2E8` | Карточки |
| `--text-primary` | `#2A3A3C` | Углублённый **blue-slate** — заголовки |
| `--text-secondary` | `#4D6A6D` | **blue-slate** — body |
| `--accent` | `#4D6A6D` | **blue-slate** — CTA, labels |
| `--accent-hover` | `#5D7E81` | Осветлённый slate |
| `--accent-warm` | `#A0A083` | **dry-sage** — secondary accent |
| `--border` | `#C9ADA1` | **almond-silk** — границы |
| `--btn-text` | `#F4EFE4` | Текст на slate-кнопках |
| `--input-bg` | `#F7F2E8` | Поля формы |
| `--nav-scrolled` | `rgba(234,224,204,0.92)` | Header при скролле |
| `--hero-scrim` | `rgba(234,224,204,0.55)` | Hero-градиент |
| `--color-scheme` | `light` | Native light UI |

**Настроение:** Mediterranean sand + sage olive, coastal acoustic lounge.

---

## Theme 7 — Ember (`ember`)

Источник: `re-design/coolors_3.scss`  
Палитра Coolors: pitch-black · dark-khaki · dark-khaki-2 · cinnamon-wood · toasted-almond.

| Токен | Hex | Источник / роль |
|-------|-----|-----------------|
| `--bg-primary` | `#141204` | **pitch-black** — почти чёрный olive base |
| `--bg-secondary` | `#262A10` | **dark-khaki** — вторичный dark surface |
| `--bg-muted` | `#1A1D0A` | Между pitch и khaki (Music / Gallery) |
| `--surface-alt` | `#1F220E` | Alt surface для Covers |
| `--card-bg` | `#262A10` | **dark-khaki** — карточки |
| `--text-primary` | `#F2E6D4` | Светлый cream (расширение almond) |
| `--text-secondary` | `#C4A07A` | Между **cinnamon** и **almond** — body |
| `--accent` | `#E8985E` | **toasted-almond** — CTA / glow |
| `--accent-hover` | `#F0A870` | Осветлённый almond |
| `--accent-warm` | `#A9714B` | **cinnamon-wood** — secondary |
| `--border` | `#54442B` | **dark-khaki-2** — границы |
| `--btn-text` | `#141204` | Тёмный текст на almond-кнопках |
| `--input-bg` | `#1A1D0A` | Поля формы |
| `--nav-scrolled` | `rgba(20,18,4,0.92)` | Header при скролле |
| `--hero-scrim` | `rgba(20,18,4,0.55)` | Hero-градиент |
| `--color-scheme` | `dark` | Native dark UI |

**Настроение:** forest-stage night, olive ash, warm ember glow on dark khaki.

---

## Theme 8 — Mocha (`mocha`)

Источник: `re-design/coolors_4.scss`  
Палитра Coolors: shadow-grey · dim-grey · bone · charcoal · deep-mocha · graphite.

| Токен | Hex | Источник / роль |
|-------|-----|-----------------|
| `--bg-primary` | `#1E1C20` | **shadow-grey** — основной фон |
| `--bg-secondary` | `#362D28` | **deep-mocha** — вторичный brown-dark |
| `--bg-muted` | `#252226` | Между shadow и graphite |
| `--surface-alt` | `#2A2524` | Alt surface |
| `--card-bg` | `#373333` | **graphite** — карточки |
| `--text-primary` | `#EEE3D0` | **bone** — заголовки |
| `--text-secondary` | `#75685D` | **dim-grey** — body |
| `--accent` | `#A89078` | Bone + dim mix — CTA (расширение палитры) |
| `--accent-hover` | `#BCA48C` | Hover accent |
| `--accent-warm` | `#75685D` | **dim-grey** — secondary |
| `--border` | `#58595B` | **charcoal** — границы |
| `--btn-text` | `#1E1C20` | Тёмный текст на warm accent |
| `--input-bg` | `#252226` | Поля формы |
| `--nav-scrolled` | `rgba(30,28,32,0.92)` | Header при скролле |
| `--hero-scrim` | `rgba(30,28,32,0.55)` | Hero-градиент |
| `--color-scheme` | `dark` | Native dark UI |

**Настроение:** bone-on-mocha, vinyl café, graphite night with warm dim-grey.

---

## Где токены встречаются в UI

| Элемент | Основные токены |
|---------|-----------------|
| Sticky header / logo | `--text-primary`, `--nav-scrolled`, `--border` |
| Theme switcher (active) | `--accent`, `--btn-text`, `--border`, `--card-bg` |
| Hero text + CTA | `--text-primary`, `--text-secondary`, `--accent`, `--btn-text` |
| Section labels («About», «Music»…) | `--accent` |
| Cards / stats / booking | `--card-bg`, `--border`, `--text-*` |
| Primary buttons | `--accent` → hover `--accent-hover`, text `--btn-text` |
| Form fields | `--input-bg`, `--border`, focus `--accent` |
| Footer links | `--text-secondary` → hover `--accent` |
| Scrollbar | track `--bg-primary`, thumb `--border`, hover `--accent-warm` |

---

## Переключение

- UI: segmented control в header — **8 вариантов**:  
  `1 · Dark` · `2 · Warm` · `3 · Clean` · `4 · Soft` · `5 · Mist` · `6 · Sage` · `7 · Ember` · `8 · Mocha`
- Хранение: `localStorage` → ключ `bashilov-theme`
- Атрибут: `document.documentElement[data-theme]`
- Код: `src/theme.ts`, стили: `src/index.css`
- Исходники новых палитр: `re-design/coolors_1…4.scss`
