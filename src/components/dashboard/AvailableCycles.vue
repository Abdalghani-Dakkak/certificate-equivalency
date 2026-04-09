<template>
  <div class="available-cycles-container">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6 text-primary flex items-center">
        <q-icon name="event_available" class="q-mr-sm" size="28px" />
        <span class="text-weight-bold">الدورات الامتحانية المتاحة</span>
      </div>
      <div class="flex items-center q-gutter-x-sm">
        <q-input
          dense
          outlined
          v-model="searchQuery"
          placeholder="بحث عن دورة..."
          class="bg-white"
          style="min-width: 200px"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <LoadingState v-if="store.fetchCyclesState.loading" />
    <ErrorState
      v-else-if="store.fetchCyclesState.error"
      :title="'خطأ في تحميل الدورات'"
      :message="store.fetchCyclesState.errorMessage || 'حدث خطأ غير متوقع'"
      :retry="() => store.fetchCycles()"
    />

    <q-scroll-area
      v-else
      style="height: 500px; max-width: 100%"
      class="bg-transparent rounded-borders"
    >
      <div class="row q-col-gutter-md" v-if="availableCycles.length > 0">
        <div
          class="col-12 col-sm-6 col-md-4"
          v-for="cycle in availableCycles"
          :key="cycle.id"
        >
          <q-card class="cycle-card column no-wrap" flat bordered>
            <!-- Decorative Top Strip -->
            <div class="top-strip bg-primary"></div>

            <q-card-section class="q-pb-none">
              <div class="row items-start justify-between no-wrap">
                <div>
                  <div class="text-h6 text-weight-bold text-grey-9 leading-tight q-mb-xs">
                    {{ cycle.name }}
                  </div>
                  <div class="text-caption text-grey-6">
                    دورة عام {{ cycle.year_name }}
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-py-sm">
              <q-chip
                dense
                color="blue-1"
                text-color="blue-9"
                icon="verified"
                class="q-ma-none text-weight-medium"
              >
                {{ cycle.certificate_name }}
              </q-chip>
            </q-card-section>

            <q-card-section class="col q-pt-none">
              <div class="bg-grey-1 rounded-borders q-pa-sm q-mt-sm">
                <div class="text-caption text-grey-7 q-mb-xs font-medium">
                  فترة التسجيل
                </div>
                <div class="row items-center justify-between text-body2">
                  <div class="row items-center">
                    <q-icon name="event" size="16px" class="q-mr-xs text-primary" />
                    <span class="text-weight-medium">{{
                      cycle.start_registration_date
                    }}</span>
                  </div>
                  <div class="text-grey-5">
                    <q-icon name="arrow_back" size="14px" />
                  </div>
                  <div class="row items-center">
                    <q-icon name="event_busy" size="16px" class="q-mr-xs text-orange-8" />
                    <span class="text-weight-medium">{{
                      cycle.end_registration_date
                    }}</span>
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-separator color="grey-2" />

            <q-card-actions align="center" class="q-pa-md bg-grey-1">
              <q-btn
                unelevated
                color="primary"
                label="بدء التسجيل"
                icon="how_to_reg"
                class="full-width shadow-1"
                padding="8px 16px"
                @click="$emit('register', cycle)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <div
        v-else
        class="flex flex-center column q-pa-xl text-grey-5 full-height"
        style="min-height: 300px"
      >
        <q-icon name="event_busy" size="5rem" class="q-mb-md opacity-50" />
        <div class="text-h6">لا توجد دورات متاحة حالياً</div>
        <div class="text-caption">يرجى التحقق في وقت لاحق</div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useExamStore } from "stores/exam";
import type { ExamCycle } from "src/types";
import LoadingState from "src/components/common/LoadingState.vue";
import ErrorState from "src/components/common/ErrorState.vue";

const store = useExamStore();
const searchQuery = ref("");

const availableCycles = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return store.availableCycles.filter((c) => {
    const matchesStatus = c.status === "open";
    const matchesSearch =
      c.name.toLowerCase().includes(query) ||
      c.certificate_name.toLowerCase().includes(query) ||
      c.year_name.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });
});

defineEmits<{
  (e: "register", cycle: ExamCycle): void;
}>();
</script>

<style scoped>
.cycle-card {
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  height: 100%;
}

.cycle-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--q-primary);
}

.top-strip {
  height: 6px;
  width: 100%;
}

.leading-tight {
  line-height: 1.2;
}

.opacity-50 {
  opacity: 0.5;
}

.font-medium {
  font-weight: 500;
}
</style>
