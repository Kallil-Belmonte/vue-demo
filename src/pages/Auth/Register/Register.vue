<template>
  <Auth>
    <Loader v-if="isLoading" />

    <form class="register-form" @submit.prevent="submit">
      <h1 class="page-title">Register</h1>

      <div class="mb-3">
        <label class="form-label" for="first-name">First name</label>
        <input
          id="first-name"
          :class="getFieldClass(isFormSubmitted, firstName)"
          type="text"
          :name="firstNameState.name"
          v-model="firstNameModel"
          ref="firstNameRef"
        />
        <div class="invalid-feedback" v-for="errorMessage in firstNameState.errorMessages">
          {{ errorMessage }}
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label" for="last-name">Last name</label>
        <input
          id="last-name"
          :class="getFieldClass(isFormSubmitted, lastName)"
          type="text"
          :name="lastNameState.name"
          v-model="lastNameModel"
          ref="lastNameRef"
        />
        <div class="invalid-feedback" v-for="errorMessage in lastNameState.errorMessages">
          {{ errorMessage }}
        </div>
      </div>

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
import { reactive, toRefs } from 'vue';

import { useRouter } from 'vue-router';

import { FormState } from '@/pages/Auth/_files/types';
import { RegisterUserPayload } from '@/core/services/auth/types';
import { AUTH_TOKEN_KEY } from '@/shared/files/consts';
import { requiredEmail, requiredMin } from '@/shared/files/validations';
import { getFieldClass, clearFormMessage, validateFieldsState } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { registerUser } from '@/core/services';
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

const firstName = useField({ name: 'firstName', validation: requiredMin(2) });
const { model: firstNameModel, ref: firstNameRef, state: firstNameState } = firstName;

const lastName = useField({ name: 'lastName', validation: requiredMin(2) });
const { model: lastNameModel, ref: lastNameRef, state: lastNameState } = lastName;

const email = useField({ name: 'email', validation: requiredEmail });
const { model: emailModel, ref: emailRef, state: emailState } = email;

const password = useField({ name: 'password', validation: requiredMin(3) });
const { model: passwordModel, ref: passwordRef, state: passwordState } = password;

const submit = async () => {
  state.isFormSubmitted = true;

  const isValidFields = [
    validateFieldsState({
      fields: [firstName, lastName],
      validation: requiredMin(2),
    }),
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
    const payload: RegisterUserPayload = {
      firstName: firstNameModel.value,
      lastName: lastNameModel.value,
      email: emailModel.value,
      password: passwordModel.value,
    };

    const user = await registerUser(payload);

    if (firstNameModel.value === 'demo@demo.com') {
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
    state.isLoading = false;
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
