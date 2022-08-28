<template>
  <Auth>
    <Loader v-if="isLoading" />

    <form class="login-form" @submit.prevent="submit">
      <h1 class="page-title">Login</h1>

      <div class="mb-3">
        <label class="form-label" for="email">E-mail address</label>
        <input
          id="email"
          :class="getFieldClass(email)"
          type="email"
          name="email"
          v-model="email.value"
          ref="email.ref"
        />
        <div class="invalid-feedback" v-if="email.error">
          {{ (email.error as any).message }}
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
          :class="getFieldClass(password)"
          type="password"
          name="password"
          v-model="password.value"
          ref="password.ref"
        />
        <div class="invalid-feedback" v-if="password.error">
          {{ (password.error as any).message }}
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
          v-model="keepLogged.value"
          ref="keepLogged.ref"
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
import { useForm } from 'vue-hooks-form';

import { LoginFormState } from '@/pages/Auth/_files/types';
import { AUTH_TOKEN_KEY, EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { LoginUserPayload } from '@/core/services/auth/types';
import { getFieldClass, clearFormMessage, validateFields, emailValidator } from '@/shared/helpers';
import { loginUser } from '@/core/services';
import { setUser } from '@/core/state/auth';
import { AlertDismissible, Loader } from '@/shared/components';
import Auth from '../Auth.vue';

const fields = ['E-mail', 'Password', 'Keep logged'];

const router = useRouter();

const { useField, validateField } = useForm({ defaultValues: {} });

const initialState: LoginFormState = {
  isLoading: false,
  email: useField('E-mail', {
    rule: { required: true, validator: emailValidator },
  }),
  password: useField('Password', {
    rule: { required: true, min: 3 },
  }),
  keepLogged: useField('Keep logged'),
  serverErrors: { email: [], password: [], request: [] },
};

const state = reactive(initialState);
const { isLoading, email, password, keepLogged, serverErrors } = toRefs(state);

const submit = async () => {
  const errors = await validateFields(fields, validateField);
  if (errors.length) return;

  state.isLoading = true;
  state.serverErrors = { email: [], password: [], request: [] };

  try {
    const payload: LoginUserPayload = {
      email: state.email.value,
      password: state.password.value,
      keepLogged: state.keepLogged.value,
    };

    const { token, expiresIn, firstName, lastName, email } = await loginUser(payload);

    const expirationDate = new Date(new Date().getTime() + Number(expiresIn) * 1000).toISOString();

    if (state.email.value === 'demo@demo.com') {
      state.serverErrors.email.push('This e-mail does not exists.');
      state.serverErrors.password.push('The password is incorrect.');
    } else {
      if (state.keepLogged.value) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(EXPIRATION_DATE_KEY, expirationDate);
      } else {
        sessionStorage.setItem(AUTH_TOKEN_KEY, token);
      }

      setUser({ firstName, lastName, email });
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
