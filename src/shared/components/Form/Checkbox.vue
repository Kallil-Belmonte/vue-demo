<template>
  <div data-component="checkbox">
    <label :for="name">{{ label }}</label>
    <input
      ref="field"
      v-model="model"
      type="checkbox"
      :name="name"
      :id="name"
      :required="required"
      :true-value="trueOption.value"
      :false-value="falseOption.value"
      :disabled="disabled"
      @change="change"
    />

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, useTemplateRef, computed } from 'vue';

type Option = { text?: string; value: string | number | boolean };

type Props = {
  label: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  trueOption: Option;
  falseOption: Option;
  disabled?: InputHTMLAttributes['disabled'];
  change?: InputHTMLAttributes['onChange'];
};

const { label, name, required, trueOption, falseOption, disabled, change } = defineProps<Props>();

const [model] = defineModel<Option['value']>({ required: true });

const field = useTemplateRef<HTMLInputElement>('field');

// EXPOSE
defineExpose({ field });
</script>

<style lang="scss">
[data-component='checkbox'] {
  @extend %flex-center-y;

  label {
    font-weight: 700;
  }
}
</style>
