
const baseURL = 'https://sociovent-api.herokuapp.com/v1/api/'

module.exports = {
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:1220/api/v1',
    frontUrl: process.env.FRONT_URL || `http://sociovent.herokuapp.com`
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=UA-165985781-1', defer: true }
      ],
     // { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/vue-loading.css' },
      { rel: 'stylesheet', href: '/vueDatePick.css' },
      { rel: 'stylesheet', href: '/VueTimepicker.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-analytics'
  ],

  googleAnalytics: {
    id: 'UA-12301-2'

  },


  modules: [
  ],


  /*
  ** Nuxt.js modules
  */

  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }

}
