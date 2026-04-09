<template>
  <div>
    <div class="relative-position">
      <q-file
        accept=".pdf"
        :label="labelText"
        outlined
        dense
        stack-label
        :rules="[(val) => !!val || 'يجب رفع الوثائق']"
        :max-file-size="20 * 1024 * 1024"
        v-model="originalFile"
        @rejected="handleRejected"
        class="full-width"
      >
        <template #hint> ارفع ملف PDF (حتى 20 MB) </template>
      </q-file>

      <transition name="fade">
        <div v-if="isProcessing" class="uploader-progress absolute full-width">
          <div class="row items-center q-pa-xs bg-primary text-white rounded-borders">
            <q-icon name="hourglass_empty" class="q-mr-sm" />
            <div class="text-caption">جاري ضغط الملف...</div>
          </div>
          <q-linear-progress
            :value="progress / 100"
            color="primary"
            size="4px"
            class="q-mt-xs rounded-borders"
          />
        </div>
      </transition>
    </div>

    <q-slide-transition>
      <q-banner v-if="errorMessage" class="bg-red-1 text-dark q-mt-sm">
        <template #avatar>
          <q-icon name="error" color="red" />
        </template>
        {{ errorMessage }}
      </q-banner>
    </q-slide-transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
import type { QRejectedEntry } from "quasar";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const props = defineProps<{ label?: string }>();
const labelText = computed(() => props.label ?? "ارفع الوثائق بصيغة PDF");

const compressedFile = defineModel<File | null>("compressedfile");

const originalFile = ref<File | null>(null);
const errorMessage = ref("");
const isProcessing = ref(false);
const progress = ref(0);

// const originalSizeMB = computed(() =>
//   originalFile.value ? (originalFile.value.size / (1024 * 1024)).toFixed(1) : "0"
// );
// const compressedSizeMB = computed(() =>
//   compressedFile.value ? (compressedFile.value.size / (1024 * 1024)).toFixed(1) : "0"
// );

watch(originalFile, (newFile) => {
  if (newFile) {
    void handleFile([newFile]);
  }
});

async function handleFile(fileList: File[]) {
  progress.value = 0;

  errorMessage.value = "";
  isProcessing.value = true;
  const file = fileList[0];

  if (!file || file.type !== "application/pdf") {
    errorMessage.value = "الملف المرفوع ليس بصيغة PDF صالحة.";
    isProcessing.value = false;
    return;
  }

  const fileSizeMB = file.size / (1024 * 1024);

  if (fileSizeMB > 20) {
    errorMessage.value = "حجم الملف أكبر من 20 ميغا، يرجى رفع ملف أصغر.";
    compressedFile.value = null;
    isProcessing.value = false;
    return;
  }

  if (fileSizeMB < 2) {
    compressedFile.value = file;
    isProcessing.value = false;
    return;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    const pdfDoc = await PDFDocument.create();

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const context = canvas.getContext("2d")!;
      await page.render({
        canvasContext: context,
        viewport,
      }).promise;

      const imageDataUrl = canvas.toDataURL("image/jpeg", 0.7);
      const imgBytes = await fetch(imageDataUrl).then((res) => res.arrayBuffer());
      const image = await pdfDoc.embedJpg(imgBytes);

      const pageNew = pdfDoc.addPage([viewport.width, viewport.height]);
      pageNew.drawImage(image, {
        x: 0,
        y: 0,
        width: viewport.width,
        height: viewport.height,
      });

      progress.value = Math.round((i / pdf.numPages) * 100);
    }

    const compressedPdfBytes = await pdfDoc.save();
    const view = new Uint8Array(compressedPdfBytes.length);
    view.set(compressedPdfBytes);
    const pdfBlob = new Blob([view], { type: "application/pdf" });
    const compressed = new File([pdfBlob], `compressed-${file.name}`, {
      type: "application/pdf",
    });

    compressedFile.value = compressed.size >= file.size ? file : compressed;
  } catch (err) {
    console.error("PDF Compression Error:", err);
    errorMessage.value = "حدث خطأ أثناء ضغط الملف. حاول مرة أخرى أو ارفع نسخة أخف.";
    compressedFile.value = null;
    progress.value = 0;
  } finally {
    isProcessing.value = false;
    progress.value = 0;
  }
}

function handleRejected(rejections: QRejectedEntry[]) {
  if (!rejections || rejections.length === 0) return;
  const rejection = rejections[0]!;

  if (rejection.failedPropValidation === "accept") {
    errorMessage.value = "الملف غير مدعوم. الرجاء رفع ملف PDF فقط.";
  } else if (rejection.failedPropValidation === "max-file-size") {
    errorMessage.value = "حجم الملف أكبر من الحد المسموح (20 ميغا).";
  } else {
    errorMessage.value = "حدثت مشكلة في رفع الملف. تأكد من النوع والحجم.";
  }

  originalFile.value = null;
  compressedFile.value = null;
  isProcessing.value = false;
}
// function downloadCompressedFile() {
//   if (!compressedFile.value) return;

//   const url = URL.createObjectURL(compressedFile.value);
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = compressedFile.value.name;
//   link.click();
//   URL.revokeObjectURL(url);
// }
// function previewCompressedFile() {
//   if (!compressedFile.value) return;
//   const url = URL.createObjectURL(compressedFile.value);
//   window.open(url, "_blank");
//   URL.revokeObjectURL(url);
// }
// function clearFiles() {
//   originalFile.value = null;
//   compressedFile.value = null;
//   errorMessage.value = "";
// }
</script>

<style scoped>
.uploader-progress {
  top: -10px;
  left: 0;
  right: 0;
  z-index: 2;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
