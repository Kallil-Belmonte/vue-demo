<template>
  <Auth>
    <Loader v-if="loading" />

    <form class="login-form" @submit.prevent="submit">
      <h1 class="page-title">Login</h1>

      <div class="mb-3">
        <Input type="email" label="E-mail address" :field="email" :formSubmitted="formSubmitted" />
      </div>

      <AlertDismissible
        v-for="(errorMessage, index) in serverErrors.email"
        :key="errorMessage"
        variant="danger"
        @dismiss="clearFormMessage(serverErrors.email, index)"
      >
        {{ errorMessage }}
      </AlertDismissible>

      <div class="mb-3">
        <Input type="password" label="Password" :field="password" :formSubmitted="formSubmitted" />
      </div>

      <AlertDismissible
        v-for="(errorMessage, index) in serverErrors.password"
        :key="errorMessage"
        variant="danger"
        @dismiss="clearFormMessage(serverErrors.password, index)"
      >
        {{ errorMessage }}
      </AlertDismissible>

      <div class="form-check">
        <Checkbox
          label="Keep logged"
          :trueValue="true"
          :falseValue="false"
          :field="keepLogged"
          :formSubmitted="formSubmitted"
        />
      </div>

      <AlertDismissible
        v-for="(errorMessage, index) in serverErrors.request"
        :key="errorMessage"
        variant="danger"
        @dismiss="clearFormMessage(serverErrors.request, index)"
      >
        {{ errorMessage }}
      </AlertDismissible>

      <button class="btn btn-primary d-block mx-auto" type="submit">Login</button>

      <div class="text-center">
        <hr class="mt-4" />
        Don't have an account? <router-link to="/register">Register</router-link>
      </div>
    </form>
  </Auth>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useRouter } from 'vue-router';

import { AUTH_TOKEN_KEY } from '@/shared/files/consts';
import { requiredEmail, requiredMin } from '@/shared/files/validations';
import type { LoginUserPayload } from '@/core/services/auth/types';
import { clearFormMessage, validateForm } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { loginUser } from '@/core/services';
import { setUser } from '@/core/state/auth';
import { AlertDismissible, Loader, Input, Checkbox } from '@/shared/components';
import Auth from '../Auth.vue';

const loading = ref(false);
const formSubmitted = ref(false);
const serverErrors = ref<{ email: string[]; password: string[]; request: string[] }>({
  email: [],
  password: [],
  request: [],
});

const router = useRouter();

const email = useField({ name: 'email', validation: requiredEmail });
const password = useField({ name: 'password', validation: requiredMin(3) });
const keepLogged = useField<boolean>({ name: 'keep-logged' });

const submit = async () => {
  formSubmitted.value = true;

  const isValidForm = validateForm([
    { fields: [email], validation: requiredEmail },
    { fields: [password], validation: requiredMin(3) },
  ]);
  if (!isValidForm) return;

  loading.value = true;
  serverErrors.value = { email: [], password: [], request: [] };

  try {
    const payload: LoginUserPayload = {
      email: email.model.value,
      password: password.model.value,
      keepLogged: keepLogged.model.value,
    };

    const user = await loginUser(payload);

    if (email.model.value === 'demo@demo.com') {
      serverErrors.value.email.push('This e-mail does not exists.');
      serverErrors.value.password.push('The password is incorrect.');
    } else {
      if (keepLogged.model.value) localStorage.setItem(AUTH_TOKEN_KEY, user.token);
      else sessionStorage.setItem(AUTH_TOKEN_KEY, user.token);

      setUser({ firstName: user.firstName, lastName: user.lastName, email: user.email });
      router.push({ name: 'home' });
    }
  } catch (error: any) {
    serverErrors.value.request.push(error.message);
    loading.value = false;
  }
};
</script>

<style lang="scss">
.login-form {
  padding: 40px 40px 15px 40px;
  border-radius: 10px;
  background-color: #fff;
  margin-top: 50px;

  .page-title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
}
</style>
