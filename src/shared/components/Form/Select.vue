<template>
  <div ref="element" data-component="Select" class="form-field" :tabindex="disabled ? -1 : 0">
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
    />
    <Button variant="icon" :icon="{ name: 'ArrowDown', size: '15px' }" :disabled="disabled" />

    <ul role="listbox" aria-label="Options">
      <li
        v-for="option in filteredOptions"
        :key="option.value"
        role="option"
        :tabindex="disabled ? -1 : 0"
        :aria-selected="isSelected(option.value)"
        :aria-disabled="option.disabled"
        @keyup.enter="event => select(option, event)"
        @click="event => select(option, event)"
      >
        {{ option.text }}
      </li>
    </ul>

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
  value: string;
  disabled?: boolean;
};

type Props = {
  label: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  options: Option[];
  disabled?: InputHTMLAttributes['disabled'];
  change?: (value: string, event: KeyboardEvent | MouseEvent) => void;
};

const { from } = Array;

const { label, name, required, options, disabled, change } = defineProps<Props>();

const [model] = defineModel<string>({ required: true });

const element = useTemplateRef<HTMLDivElement>('element');

const field = useTemplateRef<HTMLInputElement | HTMLSelectElement>('field');

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

const select = (option: Option, event: KeyboardEvent | MouseEvent) => {
  if (option.disabled) return;
  model.value = option.value;
  from(element.value?.querySelectorAll<HTMLElement>('[tabindex="0"]') || []).forEach(item =>
    item.blur(),
  );
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
