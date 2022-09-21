<template>
  <div
    :class="getFieldClass(isFormSubmitted, state, ['form-check', 'form-check-inline'])"
    v-for="radio in radios"
  >
    <label :class="labelClass" :for="radio.value">{{ radio.label }}</label>
    <input
      :id="radio.value"
      :class="[
        ...getFieldClass(isFormSubmitted, state, ['form-check-input']),
        ...props.class.split(' '),
      ]"
      type="radio"
      :name="state.name"
      :value="radio.value"
      v-model="model"
    />
  </div>
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
  class?: string;
  field: UseField<any>;
  radios: { label: string; value: string }[];
  isFormSubmitted: Ref<boolean>;
};

const props = withDefaults(defineProps<Props>(), {
  labelClass: 'form-check-label',
  class: '',
});
const { field, isFormSubmitted } = props;
const { model, state } = field;
</script>
