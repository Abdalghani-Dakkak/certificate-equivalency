<template>
  <LoadingState v-if="store.fetchProfileState.loading" />
  <ErrorState
    v-else-if="store.fetchProfileState.error"
    :title="'خطأ في تحميل الملف الشخصي'"
    :message="store.fetchProfileState.errorMessage || 'حدث خطأ غير متوقع'"
    :retry="() => store.fetchProfile()"
  />

  <div v-else class="row q-col-gutter-md">
    <!-- Left Column: Profile Card -->
    <div class="col-12 col-md-4">
      <q-card class="text-center q-pa-lg full-height shadow-2">
        <div class="relative-position inline-block q-mb-md">
          <q-avatar size="150px" class="shadow-5">
            <q-img
              :src="store.profileImageBlob || 'https://cdn.quasar.dev/img/boy-avatar.png'"
              fit="cover"
              style="height: 100%"
            />
          </q-avatar>
        </div>

        <div class="text-h5 text-weight-bold q-mt-sm">
          {{ store.info.first_name }} {{ store.info.last_name }}
        </div>
        <div class="text-subtitle2 text-grey-7 q-mb-md">
          {{ store.info.email }}
        </div>

        <q-chip
          :color="store.isEmailVerified ? 'positive' : 'warning'"
          text-color="white"
          icon="verified"
          :label="store.isEmailVerified ? 'مؤكد' : 'غير مؤكد'"
        />

        <q-separator class="q-my-md" />

        <div class="text-left q-px-sm">
          <div class="row justify-between q-mb-sm">
            <span class="text-grey-8">نوع الإثبات:</span>
            <span class="text-weight-bold">{{
              store.info.document_type_name || "غير محدد"
            }}</span>
          </div>
          <div class="row justify-between q-mb-sm">
            <span class="text-grey-8">المحافظة:</span>
            <span class="text-weight-bold">{{
              store.info.governorate || "غير محدد"
            }}</span>
          </div>
          <div class="row justify-between q-mb-sm">
            <span class="text-grey-8">تاريخ الطلب:</span>
            <span class="text-weight-bold">{{ store.info.order_date || "-" }}</span>
          </div>
          <div class="row justify-between q-mb-sm">
            <span class="text-grey-8">تاريخ التوثيق:</span>
            <span class="text-weight-bold">{{
              store.info.verification_date || "-"
            }}</span>
          </div>
        </div>
      </q-card>
    </div>

    <!-- Right Column: Details Tabs -->
    <div class="col-12 col-md-8">
      <q-card class="full-height shadow-2">
        <q-tabs
          v-model="activeTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="personal" icon="person" label="البيانات الشخصية" />
          <q-tab name="address" icon="place" label="العنوان والتواصل" />
          <q-tab name="documents" icon="folder" label="الوثائق والمرفقات" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <!-- Personal Info Tab -->
          <q-tab-panel name="personal">
            <div class="text-h6 q-mb-md text-primary">المعلومات الأساسية</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.first_name"
                  label="الاسم الأول"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.last_name"
                  label="الكنية"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.father_name"
                  label="اسم الأب"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.grandfather_name"
                  label="اسم الجد"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.mother_name"
                  label="اسم الأم"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.mother_surname"
                  label="كنية الأم"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.birth_date"
                  label="تاريخ الولادة"
                  type="date"
                  stack-label
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.birth_place"
                  label="مكان الولادة"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.gender"
                  label="الجنس"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.nationality_name"
                  label="الجنسية"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.mother_nationality_name"
                  label="جنسية الأم"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.card_number"
                  label="الرقم الوطني / رقم الهوية"
                />
              </div>
            </div>
          </q-tab-panel>

          <!-- Address & Contact Tab -->
          <q-tab-panel name="address">
            <div class="text-h6 q-mb-md text-primary">معلومات الاتصال</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.contact_number"
                  label="رقم الموبايل"
                  mask="##########"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.landline_phone_number"
                  label="الهاتف الأرضي"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.email"
                  label="البريد الإلكتروني"
                  type="email"
                />
              </div>
            </div>

            <q-separator spaced class="q-my-md" />

            <div class="text-h6 q-mb-md text-primary">العنوان الحالي</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.place_code"
                  label="رمز المكان"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.governorate"
                  label="المحافظة"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.district"
                  label="المدينة/المنطقة"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.subdistrict"
                  label="الناحية"
                />
              </div>
              <div class="col-12">
                <q-input
                  readonly
                  outlined
                  dense
                  :model-value="store.info.community"
                  label="العنوان التفصيلي"
                  type="textarea"
                  rows="3"
                />
              </div>
            </div>
          </q-tab-panel>

          <!-- Documents Tab -->
          <q-tab-panel name="documents">
            <div class="text-h6 q-mb-md text-primary">الملفات المرفقة</div>

            <q-list bordered separator class="rounded-borders">
              <!-- ID Proof Item -->
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white" icon="assignment_ind" />
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-bold"
                    >إثبات الشخصية ({{
                      store.info.document_type_name || "غير محدد"
                    }})</q-item-label
                  >
                  <q-item-label caption>
                    <div v-if="store.idProofBlob" class="text-positive flex items-center">
                      <q-icon name="check_circle" class="q-mr-xs" /> تم الرفع
                    </div>
                    <div v-else class="text-warning">لم يتم الرفع</div>
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="row q-gutter-xs">
                    <q-btn
                      v-if="store.idProofBlob"
                      flat
                      round
                      color="primary"
                      icon="visibility"
                      :href="store.idProofBlob"
                      target="_blank"
                    >
                      <q-tooltip>عرض الملف</q-tooltip>
                    </q-btn>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useStudentStore } from "stores/student";
import LoadingState from "src/components/common/LoadingState.vue";
import ErrorState from "src/components/common/ErrorState.vue";

const store = useStudentStore();
const activeTab = ref("personal");

onMounted(() => {
  if (store.token) {
    store.fetchStudentImages();
  }
});

watch(
  () => store.token,
  (newToken) => {
    if (newToken) {
      store.fetchStudentImages();
    } else {
      store.profileImageBlob = null;
      store.idProofBlob = null;
    }
  }
);
</script>
