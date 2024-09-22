<template>
  <header data-layout="Header">
    <Icon class="logo mx-auto" category="Brand" name="Logo" />

    <h1 class="title">{{ PROJECT_TITLE }}</h1>

    <nav class="main-menu">
      <ul>
        <li>
          <router-link class="d-flex align-items-center" to="/" exact>
            <Icon name="Home" />
            Home
          </router-link>
        </li>
        <li>
          <router-link class="d-flex align-items-center" active-class="active" to="/blog">
            <Icon name="Newspaper" />
            Blog
          </router-link>
        </li>
        <li>
          <router-link class="d-flex align-items-center" active-class="active" to="/contact">
            <Icon name="Envelope" />
            Contact
          </router-link>
        </li>
        <li>
          <router-link class="d-flex align-items-center" active-class="active" to="/account">
            <Icon name="User" />
            Account
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="welcome-box d-flex align-items-center">
      <p class="me-3">Hello {{ fullName }}!</p>
      <Button :click="logOut">Log out</Button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

import { useRouter } from 'vue-router';

import { PROJECT_TITLE } from '@/shared/files/consts';
import { clearStorageData } from '@/shared/helpers';
import { fullName, setUser, resetUser } from '@/core/state/auth';
import { getUser } from '@/core/services';
import { Icon, Button } from '@/shared/components';

const router = useRouter();

const getUserData = async () => {
  if (fullName.value.trim()) return;

  try {
    const response = await getUser('id');
    setUser(response);
  } catch (error: any) {
    console.error(error.message);
  }
};

const logOut = () => {
  clearStorageData();
  resetUser();
  router.push({ name: 'login' });
};

// LIFECYCLE HOOKS
onMounted(() => {
  getUserData();
});
</script>

<style lang="scss">
[data-layout='Header'] {
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
          text-decoration: none;
          transition: color 0.3s ease;

          &:hover,
          &:focus,
          &:active,
          &.active {
            color: $primary;
          }

          [data-component='Icon'] {
            @include square(20px);
            margin-right: 10px;
          }
        }
      }
    }
  }

  .welcome-box {
    @include position(absolute, 20px, 20px);
  }
}
</style>
