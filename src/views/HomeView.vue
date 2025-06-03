<template>
  <!-- loading -->
  <div
    class="max-w-[640px] m-auto bg-yellow-200 border-yellow-300 border-2 px-0 py-1.5 text-center"
    v-if="postStore.loading"
  >
    Loading Tasks...
  </div>

  <!-- Posts list -->
  <div class="max-w-[700px] m-auto mt-4">
    <p >There are {{ postStore.totalCount }} posts</p>
    <div v-for="post in postStore.posts" :key="post.id">
      <PostDetails :post="post"/>
    </div>
  </div>
</template>

<script>
import { usePostStore } from '@/stores/PostStore'
import PostDetails from '../components/PostDetails.vue'
export default {
  components:{PostDetails},
  data() {
    return {
      postStore: usePostStore(),
    }
  },
  created(){
    this.postStore.getPosts()
  }
}
</script>
