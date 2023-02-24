export default {
  healthCheck: {
    alias: 'health-check',
  },
  user: {
    alias: 'user',
    login: 'login',
    add: 'add',
    profile: 'profile',
    theme: 'theme',
    password: {
      alias: 'user/password',
      change: 'change',
      forgot: 'forgot',
      recover: 'recover',
    },
  },
  language: {
    alias: 'language',
    list: '/',
    flag: '/:languageId/flag',
  },
  log: {
    alias: 'log',
    list: '/',
  },
  address: {
    alias: 'address',
    findByZipcode: 'find-by-zipcode/:zipcode',
  },
};
