<template>
  <fragment>
    <loader v-if="loading"></loader>

    <vue-form class="register-form" :state="form.state" @submit.prevent="onSubmit">
      <h1 class="page-title">Register</h1>

      <validate>
        <b-form-group label-for="first-name" label="First name">
          <b-form-input v-model="form.model.firstName" id="first-name" :class="Helpers.setInputClassName(form.state.firstName)" type="text" name="firstName" required />

          <field-messages name="firstName" show="$touched">
            <b-form-invalid-feedback slot="required" force-show>
              First name is required
            </b-form-invalid-feedback>
          </field-messages>
        </b-form-group>
      </validate>

      <validate>
        <b-form-group label-for="last-name" label="Last name">
          <b-form-input v-model="form.model.lastName" id="last-name" :class="Helpers.setInputClassName(form.state.lastName)" type="text" name="lastName" required />

          <field-messages name="lastName" show="$touched">
            <b-form-invalid-feedback slot="required" force-show>
              Last name is required
            </b-form-invalid-feedback>
          </field-messages>
        </b-form-group>
      </validate>

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

      <b-button variant="primary" class="d-block mx-auto" type="submit" :disabled="!form.state.$valid || form.state.$pristine">
        Register
      </b-button>

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
        model: {
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
        const response = await this.$http.post(`${INSTANCES.mocky}${ENDPOINTS.auth.register}`, this.form.model);
        const { token, firstName, lastName, email } = response.data;

        this.setLoading(false);

        if (this.form.model.email === 'demo@demo.com') {
          this.form.feedbackMessages.email.push('This e-mail already exists.');
          this.form.feedbackMessages.password.push('Your password is too weak.');
        } else {
          sessionStorage.setItem('authTokenVueDemo', token);
          this.setUserData({ firstName, lastName, email });
          this.$router.push({ name: 'home' });
        }
      } catch (error) {
        console.error(error);
        this.setLoading(false);
        throw error;
      }
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
