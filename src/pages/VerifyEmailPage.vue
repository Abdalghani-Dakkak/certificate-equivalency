<template>
  <q-page class="q-pa-md bg-grey-2 flex flex-center">
    <q-card
      class="q-pa-lg shadow-2 rounded-borders bg-white"
      style="width: 100%; max-width: 400px"
    >
      <div class="text-center q-mb-lg">
        <q-icon name="mark_email_read" size="4rem" color="primary" class="q-mb-md" />
        <div class="text-h6 text-primary text-weight-bold">
          التحقق من البريد الإلكتروني
        </div>
        <div class="text-caption text-grey-8 q-mt-sm">
          تم إرسال رمز التحقق إلى: <br />
          <span class="text-weight-bold">{{
            store.loginState.value?.email || "البريد المسجل"
          }}</span>
        </div>
      </div>

      <q-form @submit.prevent="verify">
        <div class="text-center q-mb-md">
          <div class="text-grey-7 q-mb-xs text-caption">أدخل رمز التحقق (123456)</div>
          <q-input
            outlined
            v-model="code"
            mask="######"
            placeholder="- - - - - -"
            class="text-center text-h5 letter-spacing-md"
            input-class="text-center"
            :rules="[
              (val) => !!val || 'رمز التحقق مطلوب',
              (val) => val.length === 6 || 'يجب أن يكون 6 أرقام',
            ]"
          />
        </div>

        <q-btn
          unelevated
          color="primary"
          label="تحقق ودخول"
          class="full-width q-mb-md"
          type="submit"
          :loading="store.verifyEmailState.loading"
        />

        <div class="text-center">
          <q-btn
            flat
            color="grey-7"
            label="لم يصلك الرمز؟ إعادة إرسال"
            size="sm"
            @click="resendCode"
            :disable="resendCooldown > 0"
          />
          <div v-if="resendCooldown > 0" class="text-caption text-grey-5 q-mt-xs">
            يمكنك إعادة الإرسال بعد {{ resendCooldown }} ثانية
          </div>
        </div>

        <div class="text-center q-mt-md">
          <q-btn flat color="negative" label="تسجيل خروج" @click="logout" size="sm" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStudentStore } from "stores/student";
import { useRouter } from "vue-router";

const store = useStudentStore();
const router = useRouter();
const code = ref("");
const resendCooldown = ref(0);

const verify = () => {
  store.verifyEmail(code.value, () => void router.push("/dashboard"));
};

const resendCode = async () => {
  await store.resendVerificationCode();

  // Start cooldown
  resendCooldown.value = 60;
  const interval = setInterval(() => {
    resendCooldown.value--;
    if (resendCooldown.value <= 0) {
      clearInterval(interval);
    }
  }, 1000);
};

const logout = () => {
  store.logout();
  void router.push("/login");
};
</script>

<style scoped>
.letter-spacing-md :deep(input) {
  letter-spacing: 0.5em;
  font-weight: bold;
}
</style>
