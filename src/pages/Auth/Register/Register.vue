<template>
  <Auth>
    <Loader v-if="loading" />

    <form class="register-form" @submit.prevent="submit">
      <h1 class="page-title">Register</h1>

      <div class="mb-3">
        <Input
          label="Name"
          name="first-name"
          required
          minlength="2"
          maxlength="150"
          placeholder="First name"
          v-model="firstName"
        />
      </div>

      <div class="mb-3">
        <Input
          label="Last name"
          name="last-name"
          required
          minlength="2"
          maxlength="150"
          placeholder="Full last name"
          v-model="lastName"
        />
      </div>

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

      <Button class="d-block mx-auto" type="submit">Register</Button>

      <div class="text-center">
        <hr class="mt-4" />
        Aleady have an account? <router-link to="/login">Login</router-link>
      </div>
    </form>
  </Auth>
</template>

<script lang="ts" setup>
import { useTemplateRef, ref } from 'vue';

import { useRouter } from 'vue-router';

import type { RegisterUserPayload } from '@/core/services/auth/types';
import { AUTH_TOKEN_KEY } from '@/shared/files/consts';
import { registerUser } from '@/core/services';
import { setUser } from '@/core/state/auth';
import { Loader, Input, Button } from '@/shared/components';
import Auth from '../Auth.vue';

const router = useRouter();

const emailComponent = useTemplateRef('emailComponent');

const loading = ref(false);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const inputEmail = (event: Event) => {
  const { value } = event.target as HTMLInputElement;

  emailComponent.value?.field?.setCustomValidity(
    value === 'demo@demo.com' ? 'This e-mail does not exists.' : '',
  );
};

const submit = async () => {
  loading.value = true;

  try {
    const payload: RegisterUserPayload = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    };

    const user = await registerUser(payload);

    sessionStorage.setItem(AUTH_TOKEN_KEY, user.token);
    setUser({ firstName: user.firstName, lastName: user.lastName, email: user.email });
    router.push({ name: 'home' });
  } catch (error: any) {
    loading.value = false;
  }
};
</script>

<style lang="scss">
[data-page='auth'] .register-form {
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
