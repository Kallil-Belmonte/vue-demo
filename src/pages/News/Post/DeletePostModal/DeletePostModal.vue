<template>
  <Loader v-if="loading" />

  <div id="delete-post-modal" class="modal fade" tabindex="-1" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Confirmation</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <p class="text-center mb-0">Are you sure you want to delete this post?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="confirmDeletePost">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import { useRouter, useRoute } from 'vue-router';
import { Modal } from 'bootstrap';

import { deletePost } from '@/core/services';
import { Loader } from '@/shared/components';

const modalRef = ref();
const loading = ref(false);

const router = useRouter();
const route = useRoute();

const setUpModal = () => {
  modalRef.value = new Modal(modalRef.value);
};

const confirmDeletePost = async () => {
  modalRef.value.hide();
  loading.value = true;

  try {
    await deletePost(String(route.params.id));
    router.push({ name: 'blog' });
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  setUpModal();
});
</script>
