<template>
  <Auth>
    <Loader v-if="loading" />

    <form class="login-form" @submit.prevent="submit">
      <h1 class="page-title">Login</h1>

      <div class="mb-3">
        <Input
          ref="emailComponent"
          icon="Email"
          label="E-mail"
          type="email"
          name="email"
          required
          placeholder="Enter your e-mail"
          :input="inputEmail"
          v-model="email"
        />
      </div>

      <div class="mb-3">
        <Input
          label="Password"
          type="password"
          name="password"
          required
          minlength="3"
          placeholder="Enter your password"
          v-model="password"
        />
      </div>

      <Checkbox
        label="Keep logged"
        name="keep-logged"
        :trueValue="true"
        :falseValue="false"
        v-model="keepLogged"
      />

      <Button class="d-block mx-auto" type="submit">Login</Button>

      <div class="text-center">
        <hr class="mt-4" />
        Don't have an account? <router-link to="/register">Register</router-link>
      </div>
    </form>
  </Auth>
</template>

<script lang="ts" setup>
import { useTemplateRef, ref } from 'vue';

import { useRouter } from 'vue-router';

import { AUTH_TOKEN_KEY } from '@/shared/files/consts';
import type { LoginUserPayload } from '@/core/services/auth/types';
import { loginUser } from '@/core/services';
import { setUser } from '@/core/state/auth';
import { Loader, Input, Checkbox, Button } from '@/shared/components';
import Auth from '../Auth.vue';

const router = useRouter();

const emailComponent = useTemplateRef('emailComponent');

const loading = ref(false);
const email = ref('');
const password = ref('');
const keepLogged = ref(false);

const inputEmail = (event: Event) => {
  const { value } = event.target as HTMLInputElement;

  emailComponent.value?.field?.setCustomValidity(
    value === 'demo@demo.com' ? 'This e-mail does not exists.' : '',
  );
};

const submit = async () => {
  loading.value = true;

  try {
    const payload: LoginUserPayload = {
      email: email.value,
      password: password.value,
      keepLogged: keepLogged.value,
    };

    const user = await loginUser(payload);

    if (keepLogged.value) localStorage.setItem(AUTH_TOKEN_KEY, user.token);
    else sessionStorage.setItem(AUTH_TOKEN_KEY, user.token);

    setUser({ firstName: user.firstName, lastName: user.lastName, email: user.email });
    router.push({ name: 'home' });
  } catch (error: any) {
    loading.value = false;
  }
};
</script>

<style lang="scss">
[data-page='Auth'] .login-form {
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
