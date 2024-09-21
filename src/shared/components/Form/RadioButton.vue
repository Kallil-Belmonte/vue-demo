<template>
  <div data-component="radio-button">
    <div class="title-wrapper">
      <p class="title">{{ title }}</p>
    </div>

    <div class="d-flex align-items-center items">
      <div v-for="radio in radios" :key="radio.label" class="d-flex item">
        <label :for="radio.value">{{ radio.label }}</label>
        <input
          ref="field"
          v-model="model"
          :id="radio.value"
          type="radio"
          :name="name"
          :value="radio.value"
          :required="required"
          :disabled="disabled"
          @change="(event: Event) => change?.((event.target as HTMLInputElement).value, event)"
        />
        <div class="radio"></div>
      </div>
    </div>

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, useTemplateRef } from 'vue';

type Props = {
  title: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  disabled?: InputHTMLAttributes['disabled'];
  radios: { label: string; value: string }[];
  change?: (value: string, event: Event) => void;
};

const { title, name, required, disabled, radios, change } = defineProps<Props>();

const [model] = defineModel<string>({ required: true });

const field = useTemplateRef<HTMLInputElement>('field');

// EXPOSE
defineExpose({ field });
</script>

<style lang="scss">
[data-component='radio-button'] {
  $disabled-primary: color.adjust($primary, $lightness: 10%);

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  .title-wrapper {
    @extend %flex-center-y;
    margin-bottom: 8px;

    .title {
      font-weight: 700;
      margin: 0;
    }

    [data-component='tooltip'] {
      margin-left: 5px;
    }
  }

  .items {
    gap: 10px;

    .item {
      gap: 5px;
      position: relative;

      &:not(:has(input:disabled)) {
        label,
        input {
          cursor: pointer;
        }
      }

      input {
        @include square(22px);
        opacity: 0;
        margin: 0;
        position: absolute;
        right: 0;
        z-index: 1;

        + .radio {
          @include square(18px, 50%);
          border: 2px solid $primary;
          position: relative;

          &::after {
            content: '';
            @include square(0, 50%);
            background-color: $primary;
            @extend %absolute-center;
            @include transitionAll(0.2s);
          }
        }

        &:checked + .radio::after {
          @include square(70%);
        }

        &:disabled + .radio {
          border-color: $disabled-primary;

          &::after {
            background-color: $disabled-primary;
          }
        }
      }
    }
  }

  .validation-message {
    color: $danger;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}
</style>
