<template>
  <Auth>
    <Loader v-if="isLoading" />

    <form class="login-form" @submit.prevent="submit">
      <h1 class="page-title">Login</h1>

      <div class="mb-3">
        <label class="form-label" for="email">E-mail address</label>
        <input
          id="email"
          :class="getFieldClass(emailState)"
          type="email"
          name="email"
          v-model="email"
          ref="emailRef"
        />
        <div class="invalid-feedback" v-for="errorMessage in emailState.errorMessages">
          {{ errorMessage }}
        </div>
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
        <label class="form-label" for="password">Password</label>
        <input
          id="password"
          :class="getFieldClass(passwordState)"
          type="password"
          name="password"
          v-model="password"
          ref="passwordRef"
        />
        <div class="invalid-feedback" v-for="errorMessage in passwordState.errorMessages">
          {{ errorMessage }}
        </div>
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
        <input
          class="form-check-input"
          type="checkbox"
          id="keep-logged"
          v-model="keepLogged"
          ref="keepLoggedRef"
        />
        <label class="form-check-label" for="keep-logged">Keep logged</label>
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
import { reactive, toRefs } from 'vue';

import { useRouter } from 'vue-router';

import { FormState } from '@/pages/Auth/_files/types';
import { AUTH_TOKEN_KEY, AUTH_EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { LoginUserPayload } from '@/core/services/auth/types';
import { getFieldClass, clearFormMessage, validateFieldsState } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { loginUser } from '@/core/services';
import { setUser } from '@/core/state/auth';
import { AlertDismissible, Loader } from '@/shared/components';
import Auth from '../Auth.vue';

const router = useRouter();

const initialState: FormState = {
  isLoading: false,
  serverErrors: { email: [], password: [], request: [] },
};

const state = reactive(initialState);
const { isLoading, serverErrors } = toRefs(state);

const [email, emailRef, emailState] = useField({
  validation: { required: { check: true }, email: { check: true } },
});
const [password, passwordRef, passwordState] = useField({
  validation: { required: { check: true }, min: { check: 3 } },
});
const [keepLogged, keepLoggedRef] = useField<boolean>();

const submit = async () => {
  const isValidFields = validateFieldsState([emailState, passwordState]);
  if (!isValidFields) return;

  state.isLoading = true;
  state.serverErrors = { email: [], password: [], request: [] };

  try {
    const payload: LoginUserPayload = {
      email: email.value,
      password: password.value,
      keepLogged: keepLogged.value,
    };

    const user = await loginUser(payload);

    const expirationDate = new Date(
      new Date().getTime() + Number(user.expiresIn) * 1000,
    ).toISOString();

    if (email.value === 'demo@demo.com') {
      state.serverErrors.email.push('This e-mail does not exists.');
      state.serverErrors.password.push('The password is incorrect.');
    } else {
      if (keepLogged.value) {
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
