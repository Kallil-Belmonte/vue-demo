<template>
  <Auth>
    <AppLoader v-if="isLoading" />

    <form class="register-form" @submit.prevent="submit">
      <h1 class="page-title">Register</h1>

      <div class="mb-3">
        <label class="form-label" for="first-name">First name</label>
        <input
          id="first-name"
          :class="getFieldClass(email)"
          type="firstName"
          v-model="firstName.value"
          ref="firstName.ref"
        />
        <div class="invalid-feedback" v-if="firstName.error">
          {{ firstName.error?.message }}
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label" for="last-name">Last name</label>
        <input
          id="last-name"
          :class="getFieldClass(email)"
          type="lastName"
          v-model="lastName.value"
          ref="lastName.ref"
        />
        <div class="invalid-feedback" v-if="lastName.error">
          {{ lastName.error?.message }}
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label" for="email">Email address</label>
        <input
          id="email"
          :class="getFieldClass(email)"
          type="email"
          v-model="email.value"
          ref="email.ref"
        />
        <div class="invalid-feedback" v-if="email.error">
          {{ email.error?.message }}
        </div>
      </div>

      <AppAlertDismissible
        v-for="(errorMessage, index) in serverErrors.email"
        :key="errorMessage"
        variant="danger"
        @dismiss="clearFormMessage(serverErrors.email, index)"
      >
        {{ errorMessage }}
      </AppAlertDismissible>

      <div class="mb-3">
        <label class="form-label" for="password">Password</label>
        <input
          id="password"
          :class="getFieldClass(password)"
          type="password"
          v-model="password.value"
          ref="password.ref"
        />
        <div class="invalid-feedback" v-if="password.error">
          {{ password.error?.message }}
        </div>
      </div>

      <AppAlertDismissible
        v-for="(errorMessage, index) in serverErrors.password"
        :key="errorMessage"
        variant="danger"
        @dismiss="clearFormMessage(serverErrors.password, index)"
      >
        {{ errorMessage }}
      </AppAlertDismissible>

      <AppAlertDismissible
        v-for="(errorMessage, index) in serverErrors.request"
        :key="errorMessage"
        variant="danger"
        @dismiss="clearFormMessage(serverErrors.request, index)"
      >
        {{ errorMessage }}
      </AppAlertDismissible>

      <button class="btn btn-primary d-block mx-auto" type="submit">Register</button>

      <div class="text-center">
        <hr class="mt-4" />
        Aleady have an account? <router-link to="/login">Login</router-link>
      </div>
    </form>
  </Auth>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue';

import { useRouter } from 'vue-router';
import { useForm } from 'vue-hooks-form';

import { RegisterFormState } from '@/pages/Auth/_files/types';
import { RegisterUserPayload } from '@/core/services/auth/types';
import { AUTH_TOKEN_KEY, EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { getFieldClass, clearFormMessage } from '@/shared/helpers';
import { registerUser } from '@/core/services';
import { setUser } from '@/core/state/auth';
import AppLoader from '@/shared/components/AppLoader.vue';
import AppAlertDismissible from '@/shared/components/AppAlertDismissible.vue';
import Auth from '../Auth.vue';

const router = useRouter();

const { useField } = useForm({
  defaultValues: {},
});

const state = reactive<RegisterFormState>({
  isLoading: false,
  firstName: useField('firstName', {
    rule: { required: true },
  }),
  lastName: useField('lastName', {
    rule: { required: true },
  }),
  email: useField('email', {
    rule: { required: true },
  }),
  password: useField('password', {
    rule: { required: true },
  }),
  serverErrors: { email: [], password: [], request: [] },
});
const { isLoading, firstName, lastName, email, password, serverErrors } = toRefs(state);

const submit = async () => {
  isLoading.value = true;
  serverErrors.value = { email: [], password: [], request: [] };

  try {
    const payload: RegisterUserPayload = {
      firstName: state.firstName.value,
      lastName: state.lastName.value,
      email: state.email.value,
      password: state.password.value,
    };

    const { token, firstName, lastName, email } = await registerUser(payload);

    if (state.email.value === 'demo@demo.com') {
      state.serverErrors.email.push('This e-mail already exists.');
      state.serverErrors.password.push('Your password is too weak.');
    } else {
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
      setUser({ firstName, lastName, email });
      router.push({ name: 'home' });
    }
  } catch (error: any) {
    state.serverErrors.request.push(error.message);
  } finally {
    isLoading.value = false;
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
