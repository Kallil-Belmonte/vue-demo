<template>
  <label :for="state.name" :class="labelClass">{{ label }}</label>
  <input
    :id="state.name"
    :class="[...getFieldClass(isFormSubmitted, state, baseClasses), ...props.class.split(' ')]"
    :type="type"
    :name="state.name"
    v-model="model"
    ref="fieldRef"
  />
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
  baseClasses?: string[];
  class?: string;
  type?: string;
  label: string;
  field: UseField<any>;
  isFormSubmitted: Ref<boolean>;
};

const props = withDefaults(defineProps<Props>(), {
  labelClass: 'form-label',
  class: '',
  type: 'text',
});
const { field, isFormSubmitted } = props;
const { model, ref: fieldRef, state } = field;
</script>
