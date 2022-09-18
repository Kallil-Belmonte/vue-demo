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
            :class="getFieldClass(firstNameState)"
            type="text"
            name="firstName"
            v-model="firstName"
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
            :class="getFieldClass(lastNameState)"
            type="text"
            name="lastName"
            v-model="lastName"
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
            :class="getFieldClass(emailState)"
            type="email"
            name="email"
            v-model="email"
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
import { getFieldClass, clearFormMessage, validateFields } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { user, setUser } from '@/core/state/auth';
import { AlertDismissible } from '@/shared/components';

const initialState: AccountFormState = {
  successMessages: [],
  serverErrors: { email: [], request: [] },
};

const state = reactive(initialState);
const { successMessages, serverErrors } = toRefs(state);

const [firstName, firstNameRef, firstNameState] = useField({
  validation: { required: { check: true }, min: { check: 2 } },
});
const [lastName, lastNameRef, lastNameState] = useField({
  validation: { required: { check: true }, min: { check: 2 } },
});
const [email, emailRef, emailState] = useField({
  validation: { required: { check: true }, email: { check: true } },
});

const getUserData = () => {
  firstName.value = user.value.firstName;
  lastName.value = user.value.lastName;
  email.value = user.value.email;
};

const submit = async () => {
  const isValidFields = validateFields([firstNameState, lastNameState, emailState]);
  if (!isValidFields) return;

  state.successMessages = [];
  state.serverErrors = { email: [], request: [] };

  if (email.value === 'john.doe@email.com') {
    state.serverErrors.email.push('This e-mail already exists.');
  } else if (email.value === 'demo@demo.com') {
    state.serverErrors.request.push('An error occurred, please try again later.');
  } else {
    setUser({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    });

    state.successMessages.push('Account saved successfully.');
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getUserData();
});
</script>
