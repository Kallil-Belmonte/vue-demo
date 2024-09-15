<template>
  <label :class="labelClass" :for="state.name">{{ label }}</label>
  <select
    :id="state.name"
    :class="[...getFieldClass(formSubmitted, state, ['form-select']), ...className.split(' ')]"
    :name="state.name"
    v-model="model"
    ref="fieldRef"
  >
    <slot></slot>
  </select>
  <div class="invalid-feedback" v-for="errorMessage in state.errorMessages" :key="errorMessage">
    {{ errorMessage }}
  </div>
</template>

<script lang="ts" setup>
import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/composables';

type Props = {
  labelClass?: string;
  label: string;
  className?: string;
  field: UseField<any>;
  formSubmitted: boolean;
};

const {
  labelClass = 'form-label',
  label,
  className = '',
  field,
  formSubmitted,
} = defineProps<Props>();
const { model, ref: fieldRef, state } = field;
</script>
