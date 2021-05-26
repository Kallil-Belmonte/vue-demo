<template>
  <header>
    <img class="logo" src="@/assets/logo.svg" alt="Vue" />

    <h1 class="title">{{ projectTitle }}</h1>

    <nav class="main-menu">
      <ul>
        <router-link tag="li" active-class="active" to="/" exact>
          <a>
            <font-awesome-icon icon="home" />
            Home
          </a>
        </router-link>

        <router-link tag="li" active-class="active" to="/blog">
          <a>
            <font-awesome-icon icon="newspaper" />
            Blog
          </a>
        </router-link>

        <router-link tag="li" active-class="active" to="/contact">
          <a>
            <font-awesome-icon icon="envelope" />
            Contact
          </a>
        </router-link>

        <router-link tag="li" active-class="active" to="/account">
          <a>
            <font-awesome-icon icon="user" />
            Account
          </a>
        </router-link>
      </ul>
    </nav>

    <div class="welcome-box d-flex align-items-center position-absolute">
      <p class="mb-0 mr-3">Hello {{ userFullName }}!</p>
      <button class="btn btn-dark" type="button" @click="onLogOut()">Log out</button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { mapMutations } from 'vuex';

import { clearStorageData } from '@/core/Vuex/Store';

import { PROJECT_TITLE } from '@/shared/files/consts';

export default defineComponent({
  //==============================
  // GENERAL
  //==============================
  name: 'AppHeader',
  props: {
    userFullName: String,
  },

  //==============================
  // DATA
  //==============================
  data() {
    return {
      projectTitle: PROJECT_TITLE,
    };
  },

  //==============================
  // METHODS
  //==============================
  methods: {
    // MUTATIONS
    ...mapMutations('user', { logOut: 'resetData' }),

    // ON LOG OUT
    onLogOut(): void {
      clearStorageData();
      this.logOut();
      this.$router.push({ name: 'login' });
    },
  },
});
</script>

<style lang="scss" scoped>
@import '../assets/scss/helpers/helpers';

header {
  color: #fff;
  text-align: center;
  padding: 20px;
  background-color: #222;
  position: relative;

  .logo {
    @include square(80px);
  }

  .title {
    font-size: 1.5em;
    margin-bottom: 30px;
  }

  .main-menu {
    svg {
      margin-right: 10px;
    }

    ul {
      padding-left: 0;
      margin-bottom: 0;

      li {
        display: inline-block;
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }

        a {
          color: #fff;
          transition: color 0.3s ease;

          &:hover,
          &:focus,
          &:active,
          &.active {
            color: $primary;
          }
        }
      }
    }
  }

  .welcome-box {
    top: 20px;
    right: 20px;
  }
}
</style>
