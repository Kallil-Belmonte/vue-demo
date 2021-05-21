<template>
  <AppLoader v-if="isLoading" />

  <vue-form class="login-form" :state="form.state" @submit.prevent="onSubmit">
    <h1 class="page-title">Login</h1>

    <validate>
      <b-form-group label-for="email" label="E-mail">
        <b-form-input
          v-model="form.model.email"
          id="email"
          :class="setFieldClassName(form.state.email)"
          type="email"
          name="email"
          required
        />

        <field-messages name="email" show="$touched">
          <b-form-invalid-feedback v-slot="required" force-show>
            E-mail is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-slot="email" force-show>
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
          :class="setFieldClassName(form.state.password)"
          type="password"
          name="password"
          required
          minlength="3"
        />

        <field-messages name="password" show="$touched">
          <b-form-invalid-feedback v-slot="required" force-show>
            Password is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-slot="minlength" force-show>
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
        <svg v-slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { mapMutations } from 'vuex';

import { MOCKY_INSTANCE, ENDPOINTS } from '@/core/api';
import { AUTH_TOKEN, EXPIRATION_DATE } from '@/shared/files/consts';
import { clearFormMessage, setFieldClassName } from '@/shared/helpers';
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
      setFieldClassName,
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
  // METHODS
  //==============================
  methods: {
    // MUTATIONS
    ...mapMutations('user', { setUserData: 'setData' }),

    // ON SUBMIT
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
            localStorage.setItem(AUTH_TOKEN, idToken);
            localStorage.setItem(EXPIRATION_DATE, expirationDate);
          } else {
            sessionStorage.setItem(AUTH_TOKEN, idToken);
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
