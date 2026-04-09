<template>
  <LoadingState v-if="store.fetchRegistrationsState.loading" />
  <ErrorState
    v-else-if="store.fetchRegistrationsState.error"
    :title="'خطأ في تحميل التسجيلات'"
    :message="store.fetchRegistrationsState.errorMessage || 'حدث خطأ غير متوقع'"
    :retry="() => store.fetchRegistrations()"
  />

  <q-list v-else bordered class="bg-white rounded-borders">
    <q-item v-for="reg in myRegistrations" :key="reg.id" class="q-py-md">
      <q-item-section avatar>
        <q-avatar
          :color="getStatusInfo(reg)?.color"
          text-color="white"
          :icon="getStatusInfo(reg)?.icon"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-weight-bold text-subtitle1 q-mb-sm">
          {{ reg.examination_period_name }}
        </q-item-label>

        <div class="row q-col-gutter-sm text-body2 bg-grey-1 q-pa-sm rounded-borders">
          <div class="col-12 col-sm-6">
            <span class="text-grey-7">الصف الدراسي:</span>
            <span class="text-weight-bold q-ml-xs">
              {{ reg.class_name || "غير محدد" }}
            </span>
          </div>
          <div class="col-12 col-sm-6">
            <span class="text-grey-7">المديرية:</span>
            <span class="text-weight-bold q-ml-xs">
              {{ reg.directorate_name || "غير محدد" }}
            </span>
          </div>
          <div class="col-12 col-sm-6">
            <span class="text-grey-7">المجمع التربوي:</span>
            <span class="text-weight-bold q-ml-xs">
              {{ reg.congregation_name || "غير محدد" }}
            </span>
          </div>
          <div class="col-12 col-sm-6">
            <span class="text-grey-7">المدرسة:</span>
            <span class="text-weight-bold q-ml-xs">
              {{ reg.school_name || "غير محددة" }}
            </span>
          </div>
          <div class="col-12 col-sm-6">
            <span class="text-grey-7">لغة الامتحان:</span>
            <span class="text-weight-bold q-ml-xs">
              {{ reg.language_name || "غير محددة" }}
            </span>
          </div>
          <div class="col-12 col-sm-6">
            <span class="text-grey-7">الديانة:</span>
            <span class="text-weight-bold q-ml-xs">
              {{ reg.religion_name || "غير محددة" }}
            </span>
          </div>

          <!-- Old Certificate Information -->
          <div class="col-12 col-sm-6" v-if="reg.old_certificate_name">
            <span class="text-grey-7">الشهادة القديمة:</span>
            <span class="text-weight-bold q-ml-xs">{{ reg.old_certificate_name }}</span>
          </div>
          <div class="col-12 col-sm-6" v-if="reg.old_certificate_source_name">
            <span class="text-grey-7">مصدر الشهادة:</span>
            <span class="text-weight-bold q-ml-xs">{{
              reg.old_certificate_source_name
            }}</span>
          </div>
          <div class="col-12 col-sm-6" v-if="reg.old_certificate_number">
            <span class="text-grey-7">رقم الشهادة:</span>
            <span class="text-weight-bold q-ml-xs">{{ reg.old_certificate_number }}</span>
          </div>
          <div class="col-12 col-sm-6" v-if="reg.old_certificate_year">
            <span class="text-grey-7">سنة الشهادة:</span>
            <span class="text-weight-bold q-ml-xs">{{ reg.old_certificate_year }}</span>
          </div>

          <!-- Health Status -->
          <div class="col-12 col-sm-6" v-if="reg.healthy">
            <span class="text-weight-bold q-ml-xs">
              {{ "يوجد حالة صحية" }}
            </span>
          </div>

          <!-- Dates -->
          <div class="col-12 col-sm-6" v-if="reg.order_date">
            <span class="text-grey-7">تاريخ الطلب:</span>
            <span class="text-weight-bold q-ml-xs">{{ reg.order_date }}</span>
          </div>
          <div class="col-12 col-sm-6" v-if="reg.checking_date">
            <span class="text-grey-7">تاريخ التدقيق:</span>
            <span class="text-weight-bold q-ml-xs">{{ reg.checking_date }}</span>
          </div>
          <div class="col-12 col-sm-6" v-if="reg.verification_date">
            <span class="text-grey-7">تاريخ التثبيت:</span>
            <span class="text-weight-bold q-ml-xs">{{ reg.verification_date }}</span>
          </div>

          <!-- Payment Info -->
          <div class="col-12 col-sm-6" v-if="reg.payment_value">
            <span class="text-grey-7">قيمة الدفع:</span>
            <span class="text-weight-bold q-ml-xs">
              {{ reg.payment_value }} {{ reg.currency_type_name || "" }}
            </span>
          </div>
          <div class="col-12 col-sm-6" v-if="reg.payment_code">
            <span class="text-grey-7">كود الدفع:</span>
            <span class="text-weight-bold q-ml-xs">{{ reg.payment_code }}</span>
          </div>

          <div class="col-12">
            <span class="text-grey-7">ملاحظات:</span>
            <span class="text-weight-bold q-ml-xs">
              {{ reg.notes || "—" }}
            </span>
          </div>
        </div>

        <q-item-label caption class="q-mt-md">
          الحالة:
          <span :class="'text-' + getStatusInfo(reg)?.color" class="text-weight-bold">
            {{ getStatusInfo(reg)?.label }}
          </span>
        </q-item-label>

        <!-- Accepted: Exam Details -->
        <div
          v-if="reg.order_status === 'accepted'"
          class="q-mt-md bg-green-1 border-green q-pa-md rounded-borders"
        >
          <div class="text-subtitle2 text-green-9 q-mb-sm flex items-center">
            <q-icon name="badge" class="q-mr-xs" />
            تم قبول طلبك، ستظهر بيانات البطاقة الامتحانية لاحقاً.
          </div>
        </div>

        <!-- Rejection Message -->
        <div
          v-if="reg.order_status === 'rejected'"
          class="q-mt-sm bg-red-1 text-red-9 q-pa-sm rounded-borders text-caption"
        >
          <q-icon name="error" class="q-mr-xs" />
          عذراً، طلبك مرفوض. يرجى مراجعة دائرة الامتحانات في
          {{ reg.directorate_name || "المديرية المختصة" }} لمعرفة الأسباب.
        </div>

        <div class="row justify-end q-mt-sm">
          <q-btn
            outline
            color="primary"
            label="عرض المرفقات"
            size="sm"
            icon="attach_file"
            @click="handleShowDocuments(reg.id)"
          />
        </div>
      </q-item-section>
    </q-item>
    <div v-if="myRegistrations.length === 0" class="text-center q-pa-md text-grey">
      لا يوجد تسجيلات سابقة.
    </div>
  </q-list>

  <q-dialog v-model="showDocumentsDialog">
    <q-card
      class="column"
      style="min-width: 350px; width: 900px; max-width: 90vw; height: 90vh"
    >
      <q-card-section>
        <div class="text-h6">المرفقات</div>
      </q-card-section>

      <q-card-section class="q-pt-none col" style="width: 100%">
        <CustomShowReportComponent
          :pdf-url="selectedDocumentUrl || ''"
          :loading="store.fetchMoreDocumentsState.loading"
          style="height: 100%"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="إغلاق" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useExamStore } from "stores/exam";
