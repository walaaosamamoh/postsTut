<template>
  <!-- loading -->
  <div
    class="max-w-[640px] m-auto mt-2.5 text-white bg-teal-500 px-0 py-1.5 text-center"
    v-if="postStore.loading"
  >
    Loading Posts...
  </div>

  <!-- Posts list -->
  <div class="max-w-[700px] m-auto mt-4">
    <p>There are {{ postStore.totalCount }} posts</p>
    <div v-for="post in postStore.posts" :key="post.id">
      <PostDetails :post="post" :postStore="postStore" />
    </div>
  </div>
</template>

<script>
import { usePostStore } from '@/stores/PostStore'
import PostDetails from '../components/PostDetails.vue'
export default {
  components: { PostDetails },
  data() {
    return {
      postStore: usePostStore(),
    }
  },
  created() {
    this.postStore.getPosts()
  }
}
</script>
