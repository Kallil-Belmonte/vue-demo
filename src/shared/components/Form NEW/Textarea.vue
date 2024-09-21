<template>
  <div data-component="textarea" class="form-field">
    <div class="label-wrapper">
      <label :for="name">{{ label }}</label>
      <InfoIcon v-if="info" :info="info.text" :maxWidth="info.maxWidth" :position="info.position" />
    </div>

    <textarea
      ref="field"
      v-model="model"
      :name="name"
      :id="name"
      :rows="rows"
      :cols="cols"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="input"
    ></textarea>

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type TextareaHTMLAttributes, useTemplateRef } from 'vue';

import type { TooltipPosition } from '@/shared/files/types';
import InfoIcon from '../InfoIcon/InfoIcon.vue';

type Props = {
  info?: { text: string; maxWidth?: string; position?: TooltipPosition };
  label: string;
  name: TextareaHTMLAttributes['name'];
  required?: TextareaHTMLAttributes['required'];
  placeholder?: TextareaHTMLAttributes['placeholder'];
  rows?: TextareaHTMLAttributes['rows'];
  cols?: TextareaHTMLAttributes['cols'];
  disabled?: TextareaHTMLAttributes['disabled'];
  input?: (payload: Event) => void;
};

const {
  info,
  label,
  name,
  required,
  placeholder,
  rows = '4',
  cols,
  disabled,
  input,
} = defineProps<Props>();

const [model] = defineModel<string>({ required: true });

const field = useTemplateRef<HTMLTextAreaElement>('field');

// EXPOSE
defineExpose({ field });
</script>
