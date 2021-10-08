<template>
  <AppLoader v-if="isLoading" />

  <div class="modal fade" tabindex="-1" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Delete Confirmation</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            data-bs-dismiss="modal"
            @click="emits('cancel')"
          ></button>
        </div>
        <div class="modal-body">
          <p class="text-center mb-0">Are you sure you want to delete this post?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-light"
            data-bs-dismiss="modal"
            @click="emits('cancel')"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="confirmDeletePost">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, watch } from 'vue';

import { useRouter, useRoute } from 'vue-router';
import { Modal } from 'bootstrap';

import { deletePost } from '@/core/services/news';
import AppLoader from '@/shared/components/AppLoader.vue';
import { DeletePostModalState } from '../_files/types';

export type Props = {
  isVisible: boolean;
};

const router = useRouter();
const route = useRoute();

const props = defineProps<Props>();
const emits = defineEmits(['cancel']);

const modalRef = ref();

const state = reactive<DeletePostModalState>({
  isLoading: false,
});
const { isLoading } = toRefs(state);

const setUpModal = () => {
  modalRef.value = new Modal(modalRef.value);
  modalRef.value._element.addEventListener('hidden.bs.modal', () => emits('cancel'));
};

const confirmDeletePost = async () => {
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
watch(
  () => props.isVisible,
  newValue => {
    setUpModal();

    if (newValue) modalRef.value.show();
    else modalRef.value.hide();
  },
);
</script>
