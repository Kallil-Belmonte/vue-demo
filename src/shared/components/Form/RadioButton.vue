<template>
  <div data-component="RadioButton">
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
[data-component='RadioButton'] {
  .title-wrapper {
    @extend %flex-vertical-center;
    margin-bottom: 8px;

    .title {
      font-weight: 700;
      margin: 0;
    }

    [data-component='Tooltip'] {
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
        appearance: none;
        @include square(18px, 50%);
        border: 2px solid $field-border-color;
        margin: 0;
        position: relative;

        &::after {
          content: '';
          @include square(0, 50%);
          background-color: $primary;
          @extend %absolute-center;
          @include transitionAll(0.2s);
        }

        &:checked {
          border-color: $primary;

          &::after {
            @include square(70%);
          }
        }

        &:user-invalid {
          border-color: $danger;
        }

        &:disabled {
          opacity: 0.5;
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
