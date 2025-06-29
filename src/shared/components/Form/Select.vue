<template>
  <div ref="element" data-component="Select" class="form-field">
    <div class="label-wrapper">
      <label :for="name">{{ label }}</label>
    </div>

    <div class="field-wrapper">
      <input
        ref="field"
        v-model="model"
        type="text"
        :name="name"
        :id="name"
        :required="required"
        placeholder="Select"
        :disabled="disabled"
        @focus="focus"
        @input="search"
      />
      <Button
        variant="icon"
        :icon="{ name: 'ArrowDown', size: '15px' }"
        :disabled="disabled"
        @click="triggerInputFocus"
      />

      <ul v-show="open" role="listbox" aria-label="Options">
        <li
          v-for="option in filteredOptions"
          :key="option.text"
          role="option"
          :tabindex="disabled || option.disabled ? -1 : 0"
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
import { computed, type InputHTMLAttributes, ref, useTemplateRef, watch, watchEffect } from 'vue';

import type { SelectOption } from '@/shared/files/types';
import { isEqual, removeAccent } from '@/shared/helpers';
import Button from '../Button/Button.vue';

type Props = {
  label: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  value: any;
  options: SelectOption[];
  disabled?: InputHTMLAttributes['disabled'];
  change: (option: SelectOption, event: KeyboardEvent | MouseEvent) => void;
};

const {
  label,
  name,
  required,
  value: valueProp,
  options,
  disabled: disabledProp,
  change,
} = defineProps<Props>();

const element = useTemplateRef<HTMLDivElement>('element');

const field = useTemplateRef<HTMLInputElement | HTMLSelectElement>('field');

const open = ref(false);
const model = ref<string>('');
const filteredOptions = ref<Props['options']>([]);

const disabled = computed(() => disabledProp || !options.length);

const isSelected = (option: SelectOption) => option.text === model.value;

const format = (text: string) => removeAccent(text.toLowerCase());

const focus = () => {
  open.value = true;
};

const search = (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  filteredOptions.value = options.filter(option => format(option.text).includes(format(value)));
};

const triggerInputFocus = () => {
  field.value?.focus();
};

const select = (option: SelectOption, event: KeyboardEvent | MouseEvent) => {
  if (option.disabled) return;
  open.value = false;
  change(option, event);
};

const updateFilteredOptions = () => {
  filteredOptions.value = options;
};

const clickListener = (event: MouseEvent) => {
  const clickedOutside = !element.value
    ?.querySelector('.field-wrapper')
    ?.contains(event.target as HTMLElement);

  if (clickedOutside) {
    const option = options.find(item => format(item.text) === format(model.value)) || {
      text: '',
      value: undefined,
    };
    select(option, event);
    updateFilteredOptions();
  }
};

const updateOpen = (newOpen: boolean) => {
  if (newOpen) document.addEventListener('click', clickListener);
  else document.removeEventListener('click', clickListener);
};

const updateModel = () => {
  const option = options.find(item => isEqual(item.value, valueProp));
  model.value = option?.text || '';
};

// LIFECYCLE HOOKS
watch(open, updateOpen);

watchEffect(() => {
  updateFilteredOptions();
});

watchEffect(() => {
  updateModel();
});

// EXPOSE
defineExpose({ element, field });
</script>

<style lang="scss">
[data-component='Select'].form-field {
  input {
    padding: 0 35px 0 var(--field-spacing-x);
  }

  [data-component='Button'] {
    transition: rotate 0.3s ease;
    @include position(absolute, 40px, 15px);

    &:has(+ [role='listbox'][aria-hidden='false']) {
      rotate: 180deg;
    }
  }

  [role='listbox'] {
    max-height: 202px;
    border-radius: 4px;
    border: 1px solid var(--field-border-color);
    overflow-y: auto;
    @include position(absolute, calc(100% + 1px), 0, auto, 0, 1);

    [role='option'] {
      @extend %flex-vertical-center;
      height: 40px;
      padding: 5px;
      background-color: #fff;
      cursor: pointer;
      @include transitionAll();
      margin: 0;

      &:hover,
      &[aria-selected='true'] {
        background-color: var(--field-border-color);
      }

      &[aria-disabled='true'] {
        pointer-events: none;
        background-color: #fafafa;
      }
    }
  }
}
</style>
