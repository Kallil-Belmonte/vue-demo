<template>
  <label :class="labelClass" :for="state.name">{{ label }}</label>
  <textarea
    :id="state.name"
    :class="[...getFieldClass(formSubmitted, state, fieldClasses)]"
    :name="state.name"
    :rows="rows"
    v-model="model"
    ref="fieldRef"
  ></textarea>
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
  rows?: string;
  field: UseField<any>;
  formSubmitted: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  labelClass: 'form-label',
  class: '',
  rows: '3',
});
const { field } = props;
const { model, ref: fieldRef, state } = field;
</script>
