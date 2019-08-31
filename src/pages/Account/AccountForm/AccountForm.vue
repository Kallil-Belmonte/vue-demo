<template>
  <div class="row">
    <div class="offset-md-3 col-md-6">
      <alert-dismissible v-for="(successMessage, index) in form.feedbackMessages.success" :key="successMessage" status="success" :dismissible="true" v-on:dismissAlert="Utils.clearFormMessage(form.feedbackMessages.success, index)">
        {{ successMessage }}
      </alert-dismissible>

      <alert-dismissible v-for="(errorMessage, index) in form.feedbackMessages.error" :key="errorMessage" status="danger" :dismissible="true" v-on:dismissAlert="Utils.clearFormMessage(form.feedbackMessages.error, index)">
        {{ errorMessage }}
      </alert-dismissible>

      <vue-form :state="form.state" @submit.prevent="onSubmit">
        <validate class="form-group">
          <label for="first-name">First name</label>
          <input v-model="form.values.firstName" id="first-name" :class="Utils.setInputClassName(form.state.firstName)" type="text" name="firstName" minlength="3" required />

          <field-messages name="firstName" show="$touched">
            <div slot="required" class="invalid-feedback d-block">First name is required</div>
            <div slot="minlength" class="invalid-feedback d-block">Minimum 3 characters required</div>
          </field-messages>
        </validate>

        <validate class="form-group">
          <label for="last-name">Last name</label>
          <input v-model="form.values.lastName" id="last-name" :class="Utils.setInputClassName(form.state.lastName)" type="text" name="lastName" required />

          <field-messages name="lastName" show="$touched">
            <div slot="required" class="invalid-feedback d-block">Last name is required</div>
          </field-messages>
        </validate>

        <validate class="form-group">
          <label for="email">E-mail</label>
          <input v-model="form.values.email" id="email" :class="Utils.setInputClassName(form.state.email)" type="email" name="email" required />
          <field-messages name="email" show="$touched">
            <div slot="required" class="invalid-feedback d-block">E-mail is required</div>
            <div slot="email" class="invalid-feedback d-block">Invalid e-mail</div>
          </field-messages>

          <alert-dismissible v-for="(errorMessage, index) in form.feedbackMessages.email" :key="errorMessage" status="danger" :dismissible="true" v-on:dismissAlert="Utils.clearFormMessage(form.feedbackMessages.email, index)">
            {{ errorMessage }}
          </alert-dismissible>
        </validate>

        <button class="btn btn-primary mr-2" type="submit" :disabled="!form.state.$valid || form.state.$pristine">
          Save
        </button>
        <button class="btn btn-light" type="button" :disabled="form.state.$pristine" @click="getUserData()">
          Reset form
        </button>
      </vue-form>
    </div>
  </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

import Utils from '@/shared/General/Utils';
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
      Utils,
      form: {
        state: {},
        values: {
          firstName: null,
          lastName: null,
          email: null,
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
      userData: 'data'
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
      // Get User Data from store
      this.form.values = this.userData;
    },

    // ON SUBMIT
    onSubmit() {
      // Clear messages
      this.form.feedbackMessages = {
        success: [],
        error: [],
        email: [],
      };

      if (this.form.values.email === 'john.doe@email.com') {
        // Set field error messages
        this.form.feedbackMessages.email.push('This e-mail already exists.');
      }
      else if (this.form.values.email === 'demo@demo.com') {
        // Set error messages
        this.form.feedbackMessages.error.push('An error occurred, please try again later.');
      }
      else {
        // Set data to store
        this.setUserData(this.form.values);

        // Set success message
        this.form.feedbackMessages.success.push('Account saved successfully.');
      }
    },
  },
};
</script>
