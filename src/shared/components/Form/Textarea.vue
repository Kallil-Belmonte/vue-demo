<template>
  <div data-component="Textarea" class="form-field">
    <div class="label-wrapper">
      <label :for="name">{{ label }}</label>
    </div>

    <textarea
      ref="field"
      v-model="model"
      :name="name"
      :id="name"
      :rows="rows"
      :cols="cols"
      :required="required"
      :minlength="minlength"
      :maxlength="maxlength"
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

type Props = {
  label: string;
  name: TextareaHTMLAttributes['name'];
  required?: TextareaHTMLAttributes['required'];
  minlength?: TextareaHTMLAttributes['minlength'];
  maxlength?: TextareaHTMLAttributes['maxlength'];
  placeholder?: TextareaHTMLAttributes['placeholder'];
  rows?: TextareaHTMLAttributes['rows'];
  cols?: TextareaHTMLAttributes['cols'];
  disabled?: TextareaHTMLAttributes['disabled'];
  input?: (payload: Event) => void;
};

const {
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
