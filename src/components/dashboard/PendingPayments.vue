<template>
  <div v-if="registrations.length > 0" class="q-mb-lg">
    <q-card class="bg-red-1 text-red-9 border-red shadow-1 q-pa-md">
      <div class="text-h6 text-weight-bold q-mb-sm flex items-center">
        <q-icon name="warning" class="q-mr-sm" />
        إكمال عملية التسجيل
      </div>
      <div v-for="reg in registrations" :key="reg.id" class="q-mb-md">
        <q-separator class="q-my-sm bg-red-2" />
        <div class="row items-center q-col-gutter-md">
          <div class="col-12 col-sm-6">
            <div class="text-subtitle2">الدورة الامتحانية:</div>
            <div>{{ reg.examination_period_name }}</div>
          </div>
          <div class="col-12 col-sm-6">
            <div class="text-subtitle2">المبلغ المطلوب:</div>
            <div class="text-weight-bold">
              {{ (reg.payment_value || 0).toLocaleString() }}
              {{ reg.currency_type_name || 'ل.س' }}
            </div>
          </div>
          <div class="col-12">
            <div class="bg-white q-pa-sm rounded-borders border-red-2 row items-center justify-between">
              <div>
                <div class="text-caption text-grey-7">رمز الدفع الإلكتروني (16 خانة):</div>
                <div class="text-h6 text-primary text-weight-bold letter-spacing-1">
                  {{ reg.payment_code ? formatPaymentCode(reg.payment_code) : '—' }}
                </div>
              </div>
              <q-btn
                flat
                round
                color="primary"
                icon="content_copy"
                :disable="!reg.payment_code"
                @click="reg.payment_code && copyCode(reg.payment_code)"
              />
            </div>
          </div>
          <div class="col-12 q-mt-sm">
            <div class="row q-col-gutter-sm items-center">
              <div class="col-grow">
                <q-input
                  dense
                  outlined
                  bg-color="white"
                  v-model="confirmationCodes[reg.id]"
                  label="أدخل رمز تأكيد الدفع"
                  placeholder="رمز الإيصال / رسالة التأكيد"
                />
              </div>
              <div class="col-auto">
                <q-btn
                  color="positive"
                  label="تأكيد الدفع"
                  icon="check_circle"
                  @click="handleConfirmPayment(reg)"
                  :loading="store.confirmPaymentState.loading"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useExamStore } from 'stores/exam';
import type { FreeStudentExaminationRegistration } from 'src/types';
import { useQuasar, copyToClipboard } from 'quasar';
import { reactive } from 'vue';

defineProps<{
  registrations: FreeStudentExaminationRegistration[]
}>();

const store = useExamStore();
const $q = useQuasar();

const confirmationCodes = reactive<Record<number, string>>({});

const formatPaymentCode = (code: string) => {
  return code.replace(/(.{4})/g, '$1 ').trim();
};

const copyCode = (code: string) => {
  copyToClipboard(code)
    .then(() => {
      $q.notify({ type: 'positive', message: 'تم نسخ رمز الدفع' });
    })
    .catch(() => {
      $q.notify({ type: 'negative', message: 'فشل النسخ' });
    });
};

const handleConfirmPayment = async (reg: FreeStudentExaminationRegistration) => {
  const code = confirmationCodes[reg.id];
  if (!code) {
    $q.notify({ type: 'warning', message: 'يرجى إدخال رمز التأكيد' });
    return;
  }

  const success = await store.confirmPayment(reg.id, code);
  if (success) {
    $q.notify({ type: 'positive', message: 'تم إرسال طلب تأكيد الدفع للمراجعة' });
  } else {
    $q.notify({ type: 'negative', message: 'حدث خطأ في تأكيد الدفع' });
  }
};
</script>
