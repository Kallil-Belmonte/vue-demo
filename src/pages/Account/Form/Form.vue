<template>
  <b-row>
    <b-col offset-md="3" md="6">
      <AppAlertDismissible
        v-for="(successMessage, index) in form.feedback.success"
        :key="successMessage"
        variant="success"
        v-on:dismiss="clearFormMessage(form.feedback.success, index)"
      >
        {{ successMessage }}
      </AppAlertDismissible>

      <AppAlertDismissible
        v-for="(errorMessage, index) in form.feedback.error"
        :key="errorMessage"
        variant="danger"
        v-on:dismiss="clearFormMessage(form.feedback.error, index)"
      >
        {{ errorMessage }}
      </AppAlertDismissible>

      <vue-form :state="form.state" @submit.prevent="onSubmit">
        <validate>
          <b-form-group label-for="first-name" label="First name">
            <b-form-input
              v-model="form.model.firstName"
              id="first-name"
              :class="getFieldClass(form.state.firstName)"
              type="text"
              name="firstName"
              required
              :state="required && minLength3"
            />

            <field-messages name="firstName" show="$touched">
              <b-form-invalid-feedback :state="required" force-show>
                First name is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback :state="minLength3" force-show>
                Minimum 3 characters required
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
            v-for="(errorMessage, index) in form.errors.email"
            :key="errorMessage"
            variant="danger"
            v-on:dismiss="clearFormMessage(form.errors.email, index)"
          >
            {{ errorMessage }}
          </AppAlertDismissible>
        </validate>

        <b-button
          variant="primary"
          class="mr-2"
          type="submit"
          :disabled="!form.state.$valid || form.state.$pristine"
        >
          Save
        </b-button>
        <b-button variant="light" :disabled="form.state.$pristine" @click="getUserData()">
          Reset form
        </b-button>
      </vue-form>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { mapState, mapMutations } from 'vuex';

import { clearFormMessage, getFieldClass, required, minLength, email } from '@/shared/helpers';
import AppAlertDismissible from '@/shared/components/AppAlertDismissible.vue';
import { FormData } from '../_files/types';

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'Form',
  components: {
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
      form: {
        state: {},
        model: {
          firstName: '',
          lastName: '',
          email: '',
        },
        errors: {
          email: [],
        },
        feedback: {
          success: [],
          error: [],
        },
      },
    };
  },

  //==============================
  // COMPUTED
  //==============================
  computed: {
    ...mapState('user', { userData: 'data' }),

    // MIN LENGTH 3
    minLength3(): boolean {
      return minLength(this.form.model.firstName, 3);
    },
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
    ...mapMutations('user', { setUserData: 'setData' }),

    // GET USER DATA
    getUserData(): void {
      const { firstName, lastName, email } = this.userData;
      this.form.model = { firstName, lastName, email };
    },

    // ON SUBMIT
    onSubmit(): void {
      const { model, errors, feedback } = this.form;

      this.form.errors = { email: [] };
      this.form.feedback = { success: [], error: [] };

      if (model.email === 'john.doe@email.com') {
        errors.email.push('This e-mail already exists.');
      } else if (model.email === 'demo@demo.com') {
        feedback.error.push('An error occurred, please try again later.');
      } else {
        this.setUserData(model);
        feedback.success.push('Account saved successfully.');
      }
    },
  },
});
</script>
