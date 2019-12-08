<template>
  <main>
    <b-container>
      <b-row>
        <b-col offset-md="2" md="8">
          <edit-post-form />
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>


<script>
import EditPostForm from '@/pages/News/EditPost/EditPostForm/EditPostForm';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'EditPost',
  components: {
    EditPostForm,
  },
}
</script>
