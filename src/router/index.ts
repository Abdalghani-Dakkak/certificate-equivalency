import { defineRouter } from '#q-app/wrappers';
import { useStudentStore } from 'stores/student';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    // We need to access the store here.
    // Since we are inside the router factory function, we can import the store usage inside
    // or pass it via the function arguments if configured.
    // However, pinia stores are best accessed inside components or after pinia is installed.
    // In Quasar, we can use the imported store definition if the pinia instance is active.
    // But safely, we can check localStorage or wait for store initialization.
    // Given Quasar architecture, we can import the store hook directly.

    // Dynamic import to avoid circular dependency issues during initialization if any
    const store = useStudentStore();

    // Define public pages that don't require auth
    const publicPages = ['/', '/login', '/register', '/verify-email', '/equivalency'];
    const authRequired = !publicPages.includes(to.path);

    // 1. If not logged in and trying to access auth pages -> Redirect to login
    if (!store.isLoggedIn && authRequired) {
      return next('/login');
    }

    // No email verification enforcement here; handled only right after login flow

    next();
  });

  return Router;
});
