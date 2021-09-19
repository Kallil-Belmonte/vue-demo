<template>
  <!-- Binding -->
  <input type="text" v-model="state.valor" />
  <h1>{{ state.valor }}</h1>

  <!-- Componente -->
  <!-- <AppAlertDismissible variant="primary">Conteúdo</AppAlertDismissible> -->
  <!-- <AppPageHeader icon="HomeSolid">Page Header</AppPageHeader> -->

  <!-- Modal -->
  <button type="button" class="btn btn-primary" @click="modalRef.show">Launch demo modal</button>

  <div class="modal fade" ref="modalRef" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="modalRef.hide"
          ></button>
        </div>
        <div class="modal-body">Conteúdo aqui</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="modalRef.hide">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';

import { Modal } from 'bootstrap';

// import AppAlertDismissible from '@/shared/components/AppAlertDismissible.vue';
// import AppPageHeader from '@/shared/components/AppPageHeader.vue';
import { getPosts } from '@/core/services';

const props = defineProps({
  icon: {
    type: String,
  },
});

const state = reactive({
  valor: '',
});

const modalRef = ref();

// LIFECYCLE HOOKS
onMounted(async () => {
  modalRef.value = new Modal(modalRef.value);

  const response = await getPosts();
  console.log(response);
});
</script>
