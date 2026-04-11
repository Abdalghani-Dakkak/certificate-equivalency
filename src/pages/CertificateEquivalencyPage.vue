<template>
  <q-page class="bg-grey-1 q-pa-md">
    <q-card class="q-mx-auto shadow-2" style="max-width: 900px">
      <q-card-section class="bg-primary text-white q-py-sm">
        <div class="text-h6">طلب معادلة الشهادة</div>
      </q-card-section>

      <q-stepper
        v-model="step"
        ref="stepperRef"
        flat
        animated
        color="primary"
        class="q-pa-none"
      >
        <!-- Step 1: معلومات الطالب -->
        <q-step :name="1" title="معلومات الطالب" icon="person" :done="step > 1">
          <q-form ref="step1FormRef" class="q-gutter-sm q-pa-sm">
            <div class="row q-col-gutter-sm">

              <!-- Row 1: الاسم | اسم الأب | الكنية -->
              <div class="col-12 col-sm-4">
                <q-input dense outlined v-model="form.first_name" label="الاسم" :rules="[(v) => !!v || 'مطلوب']" />
              </div>
              <div class="col-12 col-sm-4">
                <q-input dense outlined v-model="form.father_name" label="اسم الأب" :rules="[(v) => !!v || 'مطلوب']" />
              </div>
              <div class="col-12 col-sm-4">
                <q-input dense outlined v-model="form.last_name" label="الكنية" :rules="[(v) => !!v || 'مطلوب']" />
              </div>

              <!-- Row 2: الجنس | اسم الأم | كنية الأم -->
              <div class="col-12 col-sm-4">
                <q-select
                  dense outlined
                  v-model="form.gender"
                  :options="genderOptions"
                  label="الجنس"
                  emit-value map-options
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-4">
                <q-input dense outlined v-model="form.mother_name" label="اسم الأم" :rules="[(v) => !!v || 'مطلوب']" />
              </div>
              <div class="col-12 col-sm-4">
                <q-input dense outlined v-model="form.mother_surname" label="كنية الأم" :rules="[(v) => !!v || 'مطلوب']" />
              </div>

              <!-- Row 3: تاريخ الميلاد | الجنسية | جنسية الأم -->
              <div class="col-12 col-sm-4">
                <q-input
                  :rules="[(v) => !!v || 'مطلوب']"
                  dense outlined
                  v-model="form.birth_date"
                  label="تاريخ الميلاد"
                  type="date"
                  stack-label
                />
              </div>
              <div class="col-12 col-sm-4">
                <CustomQSelect
                  :lst-data="listStore.lstNationality"
                  label="الجنسية"
                  :get-data="listStore.getNationality"
                  @update:model-value="(val) => (form.nationality_id = val ? String(val.id) : '')"
                  :rules="[(v) => !!v || 'مطلوب']"
                  dense
                />
              </div>
              <div class="col-12 col-sm-4">
                <CustomQSelect
                  :lst-data="listStore.lstNationality"
                  label="جنسية الأم"
                  :get-data="listStore.getNationality"
                  @update:model-value="(val) => (form.mother_nationality_id = val ? String(val.id) : '')"
                  :rules="[(v) => !!v || 'مطلوب']"
                  dense
                />
              </div>

              <!-- Row 4: البريد الإلكتروني | كلمة المرور | تأكيد كلمة المرور -->
              <div class="col-12 col-sm-4">
                <q-input
                  dense outlined
                  v-model="form.email"
                  label="البريد الإلكتروني"
                  type="email"
                  :rules="[(v) => !!v || 'مطلوب', (v) => /.+@.+\..+/.test(v) || 'بريد غير صالح']"
                />
              </div>
              <div class="col-12 col-sm-4">
                <q-input
                  dense outlined
                  v-model="form.password"
                  label="كلمة المرور"
                  type="password"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-4">
                <q-input
                  dense outlined
                  v-model="confirmPassword"
                  label="تأكيد كلمة المرور"
                  type="password"
                  :rules="[(v) => !!v || 'مطلوب', (v) => v === form.password || 'كلمات المرور غير متطابقة']"
                />
              </div>

              <!-- Row 5: رقم التواصل | نوع الوثيقة -->
              <div class="col-12 col-sm-6">
                <q-input dense outlined v-model="form.contact_number" label="رقم التواصل" :rules="[(v) => !!v || 'مطلوب']" />
              </div>
              <div class="col-12 col-sm-6">
                <CustomQSelect
                  :lst-data="listStore.lstDocumentType"
                  label="نوع الوثيقة"
                  :get-data="listStore.getDocumentType"
                  @update:model-value="(val) => (form.document_type_id = val ? String(val.id) : '')"
                  :rules="[(v) => !!v || 'مطلوب']"
                  dense
                />
              </div>

              <!-- Row 6: رقم الوثيقة | تاريخ الوثيقة -->
              <div class="col-12 col-sm-6">
                <q-input dense outlined v-model="form.document_number" label="رقم الوثيقة" :rules="[(v) => !!v || 'مطلوب']" />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  dense outlined
                  v-model="form.document_date"
                  label="تاريخ الوثيقة"
                  type="date"
                  stack-label
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>

              <!-- Checkbox: لديه تسلسل دراسي؟ -->
              <div class="col-12">
                <q-checkbox v-model="form.has_sequence" label="لديه تسلسل دراسي؟" dense />
              </div>

              <!-- Row 7: مصدر الشهادة | نوع الشهادة -->
              <div class="col-12 col-sm-6">
                <CustomQSelect
                  :lst-data="listStore.lstCertificateSource"
                  label="مصدر الشهادة"
                  :get-data="listStore.getCertificateSource"
                  @update:model-value="(val) => (form.certificate_source_id = val ? String(val.id) : '')"
                  :rules="[(v) => !!v || 'مطلوب']"
                  dense
                />
              </div>
              <div class="col-12 col-sm-6">
                <CustomQSelect
                  :lst-data="listStore.lstRegistrationCertificate"
                  label="نوع الشهادة"
                  :get-data="listStore.getRegistrationCertificate"
                  @update:model-value="(val) => (form.certificate_type_id = val ? String(val.id) : '')"
                  :rules="[(v) => !!v || 'مطلوب']"
                  dense
                />
              </div>

              <!-- Row 8: رقم الشهادة | سنة المنح -->
              <div class="col-12 col-sm-6">
                <q-input dense outlined v-model="form.certificate_number" label="رقم الشهادة" :rules="[(v) => !!v || 'مطلوب']" />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  dense outlined
                  v-model.number="form.certificate_year"
                  label="سنة المنح"
                  type="number"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>

              <!-- Row 9: المعدل -->
              <div class="col-12">
                <q-input
                  dense outlined
                  v-model.number="form.grade"
                  label="المعدل"
                  type="number"
                  :rules="[(v) => v !== null && v !== undefined && String(v) !== '' || 'مطلوب']"
                />
              </div>

            </div>
          </q-form>
        </q-step>

        <!-- Step 2: معلومات الوثائق -->
        <q-step :name="2" title="معلومات الوثائق" icon="attach_file" :done="step > 2">
          <q-form ref="step2FormRef" class="q-gutter-sm q-pa-sm">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <CompressedPdfUploader
                  v-model:compressedfile="form.pdf_file"
                  label="ارفع ملف PDF (الحجم المسموح به حتى 20 MB)"
                />
              </div>
              <div class="col-12">
                <CustomQSelect
                  :lst-data="listStore.lstDirectorate"
                  label="دائرة الامتحانات"
                  :get-data="listStore.getDirectorate"
                  @update:model-value="(val) => (form.directorate_id = val ? String(val.id) : '')"
                  dense
                />
              </div>
            </div>
          </q-form>
        </q-step>

        <!-- Navigation -->
        <template v-slot:navigation>
          <q-stepper-navigation class="row justify-between q-px-sm q-pb-sm">
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              label="السابق"
              @click="stepperRef?.previous()"
            />
            <div v-else />
            <div class="row q-gutter-sm">
              <q-btn
                v-if="step < 2"
                unelevated
                color="primary"
                label="التالي"
                @click="nextStep"
              />
              <q-btn
                v-if="step === 2"
                unelevated
                color="primary"
                label="حفظ"
                :loading="loading"
                @click="save"
              />
            </div>
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar, QStepper, QForm } from 'quasar';
import { useListStore } from 'stores/list-store';
import { useRouter } from 'vue-router';
import CustomQSelect from 'src/components/common/CustomQSelect.vue';
import CompressedPdfUploader from 'src/components/common/CompressedPdfUploader.vue';

