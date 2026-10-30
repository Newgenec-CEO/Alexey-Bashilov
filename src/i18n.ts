export const LANG_STORAGE_KEY = 'bashilov-lang'

export const LOCALES = [
  { id: 'en', label: 'EN', ariaLabel: 'English' },
  { id: 'ru', label: 'RU', ariaLabel: 'Русский' },
] as const

export type LocaleId = (typeof LOCALES)[number]['id']

export const DEFAULT_LOCALE: LocaleId = 'ru'

export function isLocaleId(value: string | null | undefined): value is LocaleId {
  return value === 'en' || value === 'ru'
}

export function getStoredLocale(): LocaleId {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY)
    if (isLocaleId(stored)) return stored
  } catch {
    /* ignore */
  }
  try {
    const nav = navigator.language?.toLowerCase() ?? ''
    if (nav.startsWith('ru')) return 'ru'
    if (nav.startsWith('en')) return 'en'
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE
}

export function applyLocale(locale: LocaleId) {
  document.documentElement.setAttribute('lang', locale)
}

export function setStoredLocale(locale: LocaleId) {
  applyLocale(locale)
  try {
    localStorage.setItem(LANG_STORAGE_KEY, locale)
  } catch {
    /* ignore */
  }
}

const en = {
  meta: {
    title: 'Alexey Bashilov — Guitar · Voice · Live',
    description:
      'Alexey Bashilov — guitarist and vocalist. Original songs and carefully chosen covers. 250+ live performances.',
  },
  nav: {
    about: 'About',
    music: 'Music',
    live: 'Live',
    gallery: 'Gallery',
    contact: 'Contact',
    book: 'Book',
    themeGroup: 'Color theme',
    langGroup: 'Language',
  },
  hero: {
    eyebrow: 'Guitar · Voice · Live',
    nameLine1: 'Alexey',
    nameLine2: 'Bashilov',
    lead: 'Original songs & carefully chosen covers.',
    leadStat: '250+ live performances.',
    ctaPrimary: 'Book a performance',
    ctaSecondary: 'Watch live videos',
    imgAlt: 'Alexey Bashilov performing live with acoustic guitar',
  },
  about: {
    label: 'About',
    titleLine1: 'Living sound.',
    titleLine2: 'Real stage.',
    quote:
      '“Every performance is a conversation — between the music, the room, and the moment.”',
    p1: 'Professional guitarist and vocalist with 15 years of experience. More than 250 live shows — from intimate bar sets to private celebrations and corporate events.',
    p2: 'Plays both original material and a wide repertoire of covers spanning Western alternative rock and classic Russian rock. Always brings his own professional equipment and reads the room — creating a warm, emotional or energetic atmosphere depending on the moment.',
    imgAlt: 'Alexey Bashilov portrait',
    facts: {
      years: 'Years on stage',
      shows: 'Live performances',
      languages: 'Languages — RU & EN',
      repertoire: 'Repertoire on request',
    },
  },
  music: {
    label: 'Repertoire',
    title: 'Music',
    sheets: [
      'Russian songs · 1',
      'Russian songs · 2',
      'Foreign songs',
      'Soviet & bard songs',
      'Wartime songs',
      'New Year songs',
    ],
    openSheet: 'Open full size',
    closeSheet: 'Close',
    prevSheet: 'Previous list',
    nextSheet: 'Next list',
    softCta: 'Looking for a specific song or mood?',
    softLink: 'Just tell me.',
  },
  live: {
    label: 'Formats',
    title: 'Live performances',
    how: 'How it works',
    cta: 'Discuss your event',
    formats: [
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
    ],
    steps: [
      'Write about the date and format',
      'Discuss repertoire and mood',
      'Confirm and prepare the set',
    ],
  },
  gallery: {
    label: 'Gallery',
    title: 'On stage',
    alts: [
      'Alexey Bashilov playing acoustic guitar',
      'Studio portrait with Fender acoustic',
      'Electric guitar performance in teal plaid',
      'Outdoor portrait — SUNDER',
      'Intimate acoustic set with mic and amp',
      'Electric guitar studio shot',
      'Seated with acoustic guitar',
      'Songwriting with guitar and notebook',
    ],
  },
  contact: {
    label: 'Contact',
    title: "Let's talk.",
    lead: "Tell me about your event — date, place, desired mood and any special requests. I'll get back to you quickly.",
    preferred: 'Preferred contact',
    location: 'Location',
    locationValue: 'Moscow & tours',
    name: 'Your name',
    namePlaceholder: 'Alexei Ivanov',
    date: 'Event date',
    format: 'Format',
    formatPlaceholder: 'Select a format',
    formatAcoustic: 'Acoustic set',
    formatElectric: 'Full electric set',
    formatPrivate: 'Private event',
    formatOther: 'Other',
    message: 'Message',
    messagePlaceholder: 'Describe your event, mood, venue...',
    submit: 'Send message',
    successTitle: 'Message received.',
    successBody: "I'll be in touch soon. Talk soon.",
    footerName: 'Alexey Bashilov',
  },
} as const

