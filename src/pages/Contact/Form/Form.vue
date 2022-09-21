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
        <Input label="First name" :field="firstName" :isFormSubmitted="isFormSubmitted" />
      </div>

      <div class="col mb-3">
        <Input label="Last name" :field="lastName" :isFormSubmitted="isFormSubmitted" />
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <Input
          type="email"
          label="E-mail address"
          :field="email"
          :isFormSubmitted="isFormSubmitted"
        />
      </div>

      <div class="col mb-3">
        <Input label="Telephone" :field="email" :isFormSubmitted="isFormSubmitted" />
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <div :class="getFieldClass(isFormSubmitted, sexState, ['form-check', 'form-check-inline'])">
          <Input
            type="radio"
            label="Male"
            labelClass="form-check-label"
            :baseClasses="['form-check-input']"
            :field="sex"
            :isFormSubmitted="isFormSubmitted"
          />
        </div>
        <div :class="getFieldClass(isFormSubmitted, sexState, ['form-check', 'form-check-inline'])">
          <Input
            type="radio"
            label="Female"
            labelClass="form-check-label"
            :baseClasses="['form-check-input']"
            :field="sex"
            :isFormSubmitted="isFormSubmitted"
          />
        </div>
        <div class="invalid-feedback" v-for="errorMessage in sexState.errorMessages">
          {{ errorMessage }}
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <label class="form-label" :for="favoriteColorState.name">Favorite color</label>
        <select
          :id="favoriteColorState.name"
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
          <Input
            type="checkbox"
            label="Employed"
            labelClass="form-check-label"
            :baseClasses="['form-check-input']"
            :field="employed"
            :isFormSubmitted="isFormSubmitted"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <label class="form-label" :for="messageState.name">Message</label>
        <textarea
          :id="messageState.name"
          :class="getFieldClass(isFormSubmitted, messageState)"
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
import { reactive, toRefs, computed, onMounted } from 'vue';

import { ContactFormState } from '@/pages/Contact/_files/types';
import { required, requiredEmail, requiredMin } from '@/shared/files/validations';
import { getFieldClass, clearFormMessage, validateForm, setFields } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { getFavoriteColors } from '@/core/services';
import { AlertDismissible, Loader, Input } from '@/shared/components';

const initialState: ContactFormState = {
  isLoading: true,
  isFormSubmitted: false,
  favoriteColors: [],
  successMessages: [],
};

const state = reactive(initialState);
const {
  isLoading,
  isFormSubmitted: isFormSubmittedState,
  favoriteColors,
  successMessages,
} = toRefs(state);

const isFormSubmitted = computed(() => isFormSubmittedState);

const firstName = useField({ name: 'first-name', validation: requiredMin(2) });
const lastName = useField({ name: 'last-name', validation: requiredMin(2) });
const email = useField({ name: 'email', validation: requiredEmail });
const telephone = useField({ name: 'telephone', validation: requiredMin(8) });
const sex = useField({ name: 'sex', validation: required });
const { state: sexState } = sex;
const favoriteColor = useField({ name: 'favorite-color', validation: required });
const {
  model: favoriteColorModel,
  ref: favoriteColorRef,
  state: favoriteColorState,
} = favoriteColor;
const employed = useField<boolean>({ name: 'employed' });
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
  state.isFormSubmitted = false;

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

  const isValidFields = validateForm([
    { fields: [firstName, lastName], validation: requiredMin(2) },
    { fields: [email], validation: requiredEmail },
    { fields: [telephone], validation: requiredMin(8) },
    { fields: [sex, favoriteColor, message], validation: required },
  ]);
  if (!isValidFields) return;

  console.log('Form submitted:', {
    firstName: firstName.model.value,
    lastName: lastName.model.value,
    email: email.model.value,
    telephone: telephone.model.value,
    sex: sex.model.value,
    favoriteColor: favoriteColor.model.value,
    employed: employed.model.value,
    message: message.model.value,
  });

  state.successMessages.push('Message sent successfully.');

  reset();
};

// LIFECYCLE HOOKS
onMounted(() => {
  setFavoriteColors();
});
</script>
