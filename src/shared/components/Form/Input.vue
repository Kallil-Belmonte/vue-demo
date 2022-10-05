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
  <div class="invalid-feedback" v-for="errorMessage in state.errorMessages">
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

const props = withDefaults(defineProps<Props>(), {
  labelClass: 'form-label',
  class: '',
  type: 'text',
});
const { field } = props;
const { model, ref: fieldRef, state } = field;
</script>
