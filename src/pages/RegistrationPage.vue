<template>
  <q-page class="q-pa-md bg-grey-2 flex flex-center">
    <div class="row justify-center full-width">
      <div class="col-12" style="max-width: 21cm">
        <q-card
          class="q-pa-lg shadow-2 rounded-borders bg-white relative-position"
          style="overflow: hidden; min-height: 29.7cm"
        >
          <!-- Header -->

          <!-- Mobile Title (visible only on extra small screens) -->

          <!-- Watermark -->
          <div
            class="watermark absolute-center full-width full-height flex flex-center no-pointer-events"
            style="z-index: 0; opacity: 0.05"
          >
            <img :src="logoSrc" style="width: 50%" />
          </div>

          <q-form
            ref="registrationForm"
            class="q-gutter-y-md relative-position"
            style="z-index: 1"
          >
            <div class="col-12 text-center sm-hide q-mt-sm">
              <div class="text-h6 text-primary text-weight-bold">
                استمارة تسجيل طالب جديد
              </div>
            </div>

            <!-- Personal Info -->
            <div class="row q-col-gutter-sm">
              <div class="col-12 text-h6 text-primary">المعلومات الشخصية</div>

              <div class="col-12 col-md-3">
                <q-input
                  dense
                  outlined
                  v-model="form.first_name"
                  label="الاسم"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  dense
                  outlined
                  v-model="form.father_name"
                  label="اسم الأب"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  dense
                  outlined
                  v-model="form.grandfather_name"
                  label="اسم الجد"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  dense
                  outlined
                  v-model="form.last_name"
                  label="الكنية"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>

              <div class="col-12 col-md-3">
                <q-input
                  dense
                  outlined
                  v-model="form.mother_name"
                  label="اسم الأم"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  dense
                  outlined
                  v-model="form.mother_surname"
                  label="كنية الأم"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  dense
                  outlined
                  v-model="form.card_number"
                  label="الرقم الوطني"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-md-3">
                <CustomQSelect
                  :lst-data="listStore.lstNationality"
                  label="الجنسية"
                  :get-data="listStore.getNationality"
                  option-label="name"
                  option-value="id"
                  emit-value
                  map-options
                  v-model="form.nationality_id"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-md-3">
                <CustomQSelect
                  :lst-data="listStore.lstNationality"
                  label="جنسية الأم"
                  :get-data="listStore.getNationality"
                  option-label="name"
                  option-value="id"
                  emit-value
                  map-options
                  v-model="form.mother_nationality_id"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>

              <div class="col-12 col-md-3">
                <q-input
                  dense
                  outlined
                  v-model="form.birth_place"
                  label="مكان الولادة"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  dense
                  outlined
                  v-model="form.birth_date"
                  label="تاريخ الولادة"
                  type="date"
                  stack-label
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-md-3">
                <q-select
                  dense
                  outlined
                  v-model="form.gender"
                  :options="[
                    { label: 'ذكر', value: false },
                    { label: 'أنثى', value: true },
                  ]"
                  label="الجنس"
                  emit-value
                  map-options
                />
              </div>
            </div>

            <q-separator />

            <!-- Contact Info -->
            <div class="row q-col-gutter-sm">
              <div class="col-12 text-h6 text-primary">معلومات الاتصال والحساب</div>

              <div class="col-12 col-md-4">
                <q-input
                  dense
                  outlined
                  v-model="form.contact_number"
                  label="رقم الموبايل"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  dense
                  outlined
                  v-model="form.landline_phone_number"
                  label="رقم الهاتف الأرضي"
                />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  dense
                  outlined
                  v-model="form.email"
                  label="البريد الإلكتروني"
                  type="email"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>

              <div class="col-12 col-md-6">
                <q-input
                  dense
                  outlined
                  v-model="form.password"
                  label="كلمة المرور"
                  type="password"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  dense
                  outlined
                  v-model="confirmPassword"
                  label="تأكيد كلمة المرور"
                  type="password"
                  :rules="[(val) => val === form.password || 'كلمات المرور غير متطابقة']"
                />
              </div>
            </div>

            <q-separator />

            <!-- Location -->
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <div class="text-h6 text-primary">معلومات السكن - العنوان</div>
                <div class="text-caption text-grey-8 q-mb-sm">
                  هذه المعلومات ستستخدم لتوزيع الطلاب على المراكز الامتحانية الأقرب لمكان
                  سكنهم
                </div>
              </div>
              <div class="col-12">
                <LocationComponent v-model="form.place_code" />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  dense
                  outlined
                  v-model="form.neighborhood"
                  label="الحي"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  dense
                  outlined
                  v-model="form.address_details"
                  label="تفصيل الموقع"
                  :rules="[(val) => !!val || 'مطلوب']"
                />
              </div>
            </div>

            <q-separator />

            <!-- Files -->
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <div class="text-h6 text-primary">الصورة الشخصية</div>
                <div class="text-caption text-grey-8 q-mb-sm">
                  يرجى تحميل صورة شخصية حديثة واضحة (يفضل بخلفية بيضاء).
                </div>
              </div>
              <div class="col-12 flex flex-center">
                <q-card
                  flat
                  bordered
                  class="q-pa-md text-center"
                  style="border-style: dashed; border-color: #bbb; min-width: 280px"
                >
                  <q-card-section>
                    <q-avatar size="140px" class="shadow-3 bg-grey-2">
                      <img
                        v-if="photoPreview"
                        :src="photoPreview"
                        style="object-fit: cover"
                      />
                      <q-icon v-else name="person" size="100px" color="grey-5" />
                    </q-avatar>
                  </q-card-section>

                  <q-card-actions align="center">
                    <q-file
                      v-model="files.photo"
                      label="اختر الصورة الشخصية"
                      outlined
                      dense
                      accept="image/*"
                      class="full-width"
                      clearable
                      color="primary"
                      :rules="[(val) => !!val || 'مطلوب']"
                    >
                      <template v-slot:prepend><q-icon name="cloud_upload" /></template>
                    </q-file>
                  </q-card-actions>
                </q-card>
              </div>
            </div>

            <q-separator />

            <!-- Documents -->
            <div class="row q-col-gutter-sm">
              <div class="col-12 text-h6 text-primary">وثيقة إثبات الشخصية</div>

              <div class="col-12 row q-col-gutter-sm items-start">
                <div class="col-12 col-md-6">
                  <CustomQSelect
                    :lst-data="listStore.lstDocumentType"
                    label="نوع الوثيقة"
                    :get-data="listStore.getDocumentType"
                    option-label="name"
                    option-value="id"
                    emit-value
                    map-options
                    v-model="form.document_type_id"
                    stack-label
                    :rules="[(val) => !!val || 'مطلوب']"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <CompressedPdfUploader
                    v-model:compressedfile="files.idCard"
                    label="وثيقة إثبات الشخصية"
                  />
                </div>
              </div>
            </div>

            <!-- Error State Display -->
            <div v-if="registrationStore.addRegistrationState.error" class="q-mt-md">
              <q-banner
                dense
                class="bg-negative text-white rounded-borders"
                inline-actions
              >
                <template v-slot:avatar>
                  <q-icon name="error" color="white" />
                </template>

                {{ registrationStore.addRegistrationState.errorMessage }}

                <template v-slot:action>
                  <q-btn
                    flat
                    color="white"
                    @click="registrationStore.addRegistrationState.reset()"
                  >
                    إغلاق
                  </q-btn>
                </template>
              </q-banner>
            </div>

            <div class="row justify-center q-gutter-x-md q-mt-lg">
              <q-btn
                @click="submit"
                color="primary"
                label="تسجيل"
                icon="save"
                class="q-px-xl"
                :loading="registrationStore.addRegistrationState.loading"
                :disable="registrationStore.addRegistrationState.loading"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { useRegistrationStore } from "stores/registration";
