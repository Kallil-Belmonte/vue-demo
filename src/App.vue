<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { setPageTitle } from '@/shared/helpers';

const router = useRouter();

router.afterEach(to => {
  const {
    meta: { title },
  } = to;
  setPageTitle(String(title));
});
</script>
