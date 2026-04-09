<template>
  <q-page class="q-pa-md bg-grey-2 flex flex-center">
    <q-card
      class="q-pa-lg shadow-2 rounded-borders bg-white"
      style="width: 100%; max-width: 400px"
    >
      <div class="text-center q-mb-lg">
        <div class="text-h6 text-primary text-weight-bold q-mb-xs">تسجيل الدخول</div>
        <div class="text-caption text-grey-8">بوابة الطالب الإلكترونية</div>
      </div>

      <q-form @submit.prevent="submit">
        <q-input
          dense
          outlined
          v-model="email"
          label="البريد الإلكتروني"
          type="email"
          class="q-mb-md"
          :rules="[
            (val) => !!val || 'حقل مطلوب',
            (val) => /.+@.+\..+/.test(val) || 'البريد الإلكتروني غير صالح',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>

        <q-input
          dense
          outlined
          v-model="password"
          label="كلمة المرور"
          type="password"
          class="q-mb-lg"
          :rules="[(val) => !!val || 'حقل مطلوب']"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>

        <q-btn
          unelevated
          color="primary"
          label="تسجيل الدخول"
          class="full-width q-mb-md"
          type="submit"
          :loading="store.loginState.loading"
        />

        <div class="text-center">
          <q-btn flat color="primary" label="إنشاء حساب جديد" to="/register" size="sm" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStudentStore } from "stores/student";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const store = useStudentStore();
const router = useRouter();
const $q = useQuasar();

const email = ref("");
const password = ref("");

const submit = () => {
  store.login(email.value, password.value, () => {
    if (!store.isEmailVerified) {
      $q.notify({
        type: "info",
        message: "يرجى إدخال رمز التحقق المرسل إلى بريدك الإلكتروني",
        position: "top",
      });
      void router.push("/verify-email");
    } else {
      void router.push("/dashboard");
    }
  });
};
</script>
