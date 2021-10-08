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
        <button class="btn btn-light" type="button" @click="getUserData">Reset form</button>
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
import { user, setUser } from '@/core/state/auth';
import AppAlertDismissible from '@/shared/components/AppAlertDismissible.vue';

const fields = ['First name', 'Last name', 'E-mail'];

const { useField, set, validateField } = useForm({ defaultValues: {} });

const state = reactive<AccountFormState>({
  firstName: useField('First name', {
    rule: { required: true, min: 2 },
  }),
  lastName: useField('Last name', {
    rule: { required: true, min: 2 },
  }),
  email: useField('E-mail', {
    rule: { required: true, validator: emailValidator },
  }),
  successMessages: [],
  serverErrors: { email: [], request: [] },
});
const { firstName, lastName, email, successMessages, serverErrors } = toRefs(state);

const getUserData = () => {
  const { firstName, lastName, email } = user.value;
  set('First name', firstName);
  set('Last name', lastName);
  set('E-mail', email);
};

const submit = async () => {
  const errors = await validateFields(fields, validateField);
  if (errors.length) return;

  state.successMessages = [];
  state.serverErrors = { email: [], request: [] };

  if (state.email.value === 'john.doe@email.com') {
    state.serverErrors.email.push('This e-mail already exists.');
  } else if (state.email.value === 'demo@demo.com') {
    state.serverErrors.request.push('An error occurred, please try again later.');
  } else {
    setUser({
      firstName: state.firstName.value,
      lastName: state.lastName.value,
      email: state.email.value,
    });

    state.successMessages.push('Account saved successfully.');
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getUserData();
});
</script>
