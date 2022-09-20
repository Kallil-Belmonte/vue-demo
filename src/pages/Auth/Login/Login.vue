<template>
  <Auth>
    <Loader v-if="isLoading" />

    <form class="login-form" @submit.prevent="submit">
      <h1 class="page-title">Login</h1>

      <div class="mb-3">
        <label class="form-label" for="email">E-mail address</label>
        <input
          id="email"
          :class="getFieldClass(isFormSubmitted, email)"
          type="email"
          :name="emailState.name"
          v-model="emailModel"
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
          :class="getFieldClass(isFormSubmitted, password)"
          type="password"
          :name="passwordState.name"
          v-model="passwordModel"
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
          id="keep-logged"
          class="form-check-input"
          type="checkbox"
          :name="keepLoggedState.name"
          v-model="keepLoggedModel"
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
import { requiredEmail, requiredMin } from '@/shared/files/validations';
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
  isFormSubmitted: false,
  serverErrors: { email: [], password: [], request: [] },
};

const state = reactive(initialState);
const { isLoading, isFormSubmitted, serverErrors } = toRefs(state);

const email = useField({ name: 'email', validation: requiredEmail });
const { model: emailModel, ref: emailRef, state: emailState } = email;

const password = useField({ name: 'password', validation: requiredMin(3) });
const { model: passwordModel, ref: passwordRef, state: passwordState } = password;

const keepLogged = useField<boolean>({ name: 'keepLogged' });
const { model: keepLoggedModel, ref: keepLoggedRef, state: keepLoggedState } = keepLogged;

const submit = async () => {
  state.isFormSubmitted = true;

  const isValidFields = [
    validateFieldsState({
      fields: [email],
      validation: requiredEmail,
    }),
    validateFieldsState({
      fields: [password],
      validation: requiredMin(3),
    }),
  ].every(isValid => isValid);
  if (!isValidFields) return;

  state.isLoading = true;
  state.serverErrors = { email: [], password: [], request: [] };

  try {
    const payload: LoginUserPayload = {
      email: emailModel.value,
      password: passwordModel.value,
      keepLogged: keepLoggedModel.value,
    };

    const user = await loginUser(payload);

    const expirationDate = new Date(
      new Date().getTime() + Number(user.expiresIn) * 1000,
    ).toISOString();

    if (emailModel.value === 'demo@demo.com') {
      state.serverErrors.email.push('This e-mail does not exists.');
      state.serverErrors.password.push('The password is incorrect.');
    } else {
      if (keepLoggedModel.value) {
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
