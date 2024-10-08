<template>
  <div data-component="Checkbox">
    <label :for="name">{{ label }}</label>
    <input
      ref="field"
      v-model="model"
      type="checkbox"
      :name="name"
      :id="name"
      :required="required"
      :true-value="trueValue"
      :false-value="falseValue"
      :disabled="disabled"
      @change="change"
    />
    <div class="box"></div>

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, useTemplateRef } from 'vue';

type Value = string | number | boolean;

type Props = {
  label: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  trueValue: Value;
  falseValue: Value;
  disabled?: InputHTMLAttributes['disabled'];
  change?: InputHTMLAttributes['onChange'];
};

const { label, name, required, trueValue, falseValue, disabled, change } = defineProps<Props>();

const [model] = defineModel<Value>({ required: true });

const field = useTemplateRef<HTMLInputElement>('field');

// EXPOSE
defineExpose({ field });
</script>

<style lang="scss">
@import '@/assets/scss/helpers/_helpers.scss';

[data-component='Checkbox'] {
  @extend %flex-center-y;
  gap: 10px;
  @include size(max-content, $field-height);
  position: relative;

  &:not(:has(input:disabled)) {
    label,
    input {
      cursor: pointer;
    }
  }

  label {
    font-weight: 700;
  }

  input {
    @include square(18px);
    opacity: 0;
    margin: 0;
    position: absolute;
    right: 0;
    z-index: 1;
  }

  .box {
    @include square(20px, 6px);
    border: 2px solid $field-border-color;
    position: relative;

    &::after {
      content: '';
      @include square(0, 2px);
      background-color: $primary;
      @extend %absolute-center;
      @include transitionAll(0.2s);
    }
  }

  &:has(input:user-invalid) {
    .box {
      border-color: $danger;
    }
  }

  &:has(input:checked) {
    .box {
      border-color: $primary;

      &::after {
        @include square(70%);
      }
    }
  }

  &:has(input:disabled) {
    .box {
      opacity: 0.5;
    }
  }
}
</style>
