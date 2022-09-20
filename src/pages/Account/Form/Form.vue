<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <AlertDismissible
        v-for="(successMessage, index) in successMessages"
        :key="successMessage"
        variant="success"
        @dismiss="clearFormMessage(successMessages, index)"
      >
        {{ successMessage }}
      </AlertDismissible>

      <AlertDismissible
        v-for="(errorMessage, index) in serverErrors.request"
        :key="errorMessage"
        variant="danger"
        @dismiss="clearFormMessage(serverErrors.request, index)"
      >
        {{ errorMessage }}
      </AlertDismissible>

      <form @submit.prevent="submit">
        <div class="mb-3">
          <label class="form-label" for="first-name">First name</label>
          <input
            id="first-name"
            :class="getFieldClass(isFormSubmitted, firstName)"
            type="text"
            :name="firstNameState.name"
            v-model="firstNameModel"
            ref="firstNameRef"
          />
          <div class="invalid-feedback" v-for="errorMessage in firstNameState.errorMessages">
            {{ errorMessage }}
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label" for="last-name">Last name</label>
          <input
            id="last-name"
            :class="getFieldClass(isFormSubmitted, lastName)"
            type="text"
            :name="lastNameState.name"
            v-model="lastNameModel"
            ref="lastNameRef"
          />
          <div class="invalid-feedback" v-for="errorMessage in lastNameState.errorMessages">
            {{ errorMessage }}
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label" for="email">E-mail address</label>
          <input
            id="email"
            :class="getFieldClass(isFormSubmitted, email)"
            type="email"
            :name="emailState.name"
            v-model="emailModel"
            ref="emailRef"
          />
          <div class="invalid-feedback" v-for="errorMessage in emailState.errorMessages">
            {{ errorMessage }}
          </div>
        </div>

        <AlertDismissible
          v-for="(errorMessage, index) in serverErrors.email"
          :key="errorMessage"
          variant="danger"
          @dismiss="clearFormMessage(serverErrors.email, index)"
        >
          {{ errorMessage }}
        </AlertDismissible>

        <button class="btn btn-primary me-2" type="submit">Save</button>
        <button class="btn btn-light" type="button" @click="getUserData">Reset form</button>
      </form>
    </div>
  </div>
</template>
-->

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';

import { AccountFormState } from '@/pages/Account/_files/types';
import { requiredEmail, requiredMin } from '@/shared/files/validations';
import { getFieldClass, clearFormMessage, validateFields } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { user, setUser } from '@/core/state/auth';
import { AlertDismissible } from '@/shared/components';

const initialState: AccountFormState = {
  isFormSubmitted: false,
  successMessages: [],
  serverErrors: { email: [], request: [] },
};

const state = reactive(initialState);
const { isFormSubmitted, successMessages, serverErrors } = toRefs(state);

const firstName = useField({ name: 'first-name', validation: requiredMin(2) });
const { model: firstNameModel, ref: firstNameRef, state: firstNameState } = firstName;

const lastName = useField({ name: 'last-name', validation: requiredMin(2) });
const { model: lastNameModel, ref: lastNameRef, state: lastNameState } = lastName;

const email = useField({ name: 'email', validation: requiredEmail });
const { model: emailModel, ref: emailRef, state: emailState } = email;

const getUserData = () => {
  firstNameModel.value = user.value.firstName;
  lastNameModel.value = user.value.lastName;
  emailModel.value = user.value.email;
};

const submit = async () => {
  state.isFormSubmitted = true;

  const isValidFields = [
    validateFields({
      fields: [firstName, lastName],
      validation: requiredMin(2),
    }),
    validateFields({
      fields: [email],
      validation: requiredEmail,
    }),
  ].every(isValid => isValid);
  if (!isValidFields) return;

  state.successMessages = [];
  state.serverErrors = { email: [], request: [] };

  if (emailModel.value === 'john.doe@email.com') {
    state.serverErrors.email.push('This e-mail already exists.');
  } else if (emailModel.value === 'demo@demo.com') {
    state.serverErrors.request.push('An error occurred, please try again later.');
  } else {
    setUser({
      firstName: firstNameModel.value,
      lastName: lastNameModel.value,
      email: emailModel.value,
    });

    state.successMessages.push('Account saved successfully.');
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getUserData();
});
</script>
