<template>
  <div class="form-check">
    <label :class="labelClass" :for="state.name">{{ label }}</label>
    <input
      :id="state.name"
      :class="[
        ...getFieldClass(formSubmitted, state, ['form-check-input']),
        ...(className || '').split(' '),
      ]"
      type="checkbox"
      :name="state.name"
      :true-value="trueValue"
      :false-value="falseValue"
      v-model="model"
      ref="fieldRef"
    />
    <div class="invalid-feedback" v-for="errorMessage in state.errorMessages" :key="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/composables';

type Props = {
  labelClass?: string;
  label: string;
  className?: string;
  trueValue: string | number | boolean;
  falseValue: string | number | boolean;
  field: UseField<any>;
  formSubmitted: boolean;
};

const {
  labelClass = 'form-check-label',
  label,
  className = '',
  trueValue,
  falseValue,
  field,
  formSubmitted,
} = defineProps<Props>();
const { model, ref: fieldRef, state } = field;
</script>
