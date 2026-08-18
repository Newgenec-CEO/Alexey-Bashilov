export const THEME_STORAGE_KEY = 'bashilov-theme'

/** Clean = light, Ember = dark */
export const THEMES = [
  { id: 'clean-light', mode: 'light', ariaLabel: 'Light theme' },
  { id: 'ember', mode: 'dark', ariaLabel: 'Dark theme' },
] as const

export type ThemeId = (typeof THEMES)[number]['id']

export const DEFAULT_THEME: ThemeId = 'clean-light'
export const LIGHT_THEME: ThemeId = 'clean-light'
export const DARK_THEME: ThemeId = 'ember'

const LEGACY_TO_THEME: Record<string, ThemeId> = {
  'clean-light': 'clean-light',
  ember: 'ember',
  // former light themes → Clean
  'warm-acoustic': 'clean-light',
  'soft-golden': 'clean-light',
  mist: 'clean-light',
  sage: 'clean-light',
  // former dark themes → Ember
  'dark-rock': 'ember',
  mocha: 'ember',
}

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return THEMES.some((t) => t.id === value)
}

export function resolveThemeId(value: string | null | undefined): ThemeId {
  if (!value) return DEFAULT_THEME
  if (isThemeId(value)) return value
  return LEGACY_TO_THEME[value] ?? DEFAULT_THEME
}

export function getStoredTheme(): ThemeId {
  try {
    return resolveThemeId(localStorage.getItem(THEME_STORAGE_KEY))
  } catch {
    return DEFAULT_THEME
  }
}

export function applyTheme(theme: ThemeId) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function setStoredTheme(theme: ThemeId) {
  applyTheme(theme)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}
