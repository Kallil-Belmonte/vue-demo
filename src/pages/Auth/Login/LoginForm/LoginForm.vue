<template>
  <fragment>
    <loader v-if="loading"></loader>

    <vue-form class="login-form" :state="form.state" @submit.prevent="onSubmit">
      <h1 class="page-title">Login</h1>

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

      <div class="form-group">
        <p-check v-model="form.values.keepLogged" class="p-svg p-curve" color="primary">
          <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20"><path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white"></path>
          </svg>
          Keep logged
        </p-check>
      </div>

      <button class="btn btn-primary d-block mx-auto" type="submit" :disabled="!form.state.$valid || form.state.$pristine">
        Login
      </button>

      <div class="text-center">
        <hr class="mt-4" />
        Don't have an account? <router-link to="/register">Register</router-link>
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
  name: 'LoginForm',
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
          email: null,
          password: null,
          keepLogged: false,
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

      this.$http.post(INSTANCES.mocky + ENDPOINTS.auth.login, this.form.values)
        .then(response => {
          if (this.form.values.email === 'demo@demo.com') {

            // Error simulation
            this.form.feedbackMessages.email.push('This e-mail does not exists.');
            this.form.feedbackMessages.password.push('The password is incorrect.');

            // Deactivate loader
            this.loading = false;

          } else {

            // Store session data
            if (this.form.values.keepLogged) {
              localStorage.setItem('authTokenVueDemo', response.data.idToken);
              localStorage.setItem('expirationDateVueDemo', new Date(new Date().getTime() + response.data.expiresIn * 1000).toISOString());
            } else {
              sessionStorage.setItem('authTokenVueDemo', response.data.idToken);
            }

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
.login-form {
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
