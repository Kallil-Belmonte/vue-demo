<template>
  <AppLoader v-if="isLoading" />

  <form class="login-form" @submit.prevent="submit">
    <h1 class="page-title">Login</h1>

    <div class="mb-3">
      <label class="form-label" for="email">Email address</label>
      <input
        id="email"
        :class="getFieldClass(email)"
        type="email"
        v-model="email.value"
        ref="email.ref"
      />
      <div class="invalid-feedback d-block" v-if="email.error">
        {{ capitalizeFirstLetter(email.error?.message) }}
      </div>
    </div>

    <AppAlertDismissible
      v-for="(errorMessage, index) in serverErrors.email"
      :key="errorMessage"
      variant="danger"
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
      <div class="invalid-feedback d-block" v-if="password.error">
        {{ capitalizeFirstLetter(password.error?.message) }}
      </div>
    </div>

    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="keep-logged"
        v-model="keepLogged.value"
        ref="keepLogged.ref"
      />
      <label class="form-check-label" for="keep-logged">Keep Logged</label>
    </div>

    <button class="btn btn-primary d-block mx-auto" type="submit">Submit form</button>

    <!-- <div class="text-center">
      <hr class="mt-4" />
      Don't have an account? <router-link to="/register">Register</router-link>
    </div> -->
  </form>
</template>

<!-- <template>
  <AppLoader v-if="isLoading" />

  <vue-form class="login-form" :state="form.state" @submit.prevent="onSubmit">
    <h1 class="page-title">Login</h1>

    <validate>
      <b-form-group label-for="email" label="E-mail">
        <b-form-input
          v-model="form.model.email"
          id="email"
          :class="getFieldClass(form.state.email)"
          type="email"
          name="email"
          required
          :state="required && email"
        />

        <field-messages name="email" show="$touched">
          <b-form-invalid-feedback :state="required" force-show>
            E-mail is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback :state="email" force-show>
            Invalid e-mail
          </b-form-invalid-feedback>
        </field-messages>
      </b-form-group>

      <AppAlertDismissible
        v-for="(errorMessage, index) in form.errors.email"
        :key="errorMessage"
        variant="danger"
        v-on:dismiss="clearFormMessage(form.errors.email, index)"
      >
        {{ errorMessage }}
      </AppAlertDismissible>
    </validate>

    <validate>
      <b-form-group label-for="password" label="Password">
        <b-form-input
          v-model="form.model.password"
          id="password"
          :class="getFieldClass(form.state.password)"
          type="password"
          name="password"
          required
          :state="required && minLength3"
        />

        <field-messages name="password" show="$touched">
          <b-form-invalid-feedback :state="required" force-show>
            Password is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback :state="minLength3" force-show>
            Minimum 3 characters required
          </b-form-invalid-feedback>
        </field-messages>
      </b-form-group>

      <AppAlertDismissible
        v-for="(errorMessage, index) in form.errors.password"
        :key="errorMessage"
        variant="danger"
        v-on:dismiss="clearFormMessage(form.errors.password, index)"
      >
        {{ errorMessage }}
      </AppAlertDismissible>
    </validate>

    <b-form-group>
      <p-check v-model="form.model.keepLogged" class="p-svg p-curve" color="primary">
        <svg class="svg svg-icon" viewBox="0 0 20 20">
          <path
            d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
            style="stroke: white; fill: white"
          ></path>
        </svg>
        Keep logged
      </p-check>
    </b-form-group>

    <b-button
      variant="primary"
      class="d-block mx-auto"
      type="submit"
      :disabled="!form.state.$valid || form.state.$pristine"
    >
      Login
    </b-button>

    <div class="text-center">
      <hr class="mt-4" />
      Don't have an account? <router-link to="/register">Register</router-link>
    </div>
  </vue-form>
</template> -->

<script lang="ts" setup>
import { reactive, toRefs } from 'vue';

import { useRouter } from 'vue-router';
import { useForm } from 'vue-hooks-form';

