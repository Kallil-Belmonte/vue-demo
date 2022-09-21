<template>
  <label :class="labelClass" :for="state.name">{{ label }}</label>
  <select
    :id="state.name"
    :class="[...getFieldClass(isFormSubmitted, state, baseClasses), ...props.class.split(' ')]"
    :name="state.name"
    v-model="model"
    ref="fieldRef"
  >
    <slot></slot>
  </select>
  <div class="invalid-feedback" v-for="errorMessage in state.errorMessages">
    {{ errorMessage }}
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';

import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/composables';

type Props = {
  labelClass?: string;
  label: string;
  baseClasses?: string[];
  class?: string;
  field: UseField<any>;
  isFormSubmitted: Ref<boolean>;
};

const props = withDefaults(defineProps<Props>(), {
  labelClass: 'form-label',
  class: '',
});
const { field, isFormSubmitted } = props;
const { model, ref: fieldRef, state } = field;
</script>
