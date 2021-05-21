<template>
  <AppLoader v-if="isLoading" />

  <vue-form class="register-form" :state="form.state" @submit.prevent="onSubmit">
    <h1 class="page-title">Register</h1>

    <validate>
      <b-form-group label-for="first-name" label="First name">
        <b-form-input
          v-model="form.model.firstName"
          id="first-name"
          :class="setFieldClassName(form.state.firstName)"
          type="text"
          name="firstName"
          required
        />

        <field-messages name="firstName" show="$touched">
          <b-form-invalid-feedback v-slot="required" force-show>
            First name is required
          </b-form-invalid-feedback>
        </field-messages>
      </b-form-group>
    </validate>

    <validate>
      <b-form-group label-for="last-name" label="Last name">
        <b-form-input
          v-model="form.model.lastName"
          id="last-name"
          :class="setFieldClassName(form.state.lastName)"
          type="text"
          name="lastName"
          required
        />

        <field-messages name="lastName" show="$touched">
          <b-form-invalid-feedback v-slot="required" force-show>
            Last name is required
          </b-form-invalid-feedback>
        </field-messages>
      </b-form-group>
    </validate>

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
        v-for="(errorMessage, index) in form.feedback.email"
        :key="errorMessage"
        variant="danger"
        v-on:dismiss="clearFormMessage(form.feedback.email, index)"
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
        v-for="(errorMessage, index) in form.feedback.password"
        :key="errorMessage"
        variant="danger"
        v-on:dismiss="clearFormMessage(form.feedback.password, index)"
      >
        {{ errorMessage }}
      </AppAlertDismissible>
    </validate>

    <b-button
      variant="primary"
      class="d-block mx-auto"
      type="submit"
      :disabled="!form.state.$valid || form.state.$pristine"
    >
      Register
    </b-button>

    <div class="text-center">
      <hr class="mt-4" />
      Aleady have an account? <router-link to="/login">Login</router-link>
    </div>
  </vue-form>
</template>

<script lang="ts">
import { mapMutations } from 'vuex';

import { MOCKY_INSTANCE, ENDPOINTS } from '@/core/api';
import { AUTH_TOKEN } from '@/shared/files/consts';
import { clearFormMessage, setFieldClassName } from '@/shared/helpers';
import AppLoader from '@/shared/components/AppLoader.vue';
import AppAlertDismissible from '@/shared/components/AppAlertDismissible.vue';
import { FormData } from '../_files/types';

const { auth } = ENDPOINTS;

export default {
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
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        },
        feedback: {
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
      const { model, feedback } = this.form;

      this.isLoading = true;
      this.form.feedback = { email: [], password: [] };

      try {
        const { data } = await MOCKY_INSTANCE.post(auth.register, this.form.model);
        const { token, firstName, lastName, email } = data;

        this.isLoading = false;

        if (model.email === 'demo@demo.com') {
          feedback.email.push('This e-mail already exists.');
          feedback.password.push('Your password is too weak.');
        } else {
          sessionStorage.setItem(AUTH_TOKEN, token);
          this.setUserData({ firstName, lastName, email });
          this.$router.push({ name: 'home' });
        }
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
  },
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
