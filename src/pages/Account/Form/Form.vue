<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="submit">
        <div class="mb-3">
          <Input
            label="Name"
            name="first-name"
            required
            minlength="2"
            maxlength="150"
            placeholder="First name"
            v-model="firstName"
          />
        </div>

        <div class="mb-3">
          <Input
            label="Last name"
            name="last-name"
            required
            minlength="2"
            maxlength="150"
            placeholder="Full last name"
            v-model="lastName"
          />
        </div>

        <div class="mb-3">
          <Input
            ref="emailComponent"
            icon="Email"
            label="E-mail"
            type="email"
            name="email"
            required
            placeholder="Enter your e-mail"
            :input="inputEmail"
            v-model="email"
          />
        </div>

        <Alert
          v-for="(successMessage, index) in successMessages"
          :key="successMessage"
          class="my-3"
          status="success"
          :close="() => clearMessage(successMessages, index)"
        >
          {{ successMessage }}
        </Alert>

        <footer class="d-flex">
          <Button type="submit">Save</Button>
          <Button variant="base" @click="setFormData">Reset form</Button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTemplateRef, ref, onMounted } from 'vue';

import { clearMessage } from '@/shared/helpers';
import { user, setUser } from '@/core/state/auth';
import { Alert, Input, Button } from '@/shared/components';

const emailComponent = useTemplateRef('emailComponent');

const successMessages = ref<string[]>([]);
const firstName = ref('');
const lastName = ref('');
const email = ref('');

const setFormData = () => {
  firstName.value = user.value.firstName;
  lastName.value = user.value.lastName;
  email.value = user.value.email;
};

const inputEmail = (event: Event) => {
  const { value } = event.target as HTMLInputElement;

  if (value === 'john.doe@gmail.com') {
    emailComponent.value?.field?.setCustomValidity('This e-mail already exists.');
  } else if (value === 'demo@demo.com') {
    emailComponent.value?.field?.setCustomValidity('An error occurred, please try again later.');
  } else {
    emailComponent.value?.field?.setCustomValidity('');
  }
};

const submit = async () => {
  setUser({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  });

  successMessages.value = ['Account saved successfully.'];
};

// LIFECYCLE HOOKS
onMounted(() => {
  setFormData();
});
</script>

<style lang="scss">
[data-page='account'] form {
  footer {
    gap: 10px;
  }
}
</style>
