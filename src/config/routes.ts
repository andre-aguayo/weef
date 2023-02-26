export default {
  healthCheck: {
    alias: 'health-check',
  },
  user: {
    alias: 'user',
    login: 'login',
    authTest: 'auth-test',
  },
  event: {
    alias: 'event',
    add: 'create',
    update: 'update',
    delete: 'delete/:eventId',
    list: 'list',
    find: ':eventId',
  },
};