const ru: typeof en = {
  meta: {
    title: 'Алексей Башилов — Гитара · Голос · Live',
    description:
      'Алексей Башилов — гитарист и вокалист. Авторские песни и тщательно подобранные каверы. Более 250 живых выступлений.',
  },
  nav: {
    about: 'Обо мне',
    music: 'Музыка',
    live: 'Концерты',
    gallery: 'Галерея',
    contact: 'Контакт',
    book: 'Заказать',
    themeGroup: 'Цветовая тема',
    langGroup: 'Язык',
  },
  hero: {
    eyebrow: 'Гитара · Голос · Live',
    nameLine1: 'Алексей',
    nameLine2: 'Башилов',
    lead: 'Авторские песни и тщательно подобранные каверы.',
    leadStat: 'Более 250 живых выступлений.',
    ctaPrimary: 'Заказать выступление',
    ctaSecondary: 'Смотреть live-видео',
    imgAlt: 'Алексей Башилов на сцене с акустической гитарой',
  },
  about: {
    label: 'Обо мне',
    titleLine1: 'Живой звук.',
    titleLine2: 'Настоящая сцена.',
    quote:
      '«Каждое выступление — это разговор: между музыкой, пространством и моментом.»',
    p1: 'Профессиональный гитарист и вокалист с 15-летним опытом. Более 250 живых концертов — от камерных сетов в барах до частных праздников и корпоративных вечеров.',
    p2: 'Играет авторский материал и широкий репертуар каверов: от западного альтернативного рока до классики русского рока. Всегда привозит своё профессиональное оборудование и тонко чувствует атмосферу зала — тёплую, эмоциональную или энергичную.',
    imgAlt: 'Портрет Алексея Башилова',
    facts: {
      years: 'Лет на сцене',
      shows: 'Живых выступлений',
      languages: 'Языки — RU и EN',
      repertoire: 'Репертуар по запросу',
    },
  },
  music: {
    label: 'Репертуар',
    title: 'Музыка',
    sheets: [
      'Русские песни · 1',
      'Русские песни · 2',
      'Иностранные песни',
      'Советские и бардовские песни',
      'Военные песни',
      'Новогодние песни',
    ],
    openSheet: 'Открыть крупно',
    closeSheet: 'Закрыть',
    prevSheet: 'Предыдущий список',
    nextSheet: 'Следующий список',
    softCta: 'Нужна конкретная песня или настроение?',
    softLink: 'Просто напишите.',
  },
  live: {
    label: 'Форматы',
    title: 'Живые выступления',
    how: 'Как это работает',
    cta: 'Обсудить ваше событие',
    formats: [
      {
        icon: '♪',
        title: 'Акустические сеты',
        desc: 'Камерная, тёплая атмосфера. Голос и гитара — рядом. Идеально для небольших баров, ресторанов и частных ужинов.',
      },
      {
        icon: '⚡',
        title: 'Электрические сеты',
        desc: 'Энергичное live-выступление с электрогитарой. Шире динамический диапазон, сильнее присутствие на сцене.',
      },
      {
        icon: '◇',
        title: 'Частные события',
        desc: 'Дни рождения, юбилеи, корпоративы. Индивидуальная программа под повод и атмосферу, которую вы хотите создать.',
      },
    ],
    steps: [
      'Напишите о дате и формате',
      'Обсудим репертуар и настроение',
      'Подтвердим и подготовим сет',
    ],
  },
  gallery: {
    label: 'Галерея',
    title: 'На сцене',
    alts: [
      'Алексей Башилов играет на акустической гитаре',
      'Студийный портрет с акустикой Fender',
      'Выступление с электрогитарой',
      'Уличный портрет — SUNDER',
      'Камерный акустический сет с микрофоном и комбиком',
      'Студийный кадр с электрогитарой',
      'С гитарой в сидячей постановке',
      'Работа над песней: гитара и блокнот',
    ],
  },
  contact: {
    label: 'Контакт',
    title: 'Давайте поговорим.',
    lead: 'Расскажите о событии — дата, место, желаемое настроение и особые пожелания. Отвечу быстро.',
    preferred: 'Удобный способ связи',
    location: 'География',
    locationValue: 'Москва и гастроли',
    name: 'Ваше имя',
    namePlaceholder: 'Алексей Иванов',
    date: 'Дата события',
    format: 'Формат',
    formatPlaceholder: 'Выберите формат',
    formatAcoustic: 'Акустический сет',
    formatElectric: 'Электрический сет',
    formatPrivate: 'Частное событие',
    formatOther: 'Другое',
    message: 'Сообщение',
    messagePlaceholder: 'Опишите событие, настроение, площадку...',
    submit: 'Отправить',
    successTitle: 'Сообщение получено.',
    successBody: 'Скоро свяжусь с вами. До скорой встречи.',
    footerName: 'Алексей Башилов',
  },
}

export const messages = { en, ru } as const

export type Messages = typeof en

export function getMessages(locale: LocaleId): Messages {
  return messages[locale]
}
