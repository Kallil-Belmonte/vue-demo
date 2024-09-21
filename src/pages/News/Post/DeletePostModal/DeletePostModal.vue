<template>
  <section data-component="delete-post-modal">
    <Modal :open="open" title="Delete Confirmation" :close="cancel">
      <article>
        <p>Are you sure you want to delete this post?</p>
      </article>
      <template #footer>
        <Button variant="base" :click="confirm">Confirm</Button>
        <Button :click="cancel">Cancel</Button>
      </template>
    </Modal>
  </section>
</template>

<script lang="ts" setup>
import { Modal, Button } from '@/shared/components';

type Props = {
  open: boolean;
  confirm: (event: MouseEvent) => void;
  cancel: (event: MouseEvent) => void;
};

const { open, confirm, cancel } = defineProps<Props>();
</script>
