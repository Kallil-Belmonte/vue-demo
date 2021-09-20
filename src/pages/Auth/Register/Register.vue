<template>
  <Auth></Auth>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue';

import { useRouter } from 'vue-router';
import { useForm } from 'vue-hooks-form';

import { RegisterFormState } from '@/pages/Auth/_files/types';
import Auth from '../Auth.vue';
</script>
