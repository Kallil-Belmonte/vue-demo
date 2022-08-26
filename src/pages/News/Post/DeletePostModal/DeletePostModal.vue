<template>
  <Loader v-if="isLoading" />

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
import { ref, reactive, toRefs, onMounted } from 'vue';

import { useRouter, useRoute } from 'vue-router';
import { Modal } from 'bootstrap';

import { DeletePostModalState } from '@/pages/News/Post/_files/types';
import { deletePost } from '@/core/services/news';
import { Loader } from '@/shared/components';

const router = useRouter();
const route = useRoute();

const modalRef = ref();

const state = reactive<DeletePostModalState>({
  isLoading: false,
});
const { isLoading } = toRefs(state);

const setUpModal = () => {
  modalRef.value = new Modal(modalRef.value);
};

const confirmDeletePost = async () => {
  modalRef.value.hide();
  state.isLoading = true;

  try {
    await deletePost(String(route.params.id));
    router.push({ name: 'blog' });
  } catch (error) {
    console.error(error);
    state.isLoading = false;
  }
};

// LIFECYCLE HOOKS
onMounted(() => {
  setUpModal();
});
</script>
