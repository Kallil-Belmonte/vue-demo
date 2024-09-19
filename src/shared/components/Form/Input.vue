<template>
  <label :class="labelClass" :for="state.name">{{ label }}</label>
  <input
    :id="state.name"
    :class="[...getFieldClass(formSubmitted, state, fieldClasses)]"
    :type="type"
    :name="state.name"
    :placeholder="placeholder"
    v-model="model"
    ref="fieldRef"
  />
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
  fieldClasses?: string[];
  type?: string;
  placeholder?: string;
  field: UseField<any>;
  formSubmitted: boolean;
};

type Emits = {
  (event: 'paginate', target: string): void;
};

const {
  labelClass = 'form-label',
  label,
  fieldClasses,
  type = 'text',
  placeholder,
  field,
  formSubmitted,
} = defineProps<Props>();
const { model, ref: fieldRef, state } = field;

const emit = defineEmits<Emits>();
</script>
