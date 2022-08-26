<template>
  <Loader v-if="isLoading" />

  <form @submit.prevent="submit">
    <AlertDismissible
      v-for="(successMessage, index) in successMessages"
      :key="successMessage"
      variant="success"
      @dismiss="clearFormMessage(successMessages, index)"
    >
      {{ successMessage }}
    </AlertDismissible>

    <div class="row">
      <div class="col mb-3">
        <label class="form-label" for="first-name">First name</label>
        <input
          id="first-name"
          :class="getFieldClass(firstName)"
          type="text"
          name="first-name"
          v-model="firstName.value"
          ref="firstName.ref"
        />
        <div class="invalid-feedback" v-if="firstName.error">
          {{ firstName.error?.message }}
        </div>
      </div>

      <div class="col mb-3">
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
    </div>

    <div class="row">
      <div class="col mb-3">
        <label class="form-label" for="email">Email address</label>
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

      <div class="col mb-3">
        <label class="form-label" for="telephone">Telephone</label>
        <input
          id="telephone"
          :class="getFieldClass(telephone)"
          type="text"
          name="telephone"
          v-model="telephone.value"
          ref="telephone.ref"
        />
        <div class="invalid-feedback" v-if="telephone.error">
          {{ telephone.error?.message }}
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <div :class="['form-check form-check-inline', sex.error ? 'is-invalid' : '']">
          <input
            id="male"
            :class="['form-check-input', sex.error ? 'is-invalid' : '']"
            type="radio"
            name="male"
            value="male"
            v-model="sex.value"
            ref="sex.ref"
          />
          <label class="form-check-label" for="male">Male</label>
        </div>
        <div :class="['form-check form-check-inline', sex.error ? 'is-invalid' : '']">
          <input
            id="female"
            :class="['form-check-input', sex.error ? 'is-invalid' : '']"
            type="radio"
            name="female"
            value="female"
            v-model="sex.value"
            ref="sex.ref"
          />
          <label class="form-check-label" for="female">Female</label>
        </div>
        <div class="invalid-feedback" v-if="sex.error">
          {{ sex.error?.message }}
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <label class="form-label" for="favorite-color">Favorite color</label>
        <select
          :class="['form-select', favoriteColor.error ? 'is-invalid' : '']"
          name="favorite-color"
          aria-label="Favorite color"
          v-model="favoriteColor.value"
          ref="favoriteColor.ref"
        >
          <option selected disabled value="select">Select</option>
          <option
            v-for="favoriteColor in favoriteColors"
            :key="favoriteColor.value"
            :value="favoriteColor.value"
          >
            {{ favoriteColor.value }}
          </option>
        </select>
        <div class="invalid-feedback" v-if="favoriteColor.error">
          {{ favoriteColor.error?.message }}
        </div>
      </div>
      <div class="col mt-4">
        <div class="form-check">
          <input
            id="employed"
            class="form-check-input"
            type="checkbox"
            name="employed"
            value="employed"
            v-model="employed.value"
            ref="employed.ref"
          />
          <label class="form-check-label" for="employed">Employed</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <label class="form-label" for="message">Message</label>
        <textarea
          id="message"
          :class="getFieldClass(message)"
          name="message"
          rows="3"
          v-model="message.value"
          ref="message.ref"
        />
        <div class="invalid-feedback" v-if="message.error">
          {{ message.error?.message }}
        </div>
      </div>
    </div>

    <button class="btn btn-primary me-2" type="submit">Send</button>
    <button class="btn btn-light" type="button" @click="reset">Reset form</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';

import { useForm } from 'vue-hooks-form';

import { ContactFormState } from '@/pages/Contact/_files/types';
import {
  getFieldClass,
  clearFormMessage,
  validateFields,
  emailValidator,
  selectValidator,
} from '@/shared/helpers';
import { getFavoriteColors } from '@/core/services';
import { AlertDismissible, Loader } from '@/shared/components';

const fields = [
  'First name',
  'Last name',
  'E-mail',
  'Telephone',
  'Sex',
  'Favorite color',
  'Employed',
  'Message',
];

const { useField, set, validateField, values } = useForm({
  defaultValues: {
    'Favorite color': 'select',
  },
});

const state = reactive<ContactFormState>({
  isLoading: true,
  favoriteColors: [],
  firstName: useField('First name', {
    rule: { required: true, min: 2 },
  }),
  lastName: useField('Last name', {
    rule: { required: true, min: 2 },
  }),
  email: useField('E-mail', {
    rule: {
      required: true,
      validator: emailValidator,
    },
  }),
  telephone: useField('Telephone', {
    rule: { required: true },
  }),
  sex: useField('Sex', {
    rule: { required: true },
  }),
  favoriteColor: useField('Favorite color', {
    rule: {
      validator: selectValidator,
    },
  }),
  employed: useField('Employed'),
  message: useField('Message', {
    rule: { required: true },
  }),
  successMessages: [],
});
const {
  isLoading,
  favoriteColors,
  firstName,
  lastName,
  email,
  telephone,
  sex,
  favoriteColor,
  employed,
  message,
  successMessages,
} = toRefs(state);

const setFavoriteColors = async () => {
  try {
    const response = await getFavoriteColors();
    state.favoriteColors = response;
  } catch (error) {
    console.error(error);
  } finally {
    state.isLoading = false;
  }
};

const reset = () => {
  set('First name', '');
  set('Last name', '');
  set('E-mail', '');
  set('Telephone', '');
  set('Sex', '');
  set('Favorite color', 'select');
  set('Employed', false);
  set('Message', '');
};

const submit = async () => {
  const errors = await validateFields(fields, validateField);
  if (errors.length) return;

  console.log('Form submitted:', values);
  state.successMessages.push('Message sent successfully.');
  reset();
};

// LIFECYCLE HOOKS
onMounted(() => {
  setFavoriteColors();
});
</script>
