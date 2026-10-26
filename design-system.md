# Design system — Alexey Bashilov landing

Снимок **v1.1.0**, 2026-10-26. Это текущая система прода, не референс и не черновик из восьми тем.

Цвета задаются на `html[data-theme]`. Код: `src/index.css`, `src/theme.ts`.  
Тема по умолчанию: **Clean** (`clean-light`). Вторая тема: **Ember** (`ember`).

Старые id в `localStorage` (`bashilov-theme`) схлопываются в эти две. Светлые (`warm-acoustic`, `soft-golden`, `mist`, `sage`) → Clean. Тёмные (`dark-rock`, `mocha`) → Ember. Сами палитры из `re-design/coolors_*.scss` в CSS больше не живут. Папка `re-design/` в git не входит.

Шрифты: **Space Grotesk** (заголовки, кнопки), **Inter** (текст), **Instrument Serif** (цитаты, мягкие фразы). Кикеры секций — системный monospace.

---

## Роли токенов

| Токен | Назначение |
|-------|------------|
| `--bg-primary` | Основной фон, Hero / About / Live / Contact |
| `--bg-secondary` | Вторичная поверхность |
| `--bg-muted` | Music и Gallery |
| `--surface-alt` | Блок каверов |
| `--card-bg` | Карточки |
| `--text-primary` | Заголовки, логотип |
| `--text-secondary` | Текст, приглушённые ссылки |
| `--accent` | Заливка кнопок, focus |
| `--accent-hover` | Hover кнопок |
| `--accent-ink` | Акцент как цвет текста. Если не задан, берётся `--accent` |
| `--accent-warm` | Второй акцент |
| `--kicker` | Цвет кикера секции. Если не задан, берётся `--accent` |
| `--border` | Рамки, швы `gap-px`, scrollbar |
| `--btn-text` | Текст на акцентной кнопке |
| `--input-bg` | Поля формы |
| `--nav-scrolled` | Фон шапки после скролла |
| `--hero-scrim`, `--hero-side-mix`, `--hero-bottom-solid` | Туман Hero |
| `--grain-opacity` | Сила зерна |
| `--color-scheme` | `light` / `dark` для нативных контролов |
| `--anchor-paper`, `--anchor-ink`, `--anchor-ink-soft`, `--anchor-accent`, `--anchor-accent-warm` | Те же hex, что у темы. Нужны для инверсии секции и не переопределяются на `.section-flip` |

---

## Clean (`clean-light`) — по умолчанию

Светлая бумага, лесной зелёный акцент.

| Токен | Hex |
|-------|-----|
| `--bg-primary` / `--anchor-paper` | `#f8f7f4` |
| `--bg-secondary`, `--card-bg`, `--input-bg` | `#ffffff` |
| `--bg-muted` | `#f0eee9` |
| `--surface-alt` | `#fafaf8` |
| `--text-primary` / `--anchor-ink` | `#1a1a1a` |
| `--text-secondary` / `--anchor-ink-soft` | `#5c5c5c` |
| `--accent` / `--anchor-accent` | `#2f5d50` |
| `--accent-hover` | `#3a7264` |
| `--accent-warm` / `--anchor-accent-warm` | `#5a7a6e` |
| `--border` | `#e5e2dc` |
| `--btn-text` | `#f8f7f4` |
| `--nav-scrolled` | `rgba(248, 247, 244, 0.92)` |
| `--hero-scrim` | `rgba(248, 247, 244, 0.22)` |
| `--hero-side-mix` | `28%` |
| `--hero-bottom-solid` | `72%` |
| `--grain-opacity` | `0.025` |
| `--color-scheme` | `light` |

Настроение: спокойная бумага, студийный зелёный, живой музыкант без неона.

---

## Ember (`ember`)

Ночной olive и тёплый янтарь. Это вторая тема переключателя, не «тёмная полоса» внутри Clean.

| Токен | Hex |
|-------|-----|
| `--bg-primary` / `--anchor-ink` | `#141204` |
| `--bg-secondary`, `--card-bg` | `#262a10` |
| `--bg-muted` | `#1a1d0a` |
| `--surface-alt` | `#1f220e` |
| `--text-primary` / `--anchor-paper` | `#f2e6d4` |
| `--text-secondary` | `#c4a07a` |
| `--accent` / `--anchor-accent` | `#e8985e` |
| `--accent-hover` | `#f0a870` |
| `--accent-warm` / `--anchor-accent-warm` | `#a9714b` |
| `--border` / `--anchor-ink-soft` | `#54442b` |
| `--btn-text` | `#141204` |
| `--input-bg` | `#1a1d0a` |
| `--nav-scrolled` | `rgba(20, 18, 4, 0.92)` |
| `--hero-scrim` | `rgba(20, 18, 4, 0.55)` |
| `--hero-side-mix` | `60%` |
| `--hero-bottom-solid` | `100%` |
| `--grain-opacity` | `0.04` |
| `--color-scheme` | `dark` |

Пока шапка прозрачная, ссылки Ember светлее фото: градиент и тень в `[data-theme='ember'] .site-header`.

---

## Инверсия секций

Класс `section-flip` на `#music` и `#gallery`. Остальные секции остаются в базовой теме.

На Clean эти две секции тёмные: фон из `--anchor-ink`, текст из `--anchor-paper`. Кнопки по-прежнему `#2f5d50`. Для подписей задаётся `--accent-ink` и `--kicker` — смесь акцента с бумагой, чтобы зелёный читался на чёрном.

На Ember те же секции светлеют до крема `--anchor-paper`, текст становится `--anchor-ink`. Акцент кнопок остаётся `#e8985e`.

Новых брендовых цветов нет: поверхности собраны через `color-mix` из якорей темы. На самой секции выставляется `color: var(--text-primary)`, чтобы вложенный текст наследовал уже инвертированный цвет.

---

## Движение

Всё уважает `prefers-reduced-motion`. Без класса `js` на `<html>` скрытия нет.

| Приём | Где |
|-------|-----|
| Очередь строк hero | `.hero-seq__item` |
| Reveal | `[data-reveal]`, задержка `--d` |
| Галерея | `.reveal-fade`: только opacity |
| Color window | `[data-color]` / `.color-window` |
| Tilt | `.tilt`, портрет ещё `.tilt-photo` |
| Успех формы | `.form-success` |

Зерно — `.grain`. На инверсной тёмной секции blend mode другой, чем на светлой, чтобы шум не пропадал.

---

## Секции

Один экран, якоря: `#about`, `#music`, `#live`, `#gallery`, `#contact`.

Hero: `public/photos/studio_room_22.webp`.  
Портрет: `portrait_guitar_3.jpg`.  
Галерея: `portrait_guitar_1.jpg`, `portrait_guitar_2.jpg`, `portrait_guitar_4.jpg`, `album_cover.webp`, `studio_room_2.webp`, `portrait_guitar_5.jpg`, `concert_room_0.jpg`, `concert_room_1.jpg`.

Язык: `src/i18n.ts`, ключ `bashilov-lang`, по умолчанию `ru`. Рядом с темой в шапке.

---

## Что не является системой сайта

- `dsgn_modules/` — чужие текстовые сниппеты эффектов. В страницу не встроены.
- `reference_site/`, `Ref_photo/`, `re-design/` — локальные исходники, в gitignore.
