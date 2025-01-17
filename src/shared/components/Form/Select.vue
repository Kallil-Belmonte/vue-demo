<template>
  <div ref="element" data-component="Select" class="form-field">
    <div class="label-wrapper">
      <label :for="name">{{ label }}</label>
    </div>

    <div :tabindex="disabled ? -1 : 0">
      <input
        ref="field"
        v-model="model"
        type="text"
        :name="name"
        :id="name"
        :required="required"
        placeholder="Select"
        :disabled="disabled"
        @input="search"
        @focusout="focusout"
      />
      <Button variant="icon" :icon="{ name: 'ArrowDown', size: '15px' }" :disabled="disabled" />

      <ul role="listbox" aria-label="Options">
        <li
          v-for="option in filteredOptions"
          :key="option.text"
          role="option"
          :tabindex="disabled ? -1 : 0"
          :aria-selected="isSelected(option)"
          :aria-disabled="option.disabled"
          @keyup.enter="event => select(option, event)"
          @click="event => select(option, event)"
        >
          {{ option.text }}
        </li>
      </ul>
    </div>

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, ref, useTemplateRef, watchEffect } from 'vue';

import { removeAccent } from '@/shared/helpers';
import Button from '../Button/Button.vue';

type Option = {
  text: string;
  value: any;
  disabled?: boolean;
};

type Props = {
  label: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  options: Option[];
  disabled?: InputHTMLAttributes['disabled'];
  change?: (option: Option, event: KeyboardEvent | MouseEvent) => void;
};

const { from } = Array;

const { label, name, required, options, disabled, change } = defineProps<Props>();

const [model] = defineModel<string>({ required: true });

const element = useTemplateRef<HTMLDivElement>('element');

const field = useTemplateRef<HTMLInputElement | HTMLSelectElement>('field');

const filteredOptions = ref<Props['options']>([]);

const isSelected = (option: Option) => option.text === model.value;

const format = (text: string) => removeAccent(text.toLowerCase());

const setData = () => {
  filteredOptions.value = options;
};

const search = (event: Event) => {
  const target = event.target as HTMLInputElement;
  filteredOptions.value = options.filter(option =>
    format(option.text).includes(format(target.value)),
  );
};

const focusout = (event: FocusEvent) => {
  const target = event.target as HTMLInputElement;
  const option = options.find(item => item.text.toLowerCase() === target.value.toLowerCase());
  model.value = option?.text || '';
  setData();
};

const select = (option: Option, event: KeyboardEvent | MouseEvent) => {
  if (option.disabled) return;
  model.value = option.text;
  from(element.value?.querySelectorAll<HTMLElement>('[tabindex="0"]') || []).forEach(item =>
    item.blur(),
  );
  change?.(option, event);
};

// LIFECYCLE HOOKS
watchEffect(() => {
  setData();
});

// EXPOSE
defineExpose({ element, field });
</script>

<style lang="scss">
[data-component='Select'].form-field {
  input {
    padding: 0 35px 0 $field-spacing-x;
  }

  [data-component='Button'] {
    transition: rotate 0.3s ease;
    @include position(absolute, 40px, 15px);

    &:has(+ [role='listbox'][aria-hidden='false']) {
      rotate: 180deg;
    }
  }

  [role='listbox'] {
    display: none;
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
      margin: 0;

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

  &:focus-within {
    [role='listbox'] {
      display: block;
    }
  }
}
</style>
