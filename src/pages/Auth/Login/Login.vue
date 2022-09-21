<template>
  <Auth>
    <Loader v-if="isLoading" />

    <form class="login-form" @submit.prevent="submit">
      <h1 class="page-title">Login</h1>

      <div class="mb-3">
        <Input
          type="email"
          label="E-mail address"
          :field="email"
          :isFormSubmitted="isFormSubmitted"
        />
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
        <Input
          type="password"
          label="Password"
          :field="password"
          :isFormSubmitted="isFormSubmitted"
        />
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
        <Input
          type="checkbox"
          label="Keep logged"
          :baseClasses="['form-check-input']"
          :field="keepLogged"
          :isFormSubmitted="isFormSubmitted"
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
import { reactive, toRefs, computed, onMounted } from 'vue';

import { useRouter } from 'vue-router';

import { FormState } from '@/pages/Auth/_files/types';
import { AUTH_TOKEN_KEY, AUTH_EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { requiredEmail, requiredMin } from '@/shared/files/validations';
import { LoginUserPayload } from '@/core/services/auth/types';
import { clearFormMessage, validateFields } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { loginUser } from '@/core/services';
import { setUser } from '@/core/state/auth';
import { AlertDismissible, Loader, Input } from '@/shared/components';
import Auth from '../Auth.vue';

const router = useRouter();

const initialState: FormState = {
  isLoading: false,
  isFormSubmitted: false,
  serverErrors: { email: [], password: [], request: [] },
};

const state = reactive(initialState);
const { isLoading, isFormSubmitted: isFormSubmittedState, serverErrors } = toRefs(state);

const isFormSubmitted = computed(() => isFormSubmittedState);

const email = useField({ name: 'email', validation: requiredEmail });
const password = useField({ name: 'password', validation: requiredMin(3) });
const keepLogged = useField<boolean>({ name: 'keep-logged' });

const submit = async () => {
  state.isFormSubmitted = true;

  const isValidFields = [
    validateFields({ fields: [email], validation: requiredEmail }),
    validateFields({ fields: [password], validation: requiredMin(3) }),
  ].every(isValid => isValid);
  if (!isValidFields) return;

  state.isLoading = true;
  state.serverErrors = { email: [], password: [], request: [] };

  try {
    const payload: LoginUserPayload = {
      email: email.model.value,
      password: password.model.value,
      keepLogged: keepLogged.model.value,
    };

    const user = await loginUser(payload);

    const expirationDate = new Date(
      new Date().getTime() + Number(user.expiresIn) * 1000,
    ).toISOString();

    if (email.model.value === 'demo@demo.com') {
      state.serverErrors.email.push('This e-mail does not exists.');
      state.serverErrors.password.push('The password is incorrect.');
    } else {
      if (keepLogged.model.value) {
        localStorage.setItem(AUTH_TOKEN_KEY, user.token);
        localStorage.setItem(AUTH_EXPIRATION_DATE_KEY, expirationDate);
      } else {
        sessionStorage.setItem(AUTH_TOKEN_KEY, user.token);
      }

      setUser({ firstName: user.firstName, lastName: user.lastName, email: user.email });
      router.push({ name: 'home' });
    }
  } catch (error: any) {
    state.serverErrors.request.push(error.message);
  } finally {
    state.isLoading = false;
  }
};
</script>

<style lang="scss" scoped>
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
