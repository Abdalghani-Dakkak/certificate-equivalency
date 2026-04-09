<template>
  <q-page class="bg-grey-1 font-cairo q-pa-md">
    <div class="equivalency-shell q-mx-auto">

      <!-- Page Header -->
      <div class="row items-center q-mb-lg q-gutter-md">
        <div class="col">
          <div class="text-h5 text-weight-bold text-primary">معادلة الشهادات الأجنبية</div>
          <div class="text-caption text-grey-7 q-mt-xs">
            خدمة رسمية معتمدة من وزارة التربية والتعليم للجمهورية العربية السورية
          </div>
        </div>
        <div class="col-auto">
          <q-icon name="workspace_premium" size="3rem" color="primary" />
        </div>
      </div>

      <q-separator class="q-mb-lg" />

      <!-- Info Banner -->
      <q-banner class="bg-blue-1 text-blue-9 q-mb-lg rounded-borders" rounded>
        <template v-slot:avatar>
          <q-icon name="info" color="blue-7" />
        </template>
        يُرجى تعبئة جميع الحقول المطلوبة بدقة. سيتم مراجعة طلبك من قِبَل الجهات المختصة والتواصل معك عبر البريد الإلكتروني المسجّل.
      </q-banner>

      <q-form @submit.prevent="submitForm" ref="formRef">
        <!-- Section 1: Personal Info -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section class="q-pb-none">
            <div class="section-title text-primary">أولاً: البيانات الشخصية</div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6 col-md-3">
                <q-input
                  dense outlined
                  v-model="form.first_name"
                  label="الاسم الأول *"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-input
                  dense outlined
                  v-model="form.father_name"
                  label="اسم الأب *"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-input
                  dense outlined
                  v-model="form.grandfather_name"
                  label="اسم الجد *"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-input
                  dense outlined
                  v-model="form.last_name"
                  label="الكنية *"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-input
                  dense outlined
                  v-model="form.mother_name"
                  label="اسم الأم *"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-input
                  dense outlined
                  v-model="form.birth_date"
                  label="تاريخ الولادة *"
                  type="date"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-input
                  dense outlined
                  v-model="form.birth_place"
                  label="مكان الولادة *"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-select
                  dense outlined
                  v-model="form.gender"
                  :options="genderOptions"
                  label="الجنس *"
                  emit-value map-options
                  :rules="[(v) => v !== null || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  dense outlined
                  v-model="form.card_number"
                  label="رقم الهوية / الوثيقة *"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  dense outlined
                  v-model="form.contact_number"
                  label="رقم الهاتف *"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  dense outlined
                  v-model="form.email"
                  label="البريد الإلكتروني *"
                  type="email"
                  :rules="[(v) => !!v || 'مطلوب', (v) => /.+@.+\..+/.test(v) || 'غير صالح']"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Section 2: Foreign Certificate Info -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section class="q-pb-none">
            <div class="section-title text-primary">ثانياً: بيانات الشهادة الأجنبية</div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  dense outlined
                  v-model="form.cert_country"
                  label="الدولة المانحة للشهادة *"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  dense outlined
                  v-model="form.cert_name"
                  label="اسم الشهادة *"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  dense outlined
                  v-model="form.cert_year"
                  label="سنة الحصول على الشهادة *"
                  mask="####"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  dense outlined
                  v-model="form.cert_number"
                  label="رقم الشهادة *"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-input
                  dense outlined
                  v-model="form.issuing_authority"
                  label="الجهة المانحة *"
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-4">
                <q-select
                  dense outlined
                  v-model="form.requested_equiv"
                  :options="equivOptions"
                  label="المعادلة المطلوبة *"
                  emit-value map-options
                  :rules="[(v) => !!v || 'مطلوب']"
                />
              </div>
              <div class="col-12">
                <q-input
                  dense outlined
                  v-model="form.notes"
                  label="ملاحظات إضافية"
                  type="textarea"
                  rows="3"
                  autogrow
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Section 3: Attachments -->
        <q-card flat bordered class="q-mb-lg">
          <q-card-section class="q-pb-none">
            <div class="section-title text-primary">ثالثاً: المستندات المطلوبة</div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <div class="text-caption text-grey-7 q-mb-xs">صورة عن الشهادة الأجنبية *</div>
                <q-file
                  dense outlined
                  v-model="form.cert_file"
                  label="رفع الشهادة"
                  accept=".pdf,.jpg,.jpeg,.png"
                  :rules="[(v) => !!v || 'مطلوب']"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
              <div class="col-12 col-sm-6">
                <div class="text-caption text-grey-7 q-mb-xs">صورة عن وثيقة الهوية *</div>
                <q-file
                  dense outlined
                  v-model="form.id_file"
                  label="رفع الهوية"
                  accept=".pdf,.jpg,.jpeg,.png"
                  :rules="[(v) => !!v || 'مطلوب']"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-file>
              </div>
            </div>

            <q-banner class="bg-amber-1 text-amber-9 q-mt-md rounded-borders" dense rounded>
              <template v-slot:avatar>
                <q-icon name="warning" color="amber-8" size="sm" />
              </template>
              الملفات المقبولة: PDF, JPG, PNG — الحجم الأقصى لكل ملف: 5 ميغابايت
            </q-banner>
          </q-card-section>
        </q-card>

        <!-- Submit -->
        <div class="row justify-end q-gutter-sm">
          <q-btn
            flat
            label="إعادة تعيين"
            color="grey-7"
            @click="resetForm"
          />
          <q-btn
            unelevated
            type="submit"
            label="تقديم الطلب"
            color="primary"
            icon="send"
            :loading="loading"
          />
        </div>
      </q-form>

    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const formRef = ref();
const loading = ref(false);

const genderOptions = [
  { label: 'ذكر', value: 'male' },
  { label: 'أنثى', value: 'female' },
];

const equivOptions = [
  { label: 'شهادة الثانوية العامة (العلمي)', value: 'scientific' },
  { label: 'شهادة الثانوية العامة (الأدبي)', value: 'literary' },
  { label: 'شهادة الثانوية المهنية', value: 'vocational' },
  { label: 'شهادة الثانوية الشرعية', value: 'sharia' },
];

const emptyForm = () => ({
  first_name: '',
  father_name: '',
  grandfather_name: '',
  last_name: '',
  mother_name: '',
  birth_date: '',
  birth_place: '',
  gender: null as string | null,
  card_number: '',
  contact_number: '',
  email: '',
  cert_country: '',
  cert_name: '',
  cert_year: '',
  cert_number: '',
  issuing_authority: '',
  requested_equiv: null as string | null,
  notes: '',
  cert_file: null as File | null,
  id_file: null as File | null,
});

const form = ref(emptyForm());

const submitForm = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) return;

  loading.value = true;
  try {
    // TODO: wire up to API endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000));
    $q.notify({ type: 'positive', message: 'تم تقديم طلب المعادلة بنجاح. سيتم التواصل معك قريباً.', position: 'top' });
    form.value = emptyForm();
    formRef.value?.resetValidation();
  } catch {
    $q.notify({ type: 'negative', message: 'حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.', position: 'top' });
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.value = emptyForm();
  formRef.value?.resetValidation();
};
</script>

<style scoped>
.equivalency-shell {
  max-width: 960px;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 700;
  padding-bottom: 8px;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 4px;
}
</style>
