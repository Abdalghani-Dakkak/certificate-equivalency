<template>
  <q-page class="q-pa-md bg-grey-1 font-cairo">
    <div class="container" style="max-width: 1400px; margin: 0 auto">
      <!-- Welcome Section -->
      <div class="q-mb-xl">
        <DashboardHeader />
        <ProfileStatusBanner @complete-profile="tab = 'profile'" />
        <PendingPayments :registrations="unpaidRegistrations" />
      </div>

      <div class="row q-col-gutter-xl">
        <!-- Sidebar Navigation (Desktop) -->
        <div class="col-md-3 gt-sm">
          <div style="position: sticky; top: 20px">
            <div class="text-h6 q-mb-md text-weight-bold text-grey-9 q-px-sm">
              لوحة التحكم
            </div>
            <q-list class="text-grey-7">
              <q-item
                clickable
                v-ripple
                :active="tab === 'available'"
                @click="tab = 'available'"
                active-class="text-primary bg-primary-light"
                class="q-mb-sm rounded-borders transition-generic q-py-md"
                style="border-radius: 12px"
              >
                <q-item-section avatar>
                  <q-icon name="event_available" size="28px" />
                </q-item-section>
                <q-item-section class="text-h6 text-weight-medium"
                  >الدورات المتاحة</q-item-section
                >
                <q-item-section side v-if="tab === 'available'">
                  <q-icon name="chevron_left" color="primary" />
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                :active="tab === 'my_registrations'"
                @click="tab = 'my_registrations'"
                active-class="text-primary bg-primary-light"
                class="q-mb-sm rounded-borders transition-generic q-py-md"
                style="border-radius: 12px"
              >
                <q-item-section avatar>
                  <q-icon name="history" size="28px" />
                </q-item-section>
                <q-item-section class="text-h6 text-weight-medium"
                  >سجل التسجيلات</q-item-section
                >
                <q-item-section side>
                  <q-badge
                    v-if="examStore.myRegistrations.length > 0"
                    color="primary"
                    rounded
                    :label="examStore.myRegistrations.length"
                  />
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                :active="tab === 'profile'"
                @click="tab = 'profile'"
                active-class="text-primary bg-primary-light"
                class="q-mb-sm rounded-borders transition-generic q-py-md"
                style="border-radius: 12px"
              >
                <q-item-section avatar>
                  <q-icon name="person_outline" size="28px" />
                </q-item-section>
                <q-item-section class="text-h6 text-weight-medium"
                  >الملف الشخصي</q-item-section
                >
              </q-item>
            </q-list>
          </div>
        </div>

        <!-- Mobile Navigation (Tabs) -->
        <div class="col-12 lt-md q-mb-lg">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey-8 bg-white rounded-borders shadow-1"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
            style="border-radius: 12px"
          >
            <q-tab name="available" label="الدورات" icon="event_available" />
            <q-tab name="my_registrations" label="سجلي" icon="history" />
            <q-tab name="profile" label="ملفي" icon="person" />
          </q-tabs>
        </div>

        <!-- Content Area -->
        <div class="col-12 col-md-9">
          <q-tab-panels
            v-model="tab"
            animated
            transition-prev="fade"
            transition-next="fade"
            class="bg-transparent"
          >
            <!-- Available Cycles -->
            <q-tab-panel name="available" class="q-pa-none">
              <div class="text-h5 text-weight-bold q-mb-lg text-grey-9">
                الدورات الامتحانية المتاحة
              </div>
              <AvailableCycles @register="openRegisterDialog" />
            </q-tab-panel>

            <!-- My Registrations -->
            <q-tab-panel name="my_registrations" class="q-pa-none">
              <div class="text-h5 text-weight-bold q-mb-lg text-grey-9">سجل تسجيلاتي</div>
              <RegistrationHistory />
            </q-tab-panel>

            <!-- Profile Panel -->
            <q-tab-panel name="profile" class="q-pa-none">
              <div class="text-h5 text-weight-bold q-mb-lg text-grey-9">الملف الشخصي</div>
              <StudentProfile />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
    <RegistrationDialog
      v-model="registerDialog"
      :selected-cycle="selectedCycle"
      @registered="tab = 'my_registrations'"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useExamStore } from "stores/exam";
import { useStudentStore } from "stores/student";
import type { ExamCycle } from "src/types";

import DashboardHeader from "src/components/dashboard/DashboardHeader.vue";
import PendingPayments from "src/components/dashboard/PendingPayments.vue";
import StudentProfile from "src/components/dashboard/StudentProfile.vue";
import AvailableCycles from "src/components/dashboard/AvailableCycles.vue";
import RegistrationHistory from "src/components/dashboard/RegistrationHistory.vue";
import RegistrationDialog from "src/components/dashboard/RegistrationDialog.vue";

const examStore = useExamStore();
const studentStore = useStudentStore();

const tab = ref("available");
const registerDialog = ref(false);
const selectedCycle = ref<ExamCycle | null>(null);

const loadTabData = async (tabName: string) => {
  switch (tabName) {
    case "available":
      // Only fetch if not already loaded or if you want to refresh every time
      await examStore.fetchCycles();
      break;
    case "my_registrations":
      await examStore.fetchRegistrations();
      break;
    case "profile":
      await Promise.all([studentStore.fetchProfile(), studentStore.fetchStudentImages()]);
      break;
  }
};

// Initialize dashboard data
onMounted(() => {
  studentStore.loadLoginInfo();
  // Load initial tab data
  loadTabData(tab.value);
});

// Watch for tab changes to load data lazily
watch(tab, (newTab) => {
  loadTabData(newTab);
});

const unpaidRegistrations = computed(() =>
  examStore.myRegistrations.filter((e) => !e.verification_date)
);

const openRegisterDialog = (cycle: ExamCycle) => {
  selectedCycle.value = cycle;
  registerDialog.value = true;
};
</script>

<style>
.bg-primary-light {
  background-color: #e0f2f1 !important; /* Light teal matching the theme */
}
</style>
