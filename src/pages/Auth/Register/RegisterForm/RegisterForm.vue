<template>
  <fragment>
    <loader v-if="loading"></loader>

    <vue-form class="register-form" :state="form.state" @submit.prevent="onSubmit">
      <h1 class="page-title">Register</h1>

      <validate class="form-group">
        <label for="first-name">First name</label>
        <input v-model="form.values.firstName" id="first-name" :class="Helpers.setInputClassName(form.state.firstName)" type="text" name="firstName" required />

        <field-messages name="firstName" show="$touched">
          <div slot="required" class="invalid-feedback d-block">First name is required</div>
        </field-messages>
      </validate>

      <validate class="form-group">
        <label for="last-name">Last name</label>
        <input v-model="form.values.lastName" id="last-name" :class="Helpers.setInputClassName(form.state.lastName)" type="text" name="lastName" required />

        <field-messages name="lastName" show="$touched">
          <div slot="required" class="invalid-feedback d-block">Last name is required</div>
        </field-messages>
      </validate>

      <validate class="form-group">
        <label for="email">E-mail</label>
        <input v-model="form.values.email" id="email" :class="Helpers.setInputClassName(form.state.email)" type="email" name="email" required />

        <field-messages name="email" show="$touched">
          <div slot="required" class="invalid-feedback d-block">E-mail is required</div>
          <div slot="email" class="invalid-feedback d-block">Invalid e-mail</div>
        </field-messages>

        <alert-dismissible v-for="(errorMessage, index) in form.feedbackMessages.email" :key="errorMessage" status="danger" :dismissible="true" v-on:dismissAlert="Helpers.clearFormMessage(form.feedbackMessages.email, index)">
          {{ errorMessage }}
        </alert-dismissible>
      </validate>

      <validate class="form-group">
        <label for="password">Password</label>
        <input v-model="form.values.password" id="password" :class="Helpers.setInputClassName(form.state.password)" type="password" name="password" minlength="3" required />

        <field-messages name="password" show="$touched">
          <div slot="required" class="invalid-feedback d-block">Password is required</div>
          <div slot="minlength" class="invalid-feedback d-block">Minimum 3 characters required</div>
        </field-messages>

        <alert-dismissible v-for="(errorMessage, index) in form.feedbackMessages.password" :key="errorMessage" status="danger" :dismissible="true" v-on:dismissAlert="Helpers.clearFormMessage(form.feedbackMessages.password, index)">
          {{ errorMessage }}
        </alert-dismissible>
      </validate>

      <button class="btn btn-primary d-block mx-auto" type="submit" :disabled="!form.state.$valid || form.state.$pristine">
        Submit
      </button>

      <div class="text-center">
        <hr class="mt-4" />
        Aleady have an account? <router-link to="/login">Login</router-link>
      </div>
    </vue-form>
  </fragment>
</template>


<script>
import { mapMutations } from 'vuex';

import * as Helpers from '@/shared/Helpers';
import { INSTANCES, ENDPOINTS } from '@/core/Resource/Resource';
import Loader from '@/shared/Components/Loader';
import AlertDismissible from '@/shared/Components/AlertDismissible';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'RegisterForm',
  components: {
    Loader,
    AlertDismissible,
  },


  //==============================
  // DATA
  //==============================
  data() {
    return {
      Helpers,
      loading: false,
      form: {
        state: {},
        values: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        },
        feedbackMessages: {
          email: [],
          password: [],
        },
      },
    }
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // MUTATIONS
    ...mapMutations('user', {
      setUserData: 'setData',
    }),

    // ON SUBMIT
    onSubmit() {
      // Activate loader
      this.loading = true;

      // Clear messages
      this.form.feedbackMessages = {
        email: [],
        password: [],
      };

      this.$http.post(INSTANCES.mocky + ENDPOINTS.auth.register, this.form.values)
        .then(response => {
          if (this.form.values.email === 'demo@demo.com') {

            // Error simulation
            this.form.feedbackMessages.email.push('This e-mail already exists.');
            this.form.feedbackMessages.password.push('Your password is too weak.');

            // Deactivate loader
            this.loading = false;

          } else {

            // Store session data
            sessionStorage.setItem('authTokenVueDemo', response.data.token);

            // Set User Data to store
            this.setUserData({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email
            });

            // Deactivate loader
            this.loading = false;

            // Redirect
            this.$router.push({ name: 'home' });

          }
        })
        .catch(error => {
          console.error(error);

          // Deactivate loader
          this.loading = false;
        });
    },
  }
};
</script>


<style lang="scss" scoped>
.register-form {
  padding: 40px 40px 15px 40px;
  border-radius: 10px;
  background-color: #FFF;
  margin-top: 50px;

  .page-title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }
}
</style>
