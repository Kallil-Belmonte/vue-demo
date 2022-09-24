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
          <Input label="First name" :field="firstName" :isFormSubmitted="isFormSubmitted" />
        </div>

        <div class="mb-3">
          <Input label="Last name" :field="lastName" :isFormSubmitted="isFormSubmitted" />
        </div>

        <div class="mb-3">
          <Input
            type="email"
            label="E-mail address"
            :field="email"
            :isFormSubmitted="isFormSubmitted"
          />
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

<script lang="ts" setup>
import { reactive, toRefs, computed, onMounted } from 'vue';

import { AccountFormState } from '@/pages/Account/_files/types';
import { requiredEmail, requiredMin } from '@/shared/files/validations';
import { clearFormMessage, validateForm } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { user, setUser } from '@/core/state/auth';
import { AlertDismissible, Input } from '@/shared/components';

const initialState: AccountFormState = {
  isFormSubmitted: false,
  successMessages: [],
  serverErrors: { email: [], request: [] },
};

const state = reactive(initialState);
const { isFormSubmitted: isFormSubmittedState, successMessages, serverErrors } = toRefs(state);

const isFormSubmitted = computed(() => isFormSubmittedState);

const firstName = useField({ name: 'first-name', validation: requiredMin(2) });
const lastName = useField({ name: 'last-name', validation: requiredMin(2) });
const email = useField({ name: 'email', validation: requiredEmail });

const getUserData = () => {
  firstName.model.value = user.value.firstName;
  lastName.model.value = user.value.lastName;
  email.model.value = user.value.email;
};

const submit = async () => {
  state.isFormSubmitted = true;

  const isValidForm = validateForm([
    { fields: [firstName, lastName], validation: requiredMin(2) },
    { fields: [email], validation: requiredEmail },
  ]);
  if (!isValidForm) return;

  state.successMessages = [];
  state.serverErrors = { email: [], request: [] };

  if (email.model.value === 'john.doe@email.com') {
    state.serverErrors.email.push('This e-mail already exists.');
  } else if (email.model.value === 'demo@demo.com') {
    state.serverErrors.request.push('An error occurred, please try again later.');
  } else {
    setUser({
      firstName: firstName.model.value,
      lastName: lastName.model.value,
      email: email.model.value,
    });

    state.successMessages.push('Account saved successfully.');
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  getUserData();
});
</script>