import { FormState } from '@/pages/Auth/Login/_files/types';
import { AUTH_TOKEN_KEY, EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { LoginUserPayload, LoginUserResponse } from '@/core/services/auth/types';
import { getFieldClass, capitalizeFirstLetter } from '@/shared/helpers';
import { loginUser } from '@/core/services';
import { setUser } from '@/core/state/auth';
import AppLoader from '@/shared/components/AppLoader.vue';
import AppAlertDismissible from '@/shared/components/AppAlertDismissible.vue';

const router = useRouter();

const { values, getFieldValues, errors, validateFields, validateField, get, set, useField } =
  useForm({
    defaultValues: {},
  });

const state = reactive<FormState>({
  isLoading: false,
  email: useField('email', {
    rule: { required: true },
  }),
  password: useField('password', {
    rule: {
      required: true,
      min: 3,
    },
  }),
  keepLogged: useField('keepLogged'),
  serverErrors: { email: ['ff'], password: [] },
});
const { isLoading, email, password, keepLogged, serverErrors } = toRefs(state);

const submit = async () => {
  isLoading.value = true;
  serverErrors.value = { email: [], password: [] };

  const payload: LoginUserPayload = {
    email: state.email.value,
    password: state.password.value,
    keepLogged: state.keepLogged.value,
  };

  try {
    const response = await loginUser(payload);
    const { token, expiresIn, firstName, lastName, email } = response;

    const expirationDate = new Date(new Date().getTime() + Number(expiresIn) * 1000).toISOString();

    isLoading.value = false;

    if (state.email.value === 'demo@demo.com') {
      state.serverErrors.email.push('This e-mail does not exists.');
      state.serverErrors.password.push('The password is incorrect.');

      console.log(state.serverErrors);
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
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
};
</script>

<!-- <script lang="ts">
import { defineComponent } from 'vue';

import { mapMutations } from 'vuex';

import { MOCKY_INSTANCE, ENDPOINTS } from '@/core/api';
import { AUTH_TOKEN_KEY, EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { clearFormMessage, getFieldClass, required, minLength, email } from '@/shared/helpers';
import AppLoader from '@/shared/components/AppLoader.vue';
import AppAlertDismissible from '@/shared/components/AppAlertDismissible.vue';
import { FormData } from '../_files/types';

const { auth } = ENDPOINTS;

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'Form',
  components: {
    AppLoader,
    AppAlertDismissible,
  },

  //==============================
  // DATA
  //==============================
  data(): FormData {
    return {
      clearFormMessage,
      getFieldClass,
      required,
      minLength,
      email,
      isLoading: false,
      form: {
        state: {},
        model: {
          email: '',
          password: '',
          keepLogged: false,
        },
        errors: {
          email: [],
          password: [],
        },
      },
    };
  },

  //==============================
  // COMPUTED
  //==============================
  computed: {
    minLength3(): boolean {
      return minLength(this.form.model.password, 3);
    },
  },

  //==============================
  // METHODS
  //==============================
  methods: {
    ...mapMutations('user', { setUserData: 'setData' }),

    async onSubmit(): Promise<void> {
      const { model, errors } = this.form;

      this.isLoading = true;
      this.form.errors = { email: [], password: [] };

      try {
        const { data } = await MOCKY_INSTANCE.post(auth.login, model);
        const { idToken, expiresIn, firstName, lastName, email } = data;
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000).toISOString();

        this.isLoading = false;

        if (model.email === 'demo@demo.com') {
          errors.email.push('This e-mail does not exists.');
          errors.password.push('The password is incorrect.');
        } else {
          if (model.keepLogged) {
            localStorage.setItem(AUTH_TOKEN_KEY, idToken);
            localStorage.setItem(EXPIRATION_DATE_KEY, expirationDate);
          } else {
            sessionStorage.setItem(AUTH_TOKEN_KEY, idToken);
          }

          this.setUserData({ firstName, lastName, email });
          this.$router.push({ name: 'home' });
        }
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
  },
});
</script> -->

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
