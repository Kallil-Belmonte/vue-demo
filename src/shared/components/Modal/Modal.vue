<template>
  <dialog ref="element" data-component="Modal" aria-modal="true" @click="click">
    <header>
      <div class="title">
        <Icon v-if="icon" :name="icon" size="30px" />
        <h3>{{ title }}</h3>
      </div>
      <Button :icon="{ name: 'Close' }" @click="close" />
    </header>
    <section class="body">
      <slot></slot>
    </section>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </dialog>
</template>

<script lang="ts" setup>
import { useTemplateRef, watchEffect } from 'vue';

import Button from '../Button/Button.vue';
import Icon from '../Icon/Icon.vue';
import type { Icons } from '../Icon/types';

type Props = {
  isOpen: boolean;
  icon?: Icons;
  title: string;
  close: (event: MouseEvent) => void;
};

const { isOpen, icon, title, close } = defineProps<Props>();

const element = useTemplateRef<HTMLDialogElement>('element');

const click = (event: MouseEvent) => {
  if (event.target === element.value) close(event);
};

const toggleModal = () => {
  if (isOpen) element.value?.showModal();
  else element.value?.close();
};

// LIFECYCLE HOOKS
watchEffect(() => {
  toggleModal();
});
</script>

<style lang="scss">
[data-component='Modal'] {
  max-width: 500px;
  max-height: 500px;
  @include size(calc(100% - 40px), max-content, 20px);
  padding: 0;
  border: none;
  transition: opacity 300ms ease, scale 300ms ease;

  &[open] {
    display: grid;
    grid-template-rows: 60px 1fr 80px;
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 300ms ease;
  }

  @starting-style {
    opacity: 0;
    scale: 0.8;

    &::backdrop {
      background-color: transparent;
    }
  }

  header {
    @extend %flex-center-y;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid $grey-1;

    .title {
      @extend %flex-center-y;

      [data-component='Icon'] {
        color: $primary;
        margin-right: 10px;
      }

      h3 {
        font-weight: 700;
        line-height: normal;
        letter-spacing: 1px;
        margin: 0;
      }
    }
  }

  .body {
    padding: 15px 15px 0 15px;
    overflow-y: auto;

    p {
      margin: 0 0 5px;
    }
  }

  footer {
    @extend %flex-center-y;
    column-gap: 20px;
    padding: 0 15px;
  }
}
</style>
