<template>
  <section data-component="DeletePostModal">
    <Modal :isOpen="isOpen" title="Delete Confirmation" :close="cancel">
      <article>
        <p>Are you sure you want to delete this post?</p>
      </article>
      <template #footer>
        <Button :click="confirm">Confirm</Button>
        <Button variant="base" :click="cancel">Cancel</Button>
      </template>
    </Modal>
  </section>
</template>

<script lang="ts" setup>
import { Button, Modal } from '@/shared/components';

type Props = {
  isOpen: boolean;
  confirm: (event: MouseEvent) => void;
  cancel: (event: MouseEvent) => void;
};

const { isOpen, confirm, cancel } = defineProps<Props>();
</script>
