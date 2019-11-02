<template>
  <fragment>
    <loader v-if="loading"></loader>

    <vue-form :state="form.state" @submit.prevent="onSubmit">
      <alert-dismissible v-for="(successMessage, index) in form.feedbackMessages.success" :key="successMessage" status="success" :dismissible="true" v-on:dismissAlert="Helpers.clearFormMessage(form.feedbackMessages.success, index)">
        {{ successMessage }}
      </alert-dismissible>

      <div class="form-row">
        <div class="col">
          <validate class="form-group">
            <label for="first-name">First name</label>
            <input v-model="form.values.firstName" id="first-name" :class="Helpers.setInputClassName(form.state.firstName)" type="text" name="firstName" required />

            <field-messages name="firstName" show="$touched">
              <div slot="required" class="invalid-feedback d-block">First name is required</div>
              <div slot="minlength" class="invalid-feedback d-block">Minimum 3 characters required</div>
            </field-messages>
          </validate>
        </div>

        <div class="col">
          <validate class="form-group">
            <label for="last-name">Last name</label>
            <input v-model="form.values.lastName" id="last-name" :class="Helpers.setInputClassName(form.state.lastName)" type="text" name="lastName" required />

            <field-messages name="lastName" show="$touched">
              <div slot="required" class="invalid-feedback d-block">Last name is required</div>
            </field-messages>
          </validate>
        </div>
      </div>

      <div class="form-row">
        <div class="col">
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
        </div>

        <div class="col">
          <validate class="form-group">
            <label for="telephone">Telephone</label>
            <input v-model="form.values.telephone" id="telephone" :class="Helpers.setInputClassName(form.state.telephone)" type="tel" name="telephone" placeholder="(00) 0000 0000" v-mask="'(##) #### #####'" />

            <field-messages name="telephone" show="$touched">
              <div slot="required" class="invalid-feedback d-block">Telephone is required</div>
            </field-messages>
          </validate>
        </div>
      </div>

      <div class="form-group">
        <p-radio v-model="form.values.sex" class="p-default p-round" color="primary" value="male">
          Male
        </p-radio>
        <p-radio v-model="form.values.sex" class="p-default p-round" color="primary" value="female">
          Female
        </p-radio>
      </div>

      <div class="form-row">
        <div class="col">
          <validate class="form-group">
            <label for="favorite-color">Favorite color</label>
            <select v-model="form.values.favoriteColor" id="favorite-color" class="form-control" name="favoriteColor">
              <option value="select" disabled>Select</option>
              <option :value="color" v-for="color in favoriteColors" :key="color">{{ color }}</option>
            </select>

            <field-messages name="favoriteColor" show="$touched">
              <div v-if="form.values.favoriteColor === 'select'" class="invalid-feedback d-block">Favorite color is required</div>
            </field-messages>
          </validate>
        </div>

        <div class="col mt-4">
          <p-check v-model="form.values.employed" class="p-svg p-curve" color="primary">
            <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20"><path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white"></path>
            </svg>
            Employed
          </p-check>
        </div>
      </div>

      <validate class="form-group">
        <label for="message">Message</label>
        <textarea v-model="form.values.message" id="message" :class="Helpers.setInputClassName(form.state.message)" rows="3" name="message" required></textarea>

        <field-messages name="message" show="$touched">
          <div slot="required" class="invalid-feedback d-block">Message is required</div>
        </field-messages>
      </validate>

      <button class="btn btn-primary mr-2" type="submit" :disabled="isSubmitButtonDisabled()">
        Send
      </button>
      <button class="btn btn-light" type="button" :disabled="form.state.$pristine" @click="onResetForm()">
        Reset form
      </button>
    </vue-form>
  </fragment>
</template>


<script>
import * as Helpers from '@/shared/Helpers';
import { INSTANCES, ENDPOINTS } from '@/core/Resource/Resource';
import Loader from '@/shared/Components/Loader';
import AlertDismissible from '@/shared/Components/AlertDismissible';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'ContactForm',
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
      loading: true,
      favoriteColors: [],
      form: {
        state: {},
        values: {
          firstName: null,
          lastName: null,
          email: null,
          telephone: null,
          sex: 'male',
          favoriteColor: 'select',
          employed: false,
          message: null,
        },
        feedbackMessages: {
          success: [],
          error: [],
        },
      },
    }
  },


  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    this.getFavoriteColors();
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // IS SUBMIT BUTTON DISABLED
    isSubmitButtonDisabled() {
      const { state, values } = this.form;
      return !state.$valid || state.$pristine || values.favoriteColor === 'select';
    },

    // GET FAVORITE COLORS
    async getFavoriteColors() {
      try {
        const response =  await this.$http.get(`${INSTANCES.mocky}${ENDPOINTS.contactForm.favoriteColors}`);
        this.favoriteColors = response.data;
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // ON RESET FORM
    onResetForm() {
      this.form.values = {
        firstName: null,
        lastName: null,
        email: null,
        telephone: null,
        sex: 'male',
        favoriteColor: 'select',
        employed: false,
        message: null,
      };
    },

    // ON SUBMIT
    onSubmit() {
      console.log('Form submitted:', this.form.values);

      this.form.feedbackMessages.success.push('Message sent successfully.');
      this.onResetForm();
    },
  },
};
</script>
