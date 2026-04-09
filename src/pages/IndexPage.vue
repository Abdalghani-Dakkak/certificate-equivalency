<script setup lang="ts">
// No longer need mainTab for tabs, but keeping refs if needed for future interactivity
</script>

<style scoped>
/* Syrian Government Visual Identity Colors - Modern Palette */
.hero-section {
  position: relative;
  padding: 80px 0 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background:
    radial-gradient(circle at top left, rgba(5, 66, 57, 0.2), transparent 55%),
    radial-gradient(circle at bottom right, rgba(185, 167, 121, 0.18), transparent 45%),
    linear-gradient(135deg, #e5f4f4, #f3f4ff);
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(
      90deg,
      rgba(15, 23, 42, 0.12) 1px,
      transparent 1px
    ),
    linear-gradient(
      180deg,
      rgba(15, 23, 42, 0.12) 1px,
      transparent 1px
    );
  background-size: 42px 42px;
  opacity: 0.35;
  pointer-events: none;
  transform-origin: center;
  animation: hero-grid-pulse 5.5s ease-in-out infinite;
}

@keyframes hero-grid-pulse {
  0% {
    opacity: 0.25;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.03);
  }
  100% {
    opacity: 0.25;
    transform: scale(1);
  }
}

.hero-main-title {
  letter-spacing: -0.5px;
  color: #054239 !important;
  position: relative;
  display: inline-block;
  padding-bottom: 24px;
}

/* Elegant gold underline */
.hero-main-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  border-radius: 2px;
  background-color: #b9a779;
}

.hero-description {
  line-height: 1.8;
  max-width: 640px;
  font-size: 1.1rem;
  color: #475569 !important; /* Softer professional grey */
}

/* Modern Button Styles */
.hero-primary-btn {
  background-color: #054239 !important;
  color: #ffffff !important;
  border-radius: 12px; /* Modern soft corners */
  padding: 10px 32px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(5, 66, 57, 0.15) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(5, 66, 57, 0.25) !important;
}

.hero-secondary-btn {
  background-color: transparent !important;
  color: #054239 !important;
  border-radius: 12px;
  border: 1.5px solid rgba(5, 66, 57, 0.2) !important;
  font-weight: 600;
  padding: 10px 32px;
  box-shadow: none !important;
  transition: all 0.3s ease;
}

.hero-secondary-btn:hover {
  background-color: rgba(5, 66, 57, 0.04) !important;
  border-color: #054239 !important;
}

/* Modern Card Design */
.service-card {
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: #ffffff;
  position: relative;
  overflow: hidden;
  border-radius: 20px; /* Modern large radius */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card-primary {
  background: radial-gradient(circle at top left, #f4faf8, #ffffff);
  border: 1px solid rgba(5, 66, 57, 0.08);
}

.service-card-primary:hover {
  border-color: rgba(5, 66, 57, 0.35);
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01);
  border-color: rgba(5, 66, 57, 0.1);
}

.service-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px; /* Soft square/circle hybrid */
  background: rgba(5, 66, 57, 0.06); /* Tinted background */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: #054239;
  transition: all 0.3s ease;
}

.service-card:hover .service-icon-wrapper {
  background: #054239;
  color: #ffffff;
  transform: scale(1.05);
}

/* Typography Refinements */
.service-card .text-h5 {
  color: #1e293b !important; /* Slate 800 */
  font-weight: 700 !important;
  font-size: 1.25rem;
  letter-spacing: -0.01em;
}

.service-card .text-body2 {
  color: #64748b !important; /* Slate 500 */
  font-weight: 400 !important;
  line-height: 1.6;
}

/* Disabled Services - Modern Look */
.service-card-disabled {
  background: #fafafa;
  box-shadow: none;
  border: 1px dashed #e2e8f0;
  opacity: 0.8;
}

.service-card-disabled:hover {
  transform: none;
  box-shadow: none;
  border-color: #e2e8f0;
}

.service-card-disabled .service-icon-wrapper {
  background: #f1f5f9;
  color: #94a3b8;
}

.badge-soon {
  background-color: #b9a779 !important;
  color: #ffffff !important;
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 6px;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(185, 167, 121, 0.2);
}

.font-cairo {
  font-family: "Cairo", sans-serif !important;
}

@media (max-width: 599px) {
  .hero-section {
    padding: 40px 0 48px;
  }
  .hero-main-title {
    font-size: 2rem;
  }

  .service-card .q-card__section {
    padding: 20px 16px;
  }

  .service-icon-wrapper {
    margin: 0 auto 16px;
  }

  .service-card .text-h5,
  .service-card .text-body2 {
    text-align: center;
  }
}
</style>

<template>
  <q-page class="font-cairo">
    <div class="hero-section">
      <div
        class="container q-px-md hero-content text-center"
        style="max-width: 800px; margin: 0 auto"
      >
        <div class="q-mb-xl">
          <h1 class="text-h3 text-weight-bolder q-mb-lg hero-main-title">
            مديرية الامتحانات
          </h1>
          <p class="text-body1 hero-description" style="margin: 24px auto 0">
            البوابة الرقمية الموحدة للخدمات الإلكترونية، لتعزيز كفاءة الخدمات التعليمية
            وتسهيل الوصول إليها
          </p>
        </div>
        <div class="row justify-center q-gutter-md">
          <div class="col-auto">
            <q-btn
              unelevated
              size="lg"
              label="الدخول إلى الخدمات"
              to="/login"
              class="hero-primary-btn"
              icon="login"
            />
          </div>
          <div class="col-auto">
            <q-btn
              unelevated
              size="lg"
              label="حساب جديد"
              to="/register"
              class="hero-secondary-btn"
              icon="person_add"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 2️⃣ Services Section -->
    <div
      class="container q-px-md"
      style="max-width: 1200px; margin: -40px auto 80px; position: relative; z-index: 10"
    >
      <div class="row q-col-gutter-lg">
        <!-- Service 1: Registration -->
        <div class="col-12 col-md-4">
          <q-card
            class="service-card service-card-primary cursor-pointer"
            @click="$router.push('/register')"
            flat
          >
            <q-card-section class="q-pa-md">
              <div class="row items-start justify-between">
                <div class="service-icon-wrapper">
                  <q-icon name="how_to_reg" size="28px" />
                </div>
              </div>
              <div class="text-h5 q-mb-md">التسجيل في الامتحانات</div>
              <p class="text-body2 q-mb-none">
                التسجيل الإلكتروني المباشر للامتحانات العامة بكل سهولة.
              </p>
            </q-card-section>
          </q-card>
        </div>

        <!-- Service 2: Login -->
        <div class="col-12 col-md-4">
          <q-card
            class="service-card service-card-primary cursor-pointer"
            @click="$router.push('/equivalency')"
            flat
          >
            <q-card-section class="q-pa-lg">
              <div class="row items-start justify-between">
                <div class="service-icon-wrapper">
                  <q-icon name="workspace_premium" size="28px" />
                </div>
              </div>
              <div class="text-h5 q-mb-md">معادلة الشهادات</div>
              <p class="text-body2 q-mb-none">
                خدمة إلكترونية لمعادلة الشهادات الأجنبية بكل سهولة.
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
