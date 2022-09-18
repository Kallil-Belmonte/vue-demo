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
          name="first-name"
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
          name="lastName"
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
          name="email"
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
          name="telephone"
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
        <div :class="['form-check form-check-inline', sexState.dirty && !sex ? 'is-invalid' : '']">
          <input
            id="male"
            :class="['form-check-input', sexState.dirty && !sex ? 'is-invalid' : '']"
            type="radio"
            name="male"
            value="male"
            v-model="sex"
            ref="sexRef"
          />
          <label class="form-check-label" for="male">Male</label>
        </div>
        <div :class="['form-check form-check-inline', sexState.dirty && !sex ? 'is-invalid' : '']">
          <input
            id="female"
            :class="['form-check-input', sexState.dirty && !sex ? 'is-invalid' : '']"
            type="radio"
            name="female"
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
          name="favorite-color"
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
            name="employed"
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
          name="message"
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
import { reactive, toRefs, onMounted } from 'vue';

import { ContactFormState } from '@/pages/Contact/_files/types';
import { getFieldClass, clearFormMessage, setFieldsState, validateFields } from '@/shared/helpers';
import { useField } from '@/shared/composables';
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
  validation: { required: { check: true } },
});
const [lastName, lastNameRef, lastNameState] = useField({
  validation: { required: { check: true } },
});
const [email, emailRef, emailState] = useField({
  validation: { required: { check: true }, email: { check: true } },
});
const [telephone, telephoneRef, telephoneState] = useField({
  validation: { required: { check: true } },
});
const [sex, sexRef, sexState] = useField({ validation: { required: { check: true } } });
const [favoriteColor, favoriteColorRef, favoriteColorState] = useField({
  defaultValue: 'select',
  validation: { required: { check: true } },
});
const [employed, employedRef, employedState] = useField<boolean>();
const [message, messageRef, messageState] = useField({ validation: { required: { check: true } } });

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
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  telephone.value = '';
  sex.value = '';
  favoriteColor.value = 'select';
  employed.value = false;
  message.value = '';

  setTimeout(() => {
    setFieldsState(
      [
        firstNameState,
        lastNameState,
        emailState,
        telephoneState,
        sexState,
        favoriteColorState,
        messageState,
      ],
      {
        untouched: true,
        touched: false,
        pristine: true,
        dirty: false,
        valid: false,
        invalid: true,
        errorMessages: [],
      },
    );

    setFieldsState([employedState], {
      untouched: true,
      touched: false,
      pristine: true,
      dirty: false,
      valid: true,
      invalid: false,
      errorMessages: [],
    });
  }, 10);
};

const submit = async () => {
  const isValidFields = validateFields([
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
