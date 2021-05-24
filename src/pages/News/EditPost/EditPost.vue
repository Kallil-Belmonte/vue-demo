<template>
  <main>
    <b-container>
      <b-row>
        <b-col offset-md="2" md="8">
          <Form />
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Form from '@/pages/News/EditPost/Form/Form.vue';

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'EditPost',
  components: {
    Form,
  },
});
</script>
