<template>
  <div class="pdf-wrapper">
    <div v-if="loading" class="pdf-center">
      <q-spinner size="3em" color="primary" />
    </div>

    <iframe v-else-if="pdfUrl" :src="pdfUrl" class="pdf-frame" frameborder="0" />

    <div v-else class="pdf-center text-grey">
      <q-icon name="description" size="42px" />
      <div class="q-mt-sm">لا يوجد ملف PDF</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pdfUrl?: string;
  loading?: boolean;
}>();
</script>

<style scoped>
.pdf-wrapper {
  width: 100%;
  height: 100%;
  min-height: 300px;
  position: relative;
}

.pdf-frame {
  width: 100%;
  height: 100%;
  border: none;
}

.pdf-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
