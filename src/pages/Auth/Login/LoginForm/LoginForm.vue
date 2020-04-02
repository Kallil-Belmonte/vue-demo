<template>
  <fragment>
    <loader v-if="loading" />

    <vue-form class="login-form" :state="form.state" @submit.prevent="onSubmit">
      <h1 class="page-title">Login</h1>

      <validate>
        <b-form-group label-for="email" label="E-mail">
          <b-form-input v-model="form.model.email" id="email" :class="Helpers.setInputClassName(form.state.email)" type="email" name="email" required />

          <field-messages name="email" show="$touched">
            <b-form-invalid-feedback slot="required" force-show>
              E-mail is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback slot="email" force-show>
              Invalid e-mail
            </b-form-invalid-feedback>
          </field-messages>
        </b-form-group>

        <alert-dismissible v-for="(errorMessage, index) in form.feedbackMessages.email" :key="errorMessage" variant="danger" v-on:dismiss="Helpers.clearFormMessage(form.feedbackMessages.email, index)">
          {{ errorMessage }}
        </alert-dismissible>
      </validate>

      <validate>
        <b-form-group label-for="password" label="Password">
          <b-form-input v-model="form.model.password" id="password" :class="Helpers.setInputClassName(form.state.password)" type="password" name="password" required minlength="3" />

          <field-messages name="password" show="$touched">
            <b-form-invalid-feedback slot="required" force-show>
              Password is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback slot="minlength" force-show>
              Minimum 3 characters required
            </b-form-invalid-feedback>
          </field-messages>
        </b-form-group>

        <alert-dismissible v-for="(errorMessage, index) in form.feedbackMessages.email" :key="errorMessage" variant="danger" v-on:dismiss="Helpers.clearFormMessage(form.feedbackMessages.email, index)">
          {{ errorMessage }}
        </alert-dismissible>
      </validate>

      <b-form-group>
        <p-check v-model="form.model.keepLogged" class="p-svg p-curve" color="primary">
          <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20"><path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white"></path>
          </svg>
          Keep logged
        </p-check>
      </b-form-group>

      <b-button variant="primary" class="d-block mx-auto" type="submit" :disabled="!form.state.$valid || form.state.$pristine">
        Login
      </b-button>

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

const { mocky } = INSTANCES;
const { auth } = ENDPOINTS;

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
        model: {
          email: undefined,
          password: undefined,
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

    // SET LOADING
    setLoading(value) {
      this.loading = value;
    },

    // ON SUBMIT
    async onSubmit() {
      this.setLoading(true);

      this.form.feedbackMessages = {
        email: [],
        password: [],
      };

      try {
        const { data } = await this.$http.post(`${mocky}${auth.login}`, this.form.model);
        const { idToken, expiresIn, firstName, lastName, email } = data;
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000).toISOString();

        this.setLoading(false);

        if (this.form.model.email === 'demo@demo.com') {
          this.form.feedbackMessages.email.push('This e-mail does not exists.');
          this.form.feedbackMessages.password.push('The password is incorrect.');
        } else {
          if (this.form.model.keepLogged) {
            localStorage.setItem('authTokenVueDemo', idToken);
            localStorage.setItem('expirationDateVueDemo', expirationDate);
          } else {
            sessionStorage.setItem('authTokenVueDemo', idToken);
          }

          this.setUserData({ firstName, lastName, email });
          this.$router.push({ name: 'home' });
        }
      } catch (error) {
        console.error(error);
        this.setLoading(false);
      }
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
