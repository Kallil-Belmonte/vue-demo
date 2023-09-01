<template>
  <footer>
    <div class="container">
      <div class="d-flex justify-content-center">
        <ul class="social-networks list-inline">
          <li class="list-inline-item">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <Icon name="Facebook" />
            </a>
          </li>
          <li class="list-inline-item">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <Icon name="Twitter" />
            </a>
          </li>
          <li class="list-inline-item">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <Icon name="Instagram" />
            </a>
          </li>
          <li class="list-inline-item">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              <Icon name="Linkedin" />
            </a>
          </li>
        </ul>
      </div>

      <div class="copyright text-center">
        <p class="mb-0">© Nome 2016 - Todos os Direitos Reservados</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { Icon } from '@/shared/components';
</script>

<style lang="scss" scoped>
footer {
  padding: 30px 0;

  .social-networks {
    li {
      &:not(:last-child) {
        margin-right: 40px;
      }

      a {
        font-size: 0;
        color: $dark;
        display: inline-block;

        figure {
          @include square(25px);
        }
      }
    }
  }
}
</style>
