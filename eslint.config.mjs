import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  astro: true,
  formatters: {
    css: true,
    html: true,
  },
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
  ignores: [
    'dist',
    '.astro',
  ],
})
