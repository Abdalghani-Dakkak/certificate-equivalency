<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    @before-show="onBeforeShow"
    persistent
  >
    <q-card
      style="
        width: 500px;
        max-width: 90vw;
        display: flex;
        flex-direction: column;
        max-height: 90vh;
      "
    >
      <q-card-section class="bg-primary text-white q-py-sm">
        <div class="text-h6">تسجيل في الدورة الامتحانية</div>
        <div class="text-caption text-grey-3">{{ selectedCycle?.name }}</div>
      </q-card-section>

      <q-card-section class="q-pa-md scroll" style="flex: 1">
        <q-form class="q-gutter-sm">
          <CustomQSelect
            :lst-data="listStore.lstClassName"
            label="الصف"
            @update:model-value="
              (val) => (regForm.class_name_id = val ? String(val.id) : '')
            "
            :rules="[(val) => !!val || 'يرجى اختيار الصف']"
            dense
            outlined
          />
          <CustomQSelect
            :lst-data="listStore.lstCertificateLanguage"
            label="اللغة الأجنبية"
            @update:model-value="
              (val) =>
                (regForm.language_certificate_subject_id = val ? String(val.id) : '')
            "
            dense
            outlined
          />
          <CustomQSelect
            :lst-data="listStore.lstReligion"
            label="الديانة"
            @update:model-value="
              (val) => (regForm.religion_id = val ? String(val.id) : '')
            "
            dense
            outlined
          />
          <CustomQSelect
            :lst-data="listStore.lstDirectorate"
            label="المديرية"
            :dependent-lists="[listStore.lstCongregation]"
            @update:model-value="
              (val) => (regForm.directorate = val ? String(val.id) : '')
            "
            dense
            outlined
          />
          <CustomQSelect
            :lst-data="listStore.lstCongregation"
            label="المجمع"
            :get-data="
              () =>
                listStore.lstDirectorate.selected?.id &&
                listStore.getCongregation(listStore.lstDirectorate.selected.id)
            "
            :watch-value="listStore.lstDirectorate.selected"
            :dependency-required="true"
            @update:model-value="
              (val) => (regForm.congregation_id = val ? String(val.id) : '')
            "
            dense
            outlined
          />
          <CustomQSelect
            :lst-data="listStore.lstFreeSchool"
            label="المدرسة"
            :get-data="
              () =>
                listStore.lstCongregation.selected?.id &&
                listStore.getFreeSchool(listStore.lstCongregation.selected.id)
            "
            :watch-value="listStore.lstCongregation.selected"
            :dependency-required="true"
            @update:model-value="(val) => (regForm.school_id = val ? String(val.id) : '')"
            dense
            outlined
          />
          <template v-if="showOldCertificateFields">
            <CustomQSelect
              dense
              label="نوع الشهادة القديمة"
              :lst-data="listStore.lstRegistrationCertificate"
              @update:model-value="
                (val) => (regForm.old_certificate_id = val ? String(val.id) : '')
              "
              outlined
            />
            <CustomQSelect
              dense
              label="مصدر الشهادة القديمة"
              :lst-data="listStore.lstCertificateSource"
              @update:model-value="onSelectCertificateSource"
              outlined
            />
            <div class="row q-col-gutter-xs">
              <div class="col-6">
                <q-input
                  dense
                  outlined
                  v-model="regForm.old_certificate_number"
                  label="رقم الشهادة القديمة"
                />
              </div>
              <div class="col-6">
                <q-input
                  dense
                  outlined
                  v-model="regForm.old_certificate_year"
                  label="سنة الشهادة القديمة"
                />
              </div>
            </div>
          </template>

          <q-toggle v-model="regForm.healthy" label="لدي حالة صحية ؟" dense />
          <q-input
            outlined
            dense
            type="textarea"
            autogrow
            v-model="regForm.student_notes"
            label="ملاحظات (اختياري)"
          />
          <div v-if="showOldCertificateFields" class="q-mt-sm">
            <div class="text-subtitle2 text-grey-8 q-mb-xs">
              الوثائق المطلوبة (PDF فقط)
            </div>
            <CompressedPdfUploader
              v-model:compressedfile="attachments"
              label="ارفع الوثائق بصيغة PDF"
              dense
            />
            <div class="text-caption text-grey-7 q-mt-xs">
              <div class="text-weight-bold q-mb-xs">الوثائق المطلوبة للتحميل:</div>
              <ul class="q-pl-md q-mb-none">
                <li>
                  صورة مصدّقة عن وثيقة التعليم الأساسي لطلاب (الثانوية العامة – الثانوية
                  الشرعية).
                </li>
                <li>
                  صورة مصدّقة عن وثيقة التعليم الأساسي مرفقة بالتسلسل الدراسي للصفين
                  العاشر والحادي عشر لطلاب (الثانوية المهنية).
                </li>
              </ul>
            </div>
          </div>

          <!-- General Warning -->
          <q-banner
            v-if="showOldCertificateFields"
            class="bg-orange-1 text-orange-9 q-mt-sm rounded-borders"
            dense
          >
            <template v-slot:avatar>
              <q-icon name="warning" color="orange-9" size="sm" />
            </template>
            <div class="text-caption">
              تنبيه: أي نقص في الأوراق المطلوبة قد يؤدي إلى رفض طلب التسجيل.
            </div>
          </q-banner>
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="text-primary bg-grey-1">
        <q-btn flat label="إلغاء" v-close-popup color="grey-7" />
        <q-btn
          unelevated
          color="primary"
          label="تأكيد التسجيل"
          @click="confirmRegistration"
          :loading="store.registerState.loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useExamStore } from "stores/exam";
