<template>
  <div class="form-check">
    <label :class="labelClass" :for="state.name">{{ label }}</label>
    <input
      :id="state.name"
      :class="[
        ...getFieldClass(isFormSubmitted, state, ['form-check-input']),
        ...props.class.split(' '),
      ]"
      type="checkbox"
      :name="state.name"
      :true-value="trueValue"
      :false-value="falseValue"
      v-model="model"
      ref="fieldRef"
    />
    <div class="invalid-feedback" v-for="errorMessage in state.errorMessages">
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
  class?: string;
  trueValue: string | number | boolean;
  falseValue: string | number | boolean;
  field: UseField<any>;
  isFormSubmitted: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  labelClass: 'form-check-label',
  class: '',
});
const { field } = props;
const { model, ref: fieldRef, state } = field;
</script>
