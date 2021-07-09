<template>
  <AppLoader v-if="isLoading" />

  <vue-form class="register-form" :state="form.state" @submit.prevent="onSubmit">
    <h1 class="page-title">Register</h1>

    <validate>
      <b-form-group label-for="first-name" label="First name">
        <b-form-input
          v-model="form.model.firstName"
          id="first-name"
          :class="getFieldClass(form.state.firstName)"
          type="text"
          name="firstName"
          required
          :state="required"
        />

        <field-messages name="firstName" show="$touched">
          <b-form-invalid-feedback :state="required" force-show>
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
          :class="getFieldClass(form.state.lastName)"
          type="text"
          name="lastName"
          required
          :state="required"
        />

        <field-messages name="lastName" show="$touched">
          <b-form-invalid-feedback :state="required" force-show>
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
import { defineComponent } from 'vue';

import { mapMutations } from 'vuex';

import { MOCKY_INSTANCE, ENDPOINTS } from '@/core/api';
import { AUTH_TOKEN_KEY } from '@/shared/files/consts';
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
          sessionStorage.setItem(AUTH_TOKEN_KEY, token);
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