import { useListStore } from "stores/list-store";
import { useQuasar, QForm } from "quasar";
import { useRouter } from "vue-router";
import type { RegistrationFreeStudentOrder } from "src/types";
import CustomQSelect from "src/components/common/CustomQSelect.vue";
import LocationComponent from "src/components/common/LocationComponent.vue";
import CompressedPdfUploader from "src/components/common/CompressedPdfUploader.vue";
import logoSrc from "assets/Syrian_logo_icon_gold.svg";

const registrationStore = useRegistrationStore();
const listStore = useListStore();
const $q = useQuasar();
const router = useRouter();

const registrationForm = ref<QForm | null>(null);
const confirmPassword = ref("");
const photoPreview = ref<string | null>(null);

const form = reactive<RegistrationFreeStudentOrder>({
  first_name: "",
  father_name: "",
  last_name: "",
  grandfather_name: "",
  mother_name: "",
  mother_surname: "",
  place_code: "",
  gender: false,
  nationality_id: 1,
  mother_nationality_id: 1,
  birth_place: "",
  birth_date: "",
  card_number: "",
  contact_number: "",
  email: "",
  landline_phone_number: "",
  password: "",
  document_type_id: 1,
  neighborhood: "",
  address_details: "",
});

const files = reactive({
  photo: null as File | null,
  idCard: null as File | null,
});

onMounted(() => {
  listStore.getDocumentType();
  listStore.getNationality();
  // Pre-fetch lists that don't depend on others
  // CustomQSelect fetches on mount if getData is provided, so we might not need to call them here explicitly
  // unless we want to pre-load.
});

const updatePhotoPreview = (file: File | null) => {
  if (file) {
    photoPreview.value = URL.createObjectURL(file);
  } else {
    photoPreview.value = null;
  }
};

watch(
  () => files.photo,
  (file) => {
    updatePhotoPreview(file as File | null);
  }
);

const submit = async () => {
  const isValid = await registrationForm.value?.validate();

  if (!isValid) {
    $q.notify({
      type: "warning",
      message: "يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح",
      position: "top",
    });
    return;
  }

  if (form.password !== confirmPassword.value) {
    $q.notify({ type: "warning", message: "كلمات المرور غير متطابقة" });
    return;
  }

  await registrationStore.addRegistrationFreeStudentOrder(form, files, () => {
    $q.notify({
      type: "positive",
      message: "تم التسجيل بنجاح",
      position: "top",
    });
    router.push("/login");
  });
};
</script>

<style scoped>
.watermark {
  z-index: 0;
  opacity: 0.03;
}
</style>