const $q = useQuasar();
const listStore = useListStore();
const router = useRouter();

const step = ref(1);
const stepperRef = ref<QStepper | null>(null);
const step1FormRef = ref<QForm | null>(null);
const step2FormRef = ref<QForm | null>(null);
const loading = ref(false);
const confirmPassword = ref('');

const genderOptions = [
  { label: 'ذكر', value: 'male' },
  { label: 'أنثى', value: 'female' },
];

const emptyForm = () => ({
  // Step 1
  first_name: '',
  father_name: '',
  last_name: '',
  gender: null as string | null,
  mother_name: '',
  mother_surname: '',
  nationality_id: '',
  mother_nationality_id: '',
  birth_date: '',
  email: '',
  password: '',
  contact_number: '',
  document_type_id: '',
  document_number: '',
  document_date: '',
  has_sequence: false,
  certificate_source_id: '',
  certificate_type_id: '',
  certificate_number: '',
  certificate_year: 0,
  grade: 0,
  // Step 2
  pdf_document_number: '',
  pdf_file: null as File | null,
  directorate_id: '',
});

const form = ref(emptyForm());

onMounted(() => {
  listStore.getNationality();
  listStore.getDocumentType();
  listStore.getCertificateSource();
  listStore.getRegistrationCertificate();
  listStore.getDirectorate();
});

const nextStep = async () => {
  const valid = (await step1FormRef.value?.validate()) ?? true;
  if (valid) {
    stepperRef.value?.next();
  } else {
    $q.notify({ type: 'warning', message: 'يرجى تعبئة جميع الحقول المطلوبة', position: 'top' });
  }
};

const save = async () => {
  const valid = (await step2FormRef.value?.validate()) ?? true;
  if (!valid) {
    $q.notify({ type: 'warning', message: 'يرجى تعبئة جميع الحقول المطلوبة', position: 'top' });
    return;
  }
  loading.value = true;
  try {
    // TODO: wire up to API endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000));
    $q.notify({ type: 'positive', message: 'تم حفظ بيانات الطالب بنجاح', position: 'top' });
    form.value = emptyForm();
    confirmPassword.value = '';
    step.value = 1;
    void router.push('/verify-email');
  } catch {
    $q.notify({ type: 'negative', message: 'حدث خطأ أثناء الحفظ. يرجى المحاولة مرة أخرى.', position: 'top' });
  } finally {
    loading.value = false;
  }
};
</script>
