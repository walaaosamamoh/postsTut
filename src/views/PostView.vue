<template>
  <div class="container">
    <!-- post -->
    <div v-if="post" class="max-w-[800px] bg-white m-auto p-5 mt-6 rounded-md">
      <h3 class="font-bold text-gray-600 text-xl mb-2 capitalize">{{ post.title }}</h3>
      <p class="text-gray-500">{{ post.body }}</p>
    </div>

    <!-- loading -->
    <div class="max-w-[640px] m-auto mt-2.5 text-white bg-teal-500 px-0 py-1.5 text-center" v-else>
      Loading Posts...
    </div>

    <!-- back -->
    <router-link :to="{ name: 'home' }" class="text-teal-500 cursor-pointer font-bold mt-50 block w-full text-center text-xl"> Back </router-link>
  </div>
</template>

<script>
import { usePostStore } from '@/stores/PostStore'
export default {
  props: ['id'],
  data() {
    return {
      post: null,
      postStore: usePostStore(),
    }
  },
  async created() {
    await this.postStore.getPost(this.id)
    this.post = this.postStore.currentPost
  }
}
</script>