import LoadingState from "src/components/common/LoadingState.vue";
import ErrorState from "src/components/common/ErrorState.vue";
import { FreeStudentExaminationRegistration } from "src/types";
import CustomShowReportComponent from "src/components/CustomShowReportComponent.vue";

const store = useExamStore();
const myRegistrations = computed(() => store.myRegistrations);

const showDocumentsDialog = ref(false);
const selectedDocumentUrl = ref<string | null>(null);

const handleShowDocuments = async (id: number) => {
  showDocumentsDialog.value = true;
  selectedDocumentUrl.value = null;
  await store.fetchMoreDocuments(id).then((res) => {
    if (res) {
      selectedDocumentUrl.value = URL.createObjectURL(res);
    }
  });
};

const getStatusInfo = (status: FreeStudentExaminationRegistration) => {
  if (!status.verification_date) {
    return { label: "بانتظار الدفع", color: "warning", icon: "payment" };
  } else {
    const normalized = (status.order_status || "").toLowerCase();
    switch (normalized) {
      case "accepted":
        return { label: "مقبول - تم التثبيت", color: "positive", icon: "check_circle" };
      case "rejected":
        return { label: "مرفوض", color: "negative", icon: "cancel" };
      case "under_review":
        return {
          label: "قيد المراجعة - جاري تدقيق طلب التسجيل",
          color: "orange",
          icon: "hourglass_top",
        };
    }
  }
};
</script>
