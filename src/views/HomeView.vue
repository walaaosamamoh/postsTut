<template>
  <!-- Add post -->
  <div class="my-4">
    <FormPost />
  </div>

  <hr class="text-[#ddd]" />

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
    <div v-for="(post, index) in postStore.posts" :key="post.id">
      <PostDetails :post="post" :postStore="postStore" :index="index + 1"/>
    </div>
  </div>
</template>

<script>
import { usePostStore } from '@/stores/PostStore'
import PostDetails from '../components/PostDetails.vue'
import FormPost from '../components/FormPost.vue'
export default {
  components: { PostDetails, FormPost },
  data() {
    return {
      postStore: usePostStore(),
    }
  },
  created() {
    this.postStore.getPosts()
  },
}
</script>
