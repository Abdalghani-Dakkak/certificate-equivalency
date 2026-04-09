<template>
  <div class="row flex-center q-pa-xl">
    <q-card flat class="loading-shell">
      <q-card-section class="column items-center q-gutter-md">

        <q-spinner-ios
          size="40px"
          color="primary"
        />
        <div class="loading-time">
          {{ elapsedText }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const elapsed = ref(0);
let timer: number | undefined;

const elapsedText = computed(() => {
  const s = Math.floor(elapsed.value / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
});

onMounted(() => {
  timer = window.setInterval(() => {
    elapsed.value += 1000;
  }, 1000);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>
<style scoped>
.loading-shell {
  min-width: 360px;
  padding: 32px 24px;
  border-radius: 20px;
  background: #fff;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.06);
}

.loading-text {
  font-size: 0.95rem;
  color: #444;
  letter-spacing: 0.3px;
}

.loading-time {
  font-size: 0.85rem;
  font-weight: 600;
  color: #9e9e9e;
  letter-spacing: 1px;
}
</style>
