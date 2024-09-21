<template>
  <div data-component="select" class="form-field">
    <div class="label-wrapper">
      <label :for="name">{{ label }}</label>
      <InfoIcon v-if="info" :info="info.text" :maxWidth="info.maxWidth" :position="info.position" />
    </div>

    <template v-if="isMobile()">
      <select
        ref="field"
        v-model="model"
        :id="name"
        :name="name"
        :required="required"
        :disabled="disabled"
        @change="(event: Event) => change?.((event.target as HTMLSelectElement).value, event)"
      >
        <option value="select" disabled>{{ text('Select') }}</option>
        <option
          v-for="option in filteredOptions"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.text }}
        </option>
      </select>
    </template>
    <template v-else>
      <input
        ref="field"
        v-model="inputModel"
        type="text"
        :name="name"
        :id="name"
        :required="required"
        :placeholder="text('Select')"
        :disabled="disabled"
        @input="search"
        @focus="focus"
        @focusout="focusout"
      />
      <IconButton icon="ArrowDown" size="20px" @click="triggerInputFocus" />
      <div role="listbox" tabindex="0" :aria-label="text('Options')" :aria-hidden="!openned">
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
    </template>

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, useTemplateRef, ref, watchEffect } from 'vue';

import type { TooltipPosition } from '@/shared/files/types';
import text from '@/core/languages/text';
import { isMobile, removeAccent } from '@/shared/helpers';
import InfoIcon from '../InfoIcon/InfoIcon.vue';
import IconButton from '../IconButton/IconButton.vue';

type Option = {
  text: string;
  value: string;
  disabled?: boolean;
};

type Props = {
  info?: { text: string; maxWidth?: string; position?: TooltipPosition };
  label: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  options: Option[];
  disabled?: InputHTMLAttributes['disabled'];
  change?: (value: string, event: Event | MouseEvent | FocusEvent) => void;
};

const { info, label, name, required, options, disabled, change } = defineProps<Props>();

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
    @include position(absolute, 43px, 15px);

    &:has(+ [role='listbox'][aria-hidden='false']) {
      rotate: 180deg;
    }
  }

  [role='listbox'] {
    max-height: 202px;
    border-radius: 4px;
    border: 1px solid $field-border-color;
    margin-top: 1px;
    overflow-y: auto;
    @include position(absolute, 76px, 0, auto, 0, 1);

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
