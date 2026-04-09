import { LocalStorage } from 'quasar';
import { boot } from 'quasar/wrappers';

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const lsToken = LocalStorage.getItem('token');
    const rawToken = typeof lsToken === 'string' ? lsToken : (LocalStorage.getItem('token') || '');
    const isAuthenticated = !!rawToken && rawToken !== 'undefined' && rawToken !== 'null';
    const requiresAuth = to.meta.requiresAuth !== false;

    if (requiresAuth && !isAuthenticated) {
      next({ path: '/login' });
    } else {
      next();
    }
  });
});
