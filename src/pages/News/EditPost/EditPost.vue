<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="offset-md-2 col-md-8">
          <edit-post-form></edit-post-form>
        </div>
      </div>
    </div>
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
