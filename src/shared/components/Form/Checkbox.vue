<template>
  <div class="form-check">
    <div class="label-wrapper">
      <label :for="name">
        {{ label }} <span>{{ optionText }}</span>
      </label>
    </div>
    <input
      ref="field"
      v-model="model"
      type="checkbox"
      :name="name"
      :id="name"
      :required="required"
      :true-value="trueOption.value"
      :false-value="falseOption.value"
      :disabled="disabled"
      @change="change"
    />

    <p v-if="!!field?.validationMessage" class="validation-message">
      <strong>{{ field.validationMessage }}</strong>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type InputHTMLAttributes, useTemplateRef, computed } from 'vue';

type Option = { text?: string; value: string | number | boolean };

type Props = {
  label: string;
  name: InputHTMLAttributes['name'];
  required?: InputHTMLAttributes['required'];
  trueOption: Option;
  falseOption: Option;
  disabled?: InputHTMLAttributes['disabled'];
  change?: InputHTMLAttributes['onChange'];
};

const { label, name, required, trueOption, falseOption, disabled, change } = defineProps<Props>();

const [model] = defineModel<Option['value']>({ required: true });

const field = useTemplateRef<HTMLInputElement>('field');

const optionText = computed(() => {
  const trueText = trueOption.text || 'Yes';
  const falseText = falseOption.text || 'No';
  return model.value === trueOption.value ? trueText : falseText;
});

// EXPOSE
defineExpose({ field });
</script>
