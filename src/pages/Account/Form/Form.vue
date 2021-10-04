<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <AppAlertDismissible
        v-for="(successMessage, index) in successMessages"
        :key="successMessage"
        variant="success"
        @dismiss="clearFormMessage(successMessages, index)"
      >
        {{ successMessage }}
      </AppAlertDismissible>

      <AppAlertDismissible
        v-for="(errorMessage, index) in serverErrors.request"
        :key="errorMessage"
        variant="danger"
        @dismiss="clearFormMessage(serverErrors.request, index)"
      >
        {{ errorMessage }}
      </AppAlertDismissible>

      <form @submit.prevent="submit">
        <div class="mb-3">
          <label class="form-label" for="first-name">First name</label>
          <input
            id="first-name"
            :class="getFieldClass(firstName)"
            type="text"
            name="firstName"
            v-model="firstName.value"
            ref="firstName.ref"
          />
          <div class="invalid-feedback" v-if="firstName.error">
            {{ firstName.error?.message }}
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label" for="last-name">Last name</label>
          <input
            id="last-name"
            :class="getFieldClass(lastName)"
            type="text"
            name="lastName"
            v-model="lastName.value"
            ref="lastName.ref"
          />
          <div class="invalid-feedback" v-if="lastName.error">
            {{ lastName.error?.message }}
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label" for="email">E-mail address</label>
          <input
            id="email"
            :class="getFieldClass(email)"
            type="email"
            name="email"
            v-model="email.value"
            ref="email.ref"
          />
          <div class="invalid-feedback" v-if="email.error">
            {{ email.error?.message }}
          </div>
        </div>

        <AppAlertDismissible
          v-for="(errorMessage, index) in serverErrors.email"
          :key="errorMessage"
          variant="danger"
          @dismiss="clearFormMessage(serverErrors.email, index)"
        >
          {{ errorMessage }}
        </AppAlertDismissible>

        <button class="btn btn-primary me-2" type="submit">Save</button>
        <button class="btn btn-light" type="button" @click="reset()">Reset form</button>
      </form>
    </div>
  </div>
</template>
-->

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';

import { useForm } from 'vue-hooks-form';

import { AccountFormState } from '@/pages/Account/_files/types';
import { getFieldClass, clearFormMessage, validateFields, emailValidator } from '@/shared/helpers';
import AppAlertDismissible from '@/shared/components/AppAlertDismissible.vue';

const { useField, set, validateField } = useForm({ defaultValues: {} });

const state = reactive<AccountFormState>({});
const {} = toRefs(state);

const getUserData = () => {
  const { firstName, lastName, email } = this.userData;
  this.form.model = { firstName, lastName, email };
};

const reset = () => {};

const submit = () => {};

onMounted(() => {
  getUserData();
});
</script>

<!-- <script lang="ts">
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
    ...mapMutations('user', { setUserData: 'setData' }),

    getUserData(): void {
      const { firstName, lastName, email } = this.userData;
      this.form.model = { firstName, lastName, email };
    },

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
</script> -->
