import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "JugaadLang",
  description: "The fast, production-ready Indian programming language.",
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/intro' },
      { text: 'JugaadWeb', link: '/jugaadweb/intro' }
    ],
    sidebar: [
      {
        text: 'Core Guide',
        items: [
          { text: 'Introduction', link: '/guide/intro' },
          { text: 'Syntax & Flow', link: '/guide/syntax' },
          { text: 'Loops', link: '/guide/loops' },
          { text: 'Functions', link: '/guide/functions' },
          { text: 'Classes', link: '/guide/classes' },
          { text: 'Async/Await', link: '/guide/async' }
        ]
      },
      {
        text: 'Framework',
        items: [
          { text: 'JugaadWeb', link: '/jugaadweb/intro' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/jugaadlang' }
    ]
  }
})
