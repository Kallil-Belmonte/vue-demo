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

      <div class="col mb-3">
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
    </div>

    <div class="row">
      <div class="col mb-3">
        <label class="form-label" for="email">Email address</label>
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

      <div class="col mb-3">
        <label class="form-label" for="telephone">Telephone</label>
        <input
          id="telephone"
          :class="getFieldClass(isFormSubmitted, telephone)"
          type="text"
          :name="telephoneState.name"
          v-model="telephoneModel"
          ref="telephoneRef"
        />
        <div class="invalid-feedback" v-for="errorMessage in telephoneState.errorMessages">
          {{ errorMessage }}
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <div :class="getFieldClass(isFormSubmitted, sex, ['form-check', 'form-check-inline'])">
          <input
            id="male"
            :class="getFieldClass(isFormSubmitted, sex, ['form-check-input'])"
            type="radio"
            :name="sexState.name"
            value="male"
            v-model="sexModel"
            ref="sexRef"
          />
          <label class="form-check-label" for="male">Male</label>
        </div>
        <div :class="getFieldClass(isFormSubmitted, sex, ['form-check', 'form-check-inline'])">
          <input
            id="female"
            :class="getFieldClass(isFormSubmitted, sex, ['form-check-input'])"
            type="radio"
            :name="sexState.name"
            value="female"
            v-model="sexModel"
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
            favoriteColorState.dirty && favoriteColorModel === 'select' ? 'is-invalid' : '',
          ]"
          :name="favoriteColorState.name"
          aria-label="Favorite color"
          v-model="favoriteColorModel"
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
            v-model="employedModel"
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
          :class="getFieldClass(isFormSubmitted, message)"
          :name="messageState.name"
          rows="3"
          v-model="messageModel"
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
import { reactive, toRefs, onMounted } from 'vue';

import { ContactFormState } from '@/pages/Contact/_files/types';
import { required, requiredEmail, requiredMin } from '@/shared/files/validations';
import { getFieldClass, clearFormMessage, validateFields, setFields } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { getFavoriteColors } from '@/core/services';
import { AlertDismissible, Loader } from '@/shared/components';

const initialState: ContactFormState = {
  isLoading: true,
  isFormSubmitted: false,
  favoriteColors: [],
  successMessages: [],
};

const state = reactive(initialState);
const { isLoading, isFormSubmitted, favoriteColors, successMessages } = toRefs(state);

const firstName = useField({ name: 'first-name', validation: requiredMin(2) });
const { model: firstNameModel, ref: firstNameRef, state: firstNameState } = firstName;

const lastName = useField({ name: 'last-name', validation: requiredMin(2) });
const { model: lastNameModel, ref: lastNameRef, state: lastNameState } = lastName;

const email = useField({ name: 'email', validation: requiredEmail });
const { model: emailModel, ref: emailRef, state: emailState } = email;

const telephone = useField({ name: 'telephone', validation: requiredMin(8) });
const { model: telephoneModel, ref: telephoneRef, state: telephoneState } = telephone;

const sex = useField({ name: 'sex', validation: required });
const { model: sexModel, ref: sexRef, state: sexState } = sex;

const favoriteColor = useField({ name: 'favorite-color', validation: required });
const {
  model: favoriteColorModel,
  ref: favoriteColorRef,
  state: favoriteColorState,
} = favoriteColor;

const employed = useField<boolean>({ name: 'employed' });
const { model: employedModel, ref: employedRef, state: employedState } = employed;

const message = useField({ name: 'message', validation: required });
const { model: messageModel, ref: messageRef, state: messageState } = message;

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
    value: '',
    resetState: true,
  });
  setFields({
    fields: [favoriteColor],
    value: 'select',
    resetState: true,
  });
  setFields({
    fields: [employed],
    value: false,
    resetState: true,
  });
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
    validateFields({
      fields: [telephone],
      validation: requiredMin(8),
    }),
    validateFields({
      fields: [sex, favoriteColor, message],
      validation: required,
    }),
  ].every(isValid => isValid);
  if (!isValidFields) return;

  console.log('Form submitted:', {
    firstName: firstNameModel.value,
    lastName: lastNameModel.value,
    email: emailModel.value,
    telephone: telephoneModel.value,
    sex: sexModel.value,
    favoriteColor: favoriteColorModel.value,
    employed: employedModel.value,
    message: messageModel.value,
  });

  state.successMessages.push('Message sent successfully.');

  reset();
};

// LIFECYCLE HOOKS
onMounted(() => {
  setFavoriteColors();
});
</script>
