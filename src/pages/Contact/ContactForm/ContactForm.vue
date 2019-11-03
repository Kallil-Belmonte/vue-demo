<template>
  <fragment>
    <loader v-if="loading"></loader>

    <vue-form :state="form.state" @submit.prevent="onSubmit">
      <alert-dismissible v-for="(successMessage, index) in form.feedbackMessages.success" :key="successMessage" variant="success" v-on:dismiss="Helpers.clearFormMessage(form.feedbackMessages.success, index)">
        {{ successMessage }}
      </alert-dismissible>

      <b-form-row>
        <b-col>
          <validate>
            <b-form-group label-for="first-name" label="First name">
              <b-form-input v-model="form.model.firstName" id="first-name" :class="Helpers.setInputClassName(form.state.firstName)" type="text" name="firstName" required minlength="3" />

              <field-messages name="firstName" show="$touched">
                <b-form-invalid-feedback slot="required" force-show>
                  First name is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback slot="minlength" force-show>
                  Minimum 3 characters required
                </b-form-invalid-feedback>
              </field-messages>
            </b-form-group>
          </validate>
        </b-col>

        <b-col>
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
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
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
        </b-col>

        <b-col>
          <validate>
            <b-form-group label-for="telephone" label="Telephone">
              <b-form-input v-model="form.model.telephone" id="telephone" :class="Helpers.setInputClassName(form.state.telephone)" type="tel" name="telephone" placeholder="(00) 0000 0000" v-mask="'(##) #### #####'" required />

              <field-messages name="telephone" show="$touched">
                <b-form-invalid-feedback slot="required" force-show>
                  Telephone is required
                </b-form-invalid-feedback>
              </field-messages>
            </b-form-group>
          </validate>
        </b-col>
      </b-form-row>

      <b-form-group>
        <p-radio v-model="form.model.sex" class="p-default p-round" color="primary" value="male">
          Male
        </p-radio>
        <p-radio v-model="form.model.sex" class="p-default p-round" color="primary" value="female">
          Female
        </p-radio>
      </b-form-group>

      <b-form-row>
        <b-col>
          <b-form-group label-for="favorite-color" label="Favorite color">
            <b-form-select v-model="form.model.favoriteColor" :options="favoriteColors" />
          </b-form-group>
        </b-col>

        <b-col class="mt-4">
          <p-check v-model="form.model.employed" class="p-svg p-curve" color="primary">
            <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20"><path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white"></path>
            </svg>
            Employed
          </p-check>
        </b-col>
      </b-form-row>

      <validate>
        <b-form-group label-for="message" label="Message">
          <b-form-textarea v-model="form.model.message" id="message" name="message" rows="3" required />

          <field-messages name="message" show="$touched">
            <b-form-invalid-feedback slot="required" force-show>
              Message is required
            </b-form-invalid-feedback>
          </field-messages>
        </b-form-group>
      </validate>

      <b-button variant="primary" class="mr-2" type="submit" :disabled="isSubmitButtonDisabled()">
        Send
      </b-button>
      <b-button variant="light" @click="onResetForm()" :disabled="form.state.$pristine">
        Reset form
      </b-button>
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
        model: {
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
      const { state, model } = this.form;
      return !state.$valid || state.$pristine || model.favoriteColor === 'select';
    },

    // GET FAVORITE COLORS
    async getFavoriteColors() {
      try {
        const response = await this.$http.get(`${INSTANCES.mocky}${ENDPOINTS.contactForm.favoriteColors}`);
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
      this.form.model = {
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
      console.log('Form submitted:', this.form.model);

      this.form.feedbackMessages.success.push('Message sent successfully.');
      this.onResetForm();
    },
  },
};
</script>
