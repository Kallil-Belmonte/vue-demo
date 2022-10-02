<template>
  <Auth>
    <Loader v-if="loading" />

    <form class="register-form" @submit.prevent="submit">
      <h1 class="page-title">Register</h1>

      <div class="mb-3">
        <Input label="First name" :field="firstName" :formSubmitted="formSubmitted" />
      </div>

      <div class="mb-3">
        <Input label="Last name" :field="lastName" :formSubmitted="formSubmitted" />
      </div>

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

      <AlertDismissible
        v-for="(errorMessage, index) in serverErrors.request"
        :key="errorMessage"
        variant="danger"
        @dismiss="clearFormMessage(serverErrors.request, index)"
      >
        {{ errorMessage }}
      </AlertDismissible>

      <button class="btn btn-primary d-block mx-auto" type="submit">Register</button>

      <div class="text-center">
        <hr class="mt-4" />
        Aleady have an account? <router-link to="/login">Login</router-link>
      </div>
    </form>
  </Auth>
</template>

<script lang="ts" setup>
import { reactive, toRefs, computed } from 'vue';

import { useRouter } from 'vue-router';

import { FormState } from '@/pages/Auth/_files/types';
import { RegisterUserPayload } from '@/core/services/auth/types';
import { AUTH_TOKEN_KEY } from '@/shared/files/consts';
import { requiredEmail, requiredMin } from '@/shared/files/validations';
import { clearFormMessage, validateForm } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { registerUser } from '@/core/services';
import { setUser } from '@/core/state/auth';
import { AlertDismissible, Loader, Input } from '@/shared/components';
import Auth from '../Auth.vue';

const router = useRouter();

const initialState: FormState = {
  loading: false,
  formSubmitted: false,
  serverErrors: { email: [], password: [], request: [] },
};

const state = reactive(initialState);
const { loading, formSubmitted, serverErrors } = toRefs(state);

const firstName = useField({ name: 'first-name', validation: requiredMin(2) });
const lastName = useField({ name: 'last-name', validation: requiredMin(2) });
const email = useField({ name: 'email', validation: requiredEmail });
const password = useField({ name: 'password', validation: requiredMin(3) });

const submit = async () => {
  state.formSubmitted = true;

  const isValidForm = validateForm([
    { fields: [firstName, lastName], validation: requiredMin(2) },
    { fields: [email], validation: requiredEmail },
    { fields: [password], validation: requiredMin(3) },
  ]);
  if (!isValidForm) return;

  state.loading = true;
  state.serverErrors = { email: [], password: [], request: [] };

  try {
    const payload: RegisterUserPayload = {
      firstName: firstName.model.value,
      lastName: lastName.model.value,
      email: email.model.value,
      password: password.model.value,
    };

    const user = await registerUser(payload);

    if (email.model.value === 'demo@demo.com') {
      state.serverErrors.email.push('This e-mail already exists.');
      state.serverErrors.password.push('Your password is too weak.');
    } else {
      sessionStorage.setItem(AUTH_TOKEN_KEY, user.token);
      setUser({ firstName: user.firstName, lastName: user.lastName, email: user.email });
      router.push({ name: 'home' });
    }
  } catch (error: any) {
    state.serverErrors.request.push(error.message);
  } finally {
    state.loading = false;
  }
};
</script>

<style lang="scss" scoped>
.register-form {
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
