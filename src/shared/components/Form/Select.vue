<template>
  <div data-component="select" class="form-field">
    <div class="label-wrapper">
      <label :for="name">{{ label }}</label>
    </div>

    <input
      ref="field"
      v-model="inputModel"
      type="text"
      :name="name"
      :id="name"
      :required="required"
      placeholder="Select"
      :disabled="disabled"
      @input="search"
      @focus="focus"
      @focusout="focusout"
    />
    <IconButton icon="ArrowDown" size="15px" @click="triggerInputFocus" />
    <div role="listbox" tabindex="0" aria-label="Options" :aria-hidden="!openned">
      <div
        v-for="option in filteredOptions"
        :key="option.value"
        role="option"
        :aria-selected="isSelected(option.value)"
        :aria-disabled="option.disabled"
        @click="(event: MouseEvent) => select(option, event)"
      >
        {{ option.text }}
      </div>
    </div>

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, useTemplateRef, ref, watchEffect } from 'vue';

import { removeAccent } from '@/shared/helpers';
import IconButton from '../IconButton/IconButton.vue';

type Option = {
  text: string;
  value: string;
  disabled?: boolean;
};

type Props = {
  label: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  options: Option[];
  disabled?: InputHTMLAttributes['disabled'];
  change?: (value: string, event: Event | MouseEvent | FocusEvent) => void;
};

const { label, name, required, options, disabled, change } = defineProps<Props>();

const [model] = defineModel<string>({ required: true });

const field = useTemplateRef<HTMLInputElement | HTMLSelectElement>('field');

const openned = ref(false);
const inputModel = ref('');
const filteredOptions = ref<Props['options']>([]);

const isSelected = (value: string) => value === model.value;

const format = (text: string) => removeAccent(text.toLowerCase());

const search = (event: Event) => {
  const target = event.target as HTMLInputElement;
  filteredOptions.value = options.filter(option =>
    format(option.text).includes(format(target.value)),
  );
};

const focus = () => {
  openned.value = true;
};

const focusout = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement;

  setTimeout(() => {
    const option = options.find(option => format(option.text) === format(target.value));
    change?.(option ? option.value : '', event);
    openned.value = false;
  }, 100);
};

const triggerInputFocus = () => {
  field.value?.focus();
};

const select = (option: Option, event: MouseEvent) => {
  if (option.disabled) return;
  model.value = option.value;
  change?.(option.value, event);
};

const setData = () => {
  inputModel.value = options.find(option => option.value === model.value)?.text || '';
  filteredOptions.value = options;
};

// LIFECYCLE HOOKS
watchEffect(() => {
  setData();
});

// EXPOSE
defineExpose({ field });
</script>

<style lang="scss">
[data-component='select'].form-field {
  input {
    padding: 0 35px 0 $field-spacing-x;
  }

  [data-component='icon-button'] {
    transition: rotate 0.3s ease;
    @include position(absolute, 40px, 15px);

    &:has(+ [role='listbox'][aria-hidden='false']) {
      rotate: 180deg;
    }
  }

  [role='listbox'] {
    max-height: 202px;
    border-radius: 4px;
    border: 1px solid $field-border-color;
    overflow-y: auto;
    @include position(absolute, calc(100% + 1px), 0, auto, 0, 1);

    [role='option'] {
      @extend %flex-center-y;
      height: 40px;
      padding: 5px;
      background-color: #fff;
      cursor: pointer;
      @include transitionAll();

      &:hover,
      &[aria-selected='true'] {
        background-color: $field-border-color;
      }

      &[aria-disabled='true'] {
        pointer-events: none;
        background-color: #fafafa;
      }
    }
  }
}
</style>
