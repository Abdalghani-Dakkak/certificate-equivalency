import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: false } },
      { path: 'login', component: () => import('pages/LoginPage.vue'), meta: { requiresAuth: false } },
      { path: 'verify-email', component: () => import('pages/VerifyEmailPage.vue'), meta: { requiresAuth: false } },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue'), meta: { requiresAuth: true } },
      { path: 'equivalency', component: () => import('pages/CertificateEquivalencyPage.vue'), meta: { requiresAuth: false } },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
