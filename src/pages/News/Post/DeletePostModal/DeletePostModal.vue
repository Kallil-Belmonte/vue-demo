<template>
  <fragment>
    <loader v-if="loading"></loader>

    <div id="delete-post" :class="{ 'modal fade': true, 'show d-block': open }" tabindex="-1" role="dialog" aria-labelledby="deletePostLabel" :aria-hidden="open ? 'false' : 'true'" @click="onClickOutModal()">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deletePostLabel">Delete confirmation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('closeModal')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-center mb-0">Are you sure you want to delete this post?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="onDeletePost()">Confirm</button>
            <button type="button" class="btn btn-light" @click="$emit('closeModal')">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-backdrop fade show" v-if="open"></div>
  </fragment>
</template>


<script>
import { INSTANCES, ENDPOINTS } from '@/core/Resource/Resource';
import Loader from '@/shared/Components/Loader';

export default {
  //==============================
  // GENERAL
  //==============================
  name: 'DeletePostModal',
  props: {
    open: Boolean,
  },
  components: {
    Loader,
  },

  //==============================
  // DATA
  //==============================
  data() {
    return {
      loading: false,
    }
  },


  //==============================
  // METHODS
  //==============================
  methods: {
    // SET LOADING
    setLoading(value) {
      this.loading = value;
    },

    // ON DELETE POST
    async onDeletePost() {
      this.setLoading(true);

      try {
        await this.$http.delete(`${INSTANCES.jsonPlaceholder}${ENDPOINTS.blog.posts}${this.$route.params.id}`);

        this.$emit('closeModal');
        this.$router.push({ name: 'blog' });
      } catch (error) {
        console.error(error);
        this.setLoading(false);
        throw error;
      }
    },

    // ON CLICK OUT MODAL
    onClickOutModal() {
      if (event.target.id === 'delete-post') {
        this.$emit('closeModal');
      }
    },
  },
};
</script>
