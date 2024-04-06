import process from 'node:process'

const isDev = process.env.NODE_ENV === 'development'

const apiBaseUrl = '/api'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/supabase',
    'nitro-cloudflare-dev',
    '@nuxt/ui',
  ],
  experimental: {
    viewTransition: false,
    renderJsonPayloads: true,
  },
  routeRules: {
    '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl,
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || '',
    },
    supabase: {
      url: process.env.SUPABASE_URL || '',
      key: process.env.SUPABASE_KEY || '',
    },
  },
  devtools: {
    enabled: true,
  },
  image: {
    domains: [
      'eu-region.b-cdn.net',
      'image.tmdb.org',
      'img.youtube.com',
    ],
    bunny: {
      baseURL: 'https://eu-region.b-cdn.net/',
    },
    alias: {
      b: 'https://eu-region.b-cdn.net/',
      tmdb: 'https://image.tmdb.org/t/p/original/',
      youtube: 'https://img.youtube.com/',
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'jpg',
          width: 50,
          height: 50,
        },
      },
    },
  },
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/user/confirm',
      include: undefined,
      exclude: ['/user/*','/legal/*', '/'],
      cookieRedirect: false,
    },
  },
  nitro: {
    routeRules: {
      '/**': { isr: true, cors: true, swr: true },
      "/api/show/**": { isr: true, swr: true, cache: { maxAge: 24 * 60 * 60 } },
      "/api/person/**": { isr: true, swr: true, cache: { maxAge: 24 * 60 * 60 } },
    },
    prerender: {
      autoSubfolderIndex: false,
    },
    preset: 'cloudflare-pages',
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'en',
    },
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'pt-PT',
        name: 'Português',
        file: 'pt-PT.json',
      },
    ],
    lazy: true,
    langDir: 'internationalization',
    defaultLocale: 'en',
  },
  colorMode: {
    preference: 'dark'
  }
})
