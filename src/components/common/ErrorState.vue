<template>
  <div class="row justify-center q-pa-lg">
    <q-card flat bordered class="error-card" role="alert">
      <q-card-section class="row no-wrap items-start q-gutter-md">

        <!-- Icon -->
        <div>
          <q-icon name="error_outline" size="44px" class="text-negative" />
        </div>

        <!-- Text + Actions -->
        <div class="col">
          <div class="text-h6 text-negative text-weight-bold">
            حدث خطأ
          </div>

          <!-- ERROR MESSAGE -->
          <div class="text-grey-7 error-message q-mt-sm q-mb-md">
            {{ message }}
          </div>

          <!-- Actions -->
          <div class="row items-center justify-end">


            <q-btn unelevated dense color="primary" icon="refresh" label="إعادة المحاولة" @click="retry" />
          </div>

        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  message: string | null
  retry: () => void
}>()
</script>

<style scoped>
.error-card {
  width: 100%;
  max-width: 700px;
  border-radius: 14px;
  padding: 8px;
}

.error-message {
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
  max-height: 40vh;
  overflow-y: auto;
  text-align: left;
  padding-right: 6px;
}

@media (max-width: 520px) {
  .error-message {
    max-height: 35vh;
    font-size: 14px;
  }
}
</style>
