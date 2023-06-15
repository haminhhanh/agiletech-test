const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    // localeDetection: false,
    // reloadOnPrerender: process.env.NODE_ENV === 'development',
    // fallbackLng: ['en'],
  },
  localePath: path.resolve('./public/locales'),
};
