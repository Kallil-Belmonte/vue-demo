<template>
  <div data-component="input" class="form-field">
    <div class="label-wrapper">
      <label :for="name">{{ label }}</label>
      <InfoIcon v-if="info" :info="info.text" :maxWidth="info.maxWidth" :position="info.position" />
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

import type { TooltipPosition } from '@/shared/files/types';
import { formatText, formatDigit, formatCPF, formatNIF, formatSSN } from '@/shared/helpers';
import type { Icons } from '../Icon/types';
import InfoIcon from '../InfoIcon/InfoIcon.vue';
import Icon from '../Icon/Icon.vue';

type Props = {
  info?: { text: string; maxWidth?: string; position?: TooltipPosition };
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
  info,
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

const [model, modifier] = defineModel<string>({
  required: true,
  set: value => {
    if (modifier.text) return formatText(value);
    if (modifier.digit) return formatDigit(value);
    if (modifier.cpf) return formatCPF(value);
    if (modifier.nif) return formatNIF(value);
    if (modifier.ssn) return formatSSN(value);
    return value;
  },
});

const field = useTemplateRef<HTMLInputElement>('field');

// EXPOSE
defineExpose({ field });
</script>
