<template>
  <Loader v-if="loading" />

  <form @submit.prevent="submit">
    <div class="row">
      <div class="col mb-3">
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

      <div class="col mb-3">
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
    </div>

    <div class="row">
      <div class="col mb-3">
        <Input
          icon="Email"
          label="E-mail"
          type="email"
          name="email"
          required
          placeholder="Enter your e-mail"
          v-model="email"
        />
      </div>

      <div class="col mb-3">
        <Input
          icon="Cellphone"
          label="Telephone"
          type="tel"
          name="telephone"
          required
          placeholder="Enter your telephone"
          v-model="telephone"
        />
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <RadioButton
          title="Sex"
          name="sex"
          required
          :radios="[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]"
          v-model="sex"
        />
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <Select
          label="Favorite color"
          name="favorite-color"
          required
          v-model="favoriteColor"
          :options="favoriteColors"
        />
      </div>
      <div class="col mt-4">
        <Checkbox
          label="Employed"
          name="employed"
          :trueValue="true"
          :falseValue="false"
          v-model="employed"
        />
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <Textarea
          label="Message"
          name="message"
          required
          minlength="3"
          maxlength="3000"
          placeholder="Write your message"
          v-model="message"
        />
      </div>
    </div>

    <Alert
      v-for="(successMessage, index) in successMessages"
      :key="successMessage"
      class="mb-3"
      status="success"
      :close="() => clearMessage(successMessages, index)"
    >
      {{ successMessage }}
    </Alert>

    <footer class="d-flex">
      <Button type="submit">Send</Button>
      <Button variant="base" @click="reset">Reset form</Button>
    </footer>
  </form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import type { FavoriteColors } from '@/core/services/contact/types';
import { clearMessage } from '@/shared/helpers';
import { getFavoriteColors } from '@/core/services';
import {
  Alert,
  Loader,
  Input,
  Checkbox,
  RadioButton,
  Select,
  Textarea,
  Button,
} from '@/shared/components';

const loading = ref(true);
const favoriteColors = ref<FavoriteColors[]>([]);
const successMessages = ref<string[]>([]);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const telephone = ref('');
const sex = ref('');
const favoriteColor = ref('');
const employed = ref(false);
const message = ref('');

const setFavoriteColors = async () => {
  try {
    const response = await getFavoriteColors();
    favoriteColors.value = response;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const reset = () => {
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  telephone.value = '';
  sex.value = '';
  favoriteColor.value = '';
  employed.value = false;
  message.value = '';
};

const submit = async () => {
  console.log('Form submitted:', {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    telephone: telephone.value,
    sex: sex.value,
    favoriteColor: favoriteColor.value,
    employed: employed.value,
    message: message.value,
  });

  successMessages.value = ['Message sent successfully.'];
  setTimeout(() => {
    successMessages.value = [];
  }, 3000);

  reset();
};

// LIFECYCLE HOOKS
onMounted(() => {
  setFavoriteColors();
});
</script>

<style lang="scss">
[data-page='Contact'] form {
  footer {
    gap: 10px;
  }
}
</style>
