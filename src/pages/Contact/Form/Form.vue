<template>
  <Loader v-if="loading" />

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
        <Input label="First name" :field="firstName" :formSubmitted="formSubmitted" />
      </div>

      <div class="col mb-3">
        <Input label="Last name" :field="lastName" :formSubmitted="formSubmitted" />
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <Input type="email" label="E-mail address" :field="email" :formSubmitted="formSubmitted" />
      </div>

      <div class="col mb-3">
        <Input label="Telephone" :field="telephone" :formSubmitted="formSubmitted" />
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <RadioButton
          :field="sex"
          :radios="[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]"
          :formSubmitted="formSubmitted"
        />
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <Select
          label="Favorite color"
          :class="`${
            favoriteColorState.touched && favoriteColorModel === 'select' ? 'is-invalid' : ''
          }`"
          :field="favoriteColor"
          :formSubmitted="formSubmitted"
        >
          <option value="select" disabled>Select</option>
          <option
            v-for="favoriteColor in favoriteColors"
            :key="favoriteColor.value"
            :value="favoriteColor.value"
          >
            {{ favoriteColor.value }}
          </option>
        </Select>
      </div>
      <div class="col mt-4">
        <Checkbox
          label="Employed"
          :trueValue="true"
          :falseValue="false"
          :field="employed"
          :formSubmitted="formSubmitted"
        />
      </div>
    </div>

    <div class="row">
      <div class="col mb-3">
        <Textarea label="Message" :field="message" :formSubmitted="formSubmitted" />
      </div>
    </div>

    <button class="btn btn-primary me-2" type="submit">Send</button>
    <button class="btn btn-light" type="button" @click="reset">Reset form</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';

import { ContactFormState } from '@/pages/Contact/_files/types';
import { required, requiredEmail, requiredSelect, requiredMin } from '@/shared/files/validations';
import { clearFormMessage, validateForm, setFields } from '@/shared/helpers';
import { useField } from '@/shared/composables';
import { getFavoriteColors } from '@/core/services';
import {
  AlertDismissible,
  Loader,
  Input,
  Checkbox,
  RadioButton,
  Select,
  Textarea,
} from '@/shared/components';

const initialState: ContactFormState = {
  loading: true,
  formSubmitted: false,
  favoriteColors: [],
  successMessages: [],
};

const state = reactive(initialState);
const { loading, formSubmitted, favoriteColors, successMessages } = toRefs(state);

const firstName = useField({ name: 'first-name', validation: requiredMin(2) });
const lastName = useField({ name: 'last-name', validation: requiredMin(2) });
const email = useField({ name: 'email', validation: requiredEmail });
const telephone = useField({ name: 'telephone', validation: requiredMin(8) });
const sex = useField({ name: 'sex', validation: required });
const favoriteColor = useField({
  name: 'favorite-color',
  defaultValue: 'select',
  validation: required,
});
const { model: favoriteColorModel, state: favoriteColorState } = favoriteColor;
const employed = useField<boolean>({ name: 'employed', defaultValue: false });
const message = useField({ name: 'message', validation: required });

const setFavoriteColors = async () => {
  try {
    const response = await getFavoriteColors();
    state.favoriteColors = response;
  } catch (error) {
    console.error(error);
  } finally {
    state.loading = false;
  }
};

const reset = () => {
  state.formSubmitted = false;

  setFields({
    fields: [firstName, lastName, email, telephone, sex, message],
    value: '',
    reset: { required: true },
  });
  setFields({
    fields: [favoriteColor],
    value: 'select',
    reset: { required: true },
  });
  setFields({
    fields: [employed],
    value: false,
    reset: { required: false },
  });
};

const submit = async () => {
  state.formSubmitted = true;

  const isValidForm = validateForm([
    { fields: [firstName, lastName], validation: requiredMin(2) },
    { fields: [email], validation: requiredEmail },
    { fields: [telephone], validation: requiredMin(8) },
    { fields: [sex, message], validation: required },
    { fields: [favoriteColor], validation: requiredSelect(favoriteColorModel) },
  ]);
  if (!isValidForm) return;

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
