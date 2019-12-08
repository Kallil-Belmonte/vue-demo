<template>
  <b-row>
    <b-col offset-md="3" md="6">
      <alert-dismissible v-for="(successMessage, index) in form.feedbackMessages.success" :key="successMessage" variant="success" v-on:dismiss="Helpers.clearFormMessage(form.feedbackMessages.success, index)">
        {{ successMessage }}
      </alert-dismissible>

      <alert-dismissible v-for="(errorMessage, index) in form.feedbackMessages.error" :key="errorMessage" variant="danger" v-on:dismiss="Helpers.clearFormMessage(form.feedbackMessages.error, index)">
        {{ errorMessage }}
      </alert-dismissible>

      <vue-form :state="form.state" @submit.prevent="onSubmit">
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

        <b-button variant="primary" class="mr-2" type="submit" :disabled="!form.state.$valid || form.state.$pristine">
          Save
        </b-button>
        <b-button variant="light" :disabled="form.state.$pristine" @click="getUserData()">
          Reset form
        </b-button>
      </vue-form>
    </b-col>
  </b-row>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

import * as Helpers from '@/shared/Helpers';
import AlertDismissible from '@/shared/Components/AlertDismissible';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'AccountForm',
  components: {
    AlertDismissible,
  },


  //==============================
  // DATA
  //==============================
  data() {
    return {
      Helpers,
      form: {
        state: {},
        model: {
          firstName: undefined,
          lastName: undefined,
          email: undefined,
        },
        feedbackMessages: {
          success: [],
          error: [],
          email: [],
        },
      },
    }
  },


  //==============================
  // COMPUTED
  //==============================
  computed: {
    ...mapState('user', {
      userData: 'data',
    }),
  },


  //==============================
  // LIFECYCLE HOOKS
  //==============================
  mounted() {
    this.getUserData();
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // MUTATIONS
    ...mapMutations('user', {
      setUserData: 'setData',
    }),

    // GET USER DATA
    getUserData() {
      const { firstName, lastName, email } = this.userData;
      this.form.model = { firstName, lastName, email };
    },

    // ON SUBMIT
    onSubmit() {
      this.form.feedbackMessages = {
        success: [],
        error: [],
        email: [],
      };

      if (this.form.model.email === 'john.doe@email.com') {
        this.form.feedbackMessages.email.push('This e-mail already exists.');
      }
      else if (this.form.model.email === 'demo@demo.com') {
        this.form.feedbackMessages.error.push('An error occurred, please try again later.');
      }
      else {
        this.setUserData(this.form.model);
        this.form.feedbackMessages.success.push('Account saved successfully.');
      }
    },
  },
};
</script>
