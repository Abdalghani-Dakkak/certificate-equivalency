<template>
  <q-layout view="hHh LpR lff" dir="rtl" class="bg-white font-cairo">
    <!-- 1️⃣ Sovereign Header (Sticky) -->
    <q-header class="shadow-1 app-header" elevated reveal>
      <div class="container full-height app-header-inner">
        <q-toolbar class="full-height app-header-toolbar">
          <div
            class="row items-center cursor-pointer no-padding full-height app-header-identity"
            @click="$router.push('/')"
          >
            <img src="~assets/Syrian_logo_icon_gold.svg" class="app-header-logo" />
            <div class="column justify-center q-mr-sm">
              <span class="app-header-title-small">
                الجمهورية العربية السورية - وزارة التربية والتعليم
              </span>
              <span class="app-header-title-main text-weight-bolder">
                مديرية الامتحانات
              </span>
            </div>
          </div>

          <q-space class="gt-sm" />

          <div class="gt-md row items-center q-gutter-x-lg app-header-nav">
            <router-link to="/" class="nav-link text-primary text-weight-bold">
              الرئيسية
            </router-link>
            <router-link to="/equivalency" class="nav-link text-primary text-weight-bold">
              معادلة الشهادات
            </router-link>
            <div
              class="q-pl-lg q-ml-lg"
              style="border-right: 1px solid rgba(15, 23, 42, 0.08)"
            >
              <router-link to="/login" class="nav-link text-primary text-weight-bold">
                تسجيل الدخول
              </router-link>
            </div>
          </div>

          <q-btn
            flat
            dense
            round
            icon="menu"
            class="lt-md q-ml-sm"
            @click="toggleLeftDrawer"
          />
        </q-toolbar>
      </div>
    </q-header>

    <!-- Mobile Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      class="bg-white lt-md app-drawer"
      side="right"
      overlay
      behavior="mobile"
    >
      <div class="app-drawer-header column items-center q-py-lg q-mb-sm">
        <div class="drawer-title-main">مديرية الامتحانات</div>
      </div>
      <q-list padding class="drawer-list">
        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <div class="drawer-item-label">الرئيسية</div>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/equivalency">
          <q-item-section avatar>
            <q-icon name="workspace_premium" />
          </q-item-section>
          <q-item-section>
            <div class="drawer-item-label">معادلة الشهادات</div>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item clickable v-ripple to="/login">
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>
            <div class="drawer-item-label">تسجيل الدخول</div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Institutional Footer -->
    <q-footer class="text-white app-footer">
      <div class="container app-footer-inner">
        <div class="column items-center text-center">
          <div class="text-subtitle2 text-grey-4 q-mb-xs font-cairo">
            الجمهورية العربية السورية
          </div>
          <div class="text-subtitle2 text-grey-4 q-mb-xs font-cairo">
            وزارة التربية والتعليم
          </div>
          <div class="text-h6 text-weight-bold q-mb-md font-cairo">مديرية الامتحانات</div>

          <div class="text-caption text-grey-6 font-cairo">
            جميع الحقوق محفوظة © {{ new Date().getFullYear() }}
          </div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style>
/* Global Styles */
.font-cairo {
  font-family: "Cairo", sans-serif !important;
}

.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

/* Header Styles */
.app-header {
  background-color: #ffffff;
  color: #111827;
}

.app-header-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.app-header-identity {
  gap: 8px;
}

.app-header-logo {
  height: 52px;
  width: auto;
}

.app-drawer {
  max-width: 280px;
}

.app-drawer-header {
  background-color: #054239;
  color: #f9fafb;
}

.drawer-title-main {
  font-weight: 700;
  font-size: 1rem;
}

.drawer-title-sub {
  font-size: 0.78rem;
  color: #d1d5db;
}

.drawer-list .q-item {
  border-radius: 999px;
  margin: 4px 8px;
}

.drawer-item-label {
  font-size: 0.9rem;
}

/* Footer Styles */
.app-footer {
  background-color: #032b25;
  border-top: 1px solid #b9a779;
  padding-top: 24px;
  padding-bottom: 24px;
}

.app-footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.app-footer-links {
  flex-wrap: wrap;
}

.app-footer-link {
  color: #e5e7eb;
  text-decoration: none;
  font-size: 0.85rem;
}

.app-footer-link:hover {
  color: #facc6b;
}

.app-header-title-main {
  font-size: 1.25rem;
  line-height: 1.2;
  color: #111827;
}

.app-header-title-small {
  font-size: 0.78rem;
  color: #64748b;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.nav-link {
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease-out, transform 0.2s ease-out;
  padding: 8px 0 10px;
  position: relative;
  color: #0f172a;
}

.nav-link:hover {
  color: #054239 !important;
}

.nav-link::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background-color: #b9a779;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.2s ease-out;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
}

/* Mobile Adjustments */
@media (max-width: 599px) {
  .app-header {
    height: 60px;
  }

  .app-header-logo {
    height: 32px;
  }

  .app-header-title-main {
    font-size: 1rem;
  }

  .app-header-title-sub {
    font-size: 0.6rem;
  }

  .app-header-title-small {
    display: none;
  }

  .app-header-identity {
    flex: 1 1 auto;
    justify-content: center;
  }
}
</style>
