<template>
  <div class="row items-center q-mb-lg q-pb-md border-bottom-primary">
    <div>
      <div class="text-h4 text-primary text-weight-bold">لوحة التحكم</div>
      <div class="text-subtitle1 text-grey-7">
        أهلاً بك، {{ store.loginState.value?.first_name }}
        {{ store.loginState.value?.last_name }}
      </div>
      <div class="text-caption text-grey-6 q-mt-xs">
        {{ store.info.email }}
      </div>
    </div>
    <q-space />
  </div>
</template>

<script setup lang="ts">
import { useStudentStore } from "stores/student";

const store = useStudentStore();
</script>