import { useListStore } from "stores/list-store";
import type { ExamCycle } from "src/types";
import type { TableModel } from "src/shared/shared";
import { useQuasar } from "quasar";
import CustomQSelect from "src/components/common/CustomQSelect.vue";
import CompressedPdfUploader from "src/components/common/CompressedPdfUploader.vue";

const props = defineProps<{
  modelValue: boolean;
  selectedCycle: ExamCycle | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "registered"): void;
}>();

const store = useExamStore();
const listStore = useListStore();
const $q = useQuasar();

function onBeforeShow() {
  // Reset form
  regForm.value = {
    examination_period_id: "",
    class_name_id: "",
    congregation_id: "",
    school_id: "",
    language_certificate_subject_id: "",
    religion_id: "",
    old_certificate_id: "",
    old_certificate_source_id: "",
    old_certificate_number: "",
    old_certificate_year: "",
    healthy: false,
    student_notes: "",
    directorate: "",
  };
  if (props.selectedCycle?.id) {
    listStore.getClassNameExaminationPeriod(props.selectedCycle.id);
    listStore.getCertificateLanguageByExaminationPeriod(props.selectedCycle.id);
  }
}
const regForm = ref<{
  examination_period_id: string;
  class_name_id: string;
  congregation_id: string;
  school_id: string;
  language_certificate_subject_id: string;
  religion_id: string;
  old_certificate_id: string;
  old_certificate_source_id: string;
  old_certificate_number: string;
  old_certificate_year: string;
  healthy: boolean;
  student_notes: string;
  directorate: string;
}>({
  examination_period_id: "",
  class_name_id: "",
  congregation_id: "",
  school_id: "",
  language_certificate_subject_id: "",
  religion_id: "",
  old_certificate_id: "",
  old_certificate_source_id: "",
  old_certificate_number: "",
  old_certificate_year: "",
  healthy: false,
  student_notes: "",
  directorate: "",
});

const attachments = ref<File | null>(null);

const showOldCertificateFields = computed(() => {
  const name = props.selectedCycle?.name || "";
  return !name.includes("ساسي");
});

const onSelectCertificateSource = (val: TableModel | null) => {
  regForm.value.old_certificate_source_id = val ? String(val.id) : "";
};

// Fetch initial data
onMounted(() => {
  listStore.getDirectorate();
  listStore.getReligion();
  listStore.getCertificateSource();
  listStore.getRegistrationCertificate();
  // Reset selections
  listStore.lstDirectorate.selected = null;
  listStore.lstReligion.selected = null;
  listStore.lstCertificateLanguage.selected = null;
  listStore.lstCongregation.selected = null;
  listStore.lstFreeSchool.selected = null;
  listStore.lstRegistrationCertificate.selected = null;

  if (props.selectedCycle?.id) {
    regForm.value.examination_period_id = String(props.selectedCycle.id);
  }
});

// Grades are now fetched dynamically via listStore.getClassNameExaminationPeriod

const confirmRegistration = async () => {
  if (
    !regForm.value.class_name_id ||
    !regForm.value.language_certificate_subject_id ||
    !regForm.value.religion_id ||
    !regForm.value.directorate ||
    !regForm.value.congregation_id ||
    !regForm.value.school_id
  ) {
    $q.notify({ type: "warning", message: "يرجى تعبئة كافة الحقول" });
    return;
  }

  if (props.selectedCycle) {
    if (showOldCertificateFields.value) {
      if (
        !regForm.value.old_certificate_id ||
        !regForm.value.old_certificate_source_id ||
        !regForm.value.old_certificate_number ||
        !regForm.value.old_certificate_year
      ) {
        $q.notify({ type: "warning", message: "يرجى تعبئة كافة الحقول" });
        return;
      } else {
        regForm.value.old_certificate_id = String(
          listStore.lstRegistrationCertificate.selected?.id || ""
        );
        regForm.value.old_certificate_source_id = String(
          listStore.lstCertificateSource.selected?.id || ""
        );
      }
    }
    await store.registerForCycle(props.selectedCycle.id, regForm.value, {
      attachments: attachments.value ? [attachments.value] : [],
    });

    if (store.registerState.error) {
      $q.notify({
        type: "negative",
        message: store.registerState.errorMessage || "فشل التسجيل",
      });
    } else {
      emit("update:modelValue", false);
      emit("registered");
      $q.notify({ type: "positive", message: "تم إرسال طلب التسجيل بنجاح" });
    }
  }
};
</script>
