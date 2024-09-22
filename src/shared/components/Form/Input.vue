<template>
  <div data-component="Input" class="form-field">
    <div class="label-wrapper">
      <label :for="name">{{ label }}</label>
    </div>

    <Icon v-if="icon" :name="icon" />

    <input
      ref="field"
      v-model="model"
      :type="type"
      :name="name"
      :id="name"
      :required="required"
      :pattern="pattern"
      :min="min"
      :max="max"
      :minlength="minlength"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="input"
    />

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, useTemplateRef } from 'vue';

import type { Icons } from '../Icon/types';
import Icon from '../Icon/Icon.vue';

type Props = {
  icon?: Icons;
  label: string;
  type?: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  pattern?: InputHTMLAttributes['pattern'];
  min?: InputHTMLAttributes['min'];
  max?: InputHTMLAttributes['max'];
  minlength?: InputHTMLAttributes['minlength'];
  maxlength?: InputHTMLAttributes['maxlength'];
  placeholder?: InputHTMLAttributes['placeholder'];
  disabled?: InputHTMLAttributes['disabled'];
  input?: (payload: Event) => void;
};

const {
  icon,
  label,
  type = 'text',
  name,
  required,
  pattern,
  min,
  max,
  minlength,
  maxlength,
  placeholder,
  disabled,
  input,
} = defineProps<Props>();

const [model] = defineModel<string>({ required: true });

const field = useTemplateRef<HTMLInputElement>('field');

// EXPOSE
defineExpose({ field });
</script>
