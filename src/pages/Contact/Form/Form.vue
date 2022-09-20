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
          :class="getFieldClass(firstNameState)"
          type="text"
          :name="firstNameState.name"
          v-model="firstName"
          ref="firstNameRef"
        />
        <div class="invalid-feedback" v-for="errorMessage in firstNameState.errorMessages">
          {{ errorMessage }}
        </div>
      </div>

      <div class="col mb-3">
        <label class="form-label" for="last-name">Last name</label>
        <input
          id="last-name"
          :class="getFieldClass(lastNameState)"
          type="text"
          :name="lastNameState.name"
          v-model="lastName"
          ref="lastNameRef"
        />
        <div class="invalid-feedback" v-for="errorMessage in lastNameState.errorMessages">
          {{ errorMessage }}
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <label class="form-label" for="email">Email address</label>
        <input
          id="email"
          :class="getFieldClass(emailState)"
          type="email"
          :name="emailState.name"
          v-model="email"
          ref="emailRef"
        />
        <div class="invalid-feedback" v-for="errorMessage in emailState.errorMessages">
          {{ errorMessage }}
        </div>
      </div>

      <div class="col mb-3">
        <label class="form-label" for="telephone">Telephone</label>
        <input
          id="telephone"
          :class="getFieldClass(telephoneState)"
          type="text"
          :name="telephoneState.name"
          v-model="telephone"
          ref="telephoneRef"
        />
        <div class="invalid-feedback" v-for="errorMessage in telephoneState.errorMessages">
          {{ errorMessage }}
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <div :class="getFieldClass(sexState, ['form-check', 'form-check-inline'])">
          <input
            id="male"
            :class="getFieldClass(sexState, ['form-check-input'])"
            type="radio"
            :name="sexState.name"
            value="male"
            v-model="sex"
            ref="sexRef"
          />
          <label class="form-check-label" for="male">Male</label>
        </div>
        <div :class="getFieldClass(sexState, ['form-check', 'form-check-inline'])">
          <input
            id="female"
            :class="getFieldClass(sexState, ['form-check-input'])"
            type="radio"
            :name="sexState.name"
            value="female"
            v-model="sex"
            ref="sexRef"
          />
          <label class="form-check-label" for="female">Female</label>
        </div>
        <div class="invalid-feedback" v-for="errorMessage in sexState.errorMessages">
          {{ errorMessage }}
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <label class="form-label" for="favorite-color">Favorite color</label>
        <select
          :class="[
            'form-select',
            favoriteColorState.dirty && favoriteColor === 'select' ? 'is-invalid' : '',
          ]"
          :name="favoriteColorState.name"
          aria-label="Favorite color"
          v-model="favoriteColor"
          ref="favoriteColorRef"
        >
          <option disabled value="select">Select</option>
          <option
            v-for="favoriteColor in favoriteColors"
            :key="favoriteColor.value"
            :value="favoriteColor.value"
          >
            {{ favoriteColor.value }}
          </option>
        </select>
        <div class="invalid-feedback" v-for="errorMessage in favoriteColorState.errorMessages">
          {{ errorMessage }}
        </div>
      </div>
      <div class="col mt-4">
        <div class="form-check">
          <input
            id="employed"
            class="form-check-input"
            type="checkbox"
            :name="employedState.name"
            value="employed"
            v-model="employed"
            ref="employedRef"
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
          :class="getFieldClass(messageState)"
          :name="messageState.name"
          rows="3"
          v-model="message"
          ref="messageRef"
        />
        <div class="invalid-feedback" v-for="errorMessage in messageState.errorMessages">
          {{ errorMessage }}
        </div>
      </div>
    </div>

    <button class="btn btn-primary me-2" type="submit">Send</button>
    <button class="btn btn-light" type="button" @click="reset">Reset form</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted, computed } from 'vue';

import { ContactFormState } from '@/pages/Contact/_files/types';
import { getFieldClass, clearFormMessage, validateFieldsState, setFields } from '@/shared/helpers';
import { useField, getFieldState } from '@/shared/composables';
import { getFavoriteColors } from '@/core/services';
import { AlertDismissible, Loader } from '@/shared/components';

const initialState: ContactFormState = {
  isLoading: true,
  favoriteColors: [],
  successMessages: [],
};

const state = reactive(initialState);
const { isLoading, favoriteColors, successMessages } = toRefs(state);

const [firstName, firstNameRef, firstNameState] = useField({
  name: 'first-name',
  validation: { required: { check: true } },
});
const [lastName, lastNameRef, lastNameState] = useField({
  name: 'last-name',
  validation: { required: { check: true } },
});
const [email, emailRef, emailState] = useField({
  name: 'email',
  validation: { required: { check: true }, email: { check: true } },
});
const [telephone, telephoneRef, telephoneState] = useField({
  name: 'telephone',
  validation: { required: { check: true } },
});
const [sex, sexRef, sexState] = useField({
  name: 'sex',
  validation: { required: { check: true } },
});
const [favoriteColor, favoriteColorRef, favoriteColorState] = useField({
  name: 'favorite-color',
  defaultValue: 'select',
  validation: { required: { check: true } },
});
const [employed, employedRef, employedState] = useField<boolean>({ name: 'employed' });
const [message, messageRef, messageState] = useField({
  name: 'message',
  validation: { required: { check: true } },
});

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
  setFields({
    fields: [firstName, lastName, email, telephone, sex, message],
    states: [firstNameState, lastNameState, emailState, telephoneState, sexState, messageState],
    value: '',
    newState: getFieldState('first-name', true),
  });
  setFields({
    fields: [favoriteColor],
    states: [favoriteColorState],
    value: 'select',
    newState: getFieldState('favorite-color', true),
  });
  setFields({
    fields: [employed],
    states: [employedState],
    value: false,
    newState: getFieldState('employed'),
  });
};

const submit = async () => {
  const isValidFields = validateFieldsState([
    firstNameState,
    lastNameState,
    emailState,
    telephoneState,
    sexState,
    favoriteColorState,
    messageState,
  ]);
  if (!isValidFields) return;

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

  state.successMessages.push('Message sent successfully.');

  reset();
};

// LIFECYCLE HOOKS
onMounted(() => {
  setFavoriteColors();
});
</script>
