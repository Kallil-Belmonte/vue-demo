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
          <Input label="First name" :field="firstName" :formSubmitted="formSubmitted" />
        </div>

        <div class="mb-3">
          <Input label="Last name" :field="lastName" :formSubmitted="formSubmitted" />
        </div>

        <div class="mb-3">
          <Input
            type="email"
            label="E-mail address"
            :field="email"
            :formSubmitted="formSubmitted"
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
        <button class="btn btn-light" type="button" @click="setFormData">Reset form</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import { requiredEmail, requiredMin } from '@/shared/files/validations';
import { clearFormMessage, validateForm } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { user, setUser } from '@/core/state/auth';
import { AlertDismissible, Input } from '@/shared/components';

const formSubmitted = ref(false);
const successMessages = ref<string[]>([]);
const serverErrors = ref<{ email: string[]; request: string[] }>({ email: [], request: [] });

const firstName = useField({ name: 'first-name', validation: requiredMin(2) });
const lastName = useField({ name: 'last-name', validation: requiredMin(2) });
const email = useField({ name: 'email', validation: requiredEmail });

const setFormData = () => {
  firstName.model.value = user.value.firstName;
  lastName.model.value = user.value.lastName;
  email.model.value = user.value.email;
};

const submit = async () => {
  formSubmitted.value = true;

  const isValidForm = validateForm([
    { fields: [firstName, lastName], validation: requiredMin(2) },
    { fields: [email], validation: requiredEmail },
  ]);
  if (!isValidForm) return;

  successMessages.value = [];
  serverErrors.value = { email: [], request: [] };

  if (email.model.value === 'john.doe@email.com') {
    serverErrors.value.email.push('This e-mail already exists.');
  } else if (email.model.value === 'demo@demo.com') {
    serverErrors.value.request.push('An error occurred, please try again later.');
  } else {
    setUser({
      firstName: firstName.model.value,
      lastName: lastName.model.value,
      email: email.model.value,
    });

    successMessages.value.push('Account saved successfully.');
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  setFormData();
});
</script>
