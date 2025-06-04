<template>
  <div class="container">
 
    <!-- post -->
    <div v-if="post" class="max-w-[800px] bg-white m-auto p-5 mt-6 rounded-md">
      <h2 class="font-bold text-teal-500 text-2xl mb-3">Post {{ post.id }}</h2>
      <h3 class="font-bold text-gray-600 text-xl mb-2 capitalize">{{ post.title }}</h3>
      <p class="text-gray-500">{{ post.body }}</p>
    </div>

    <!-- loading -->
    <div class="max-w-[640px] m-auto mt-2.5 text-white bg-teal-500 px-0 py-1.5 text-center"
    v-else
    >
      Loading Posts...
    </div>

    <div class="max-w-[800px] m-auto flex justify-between items-center mt-50 font-bold">
      <!-- back -->
     <router-link :to="{name:'home'}"
     class="text-teal-500 cursor-pointer">
        Back
    </router-link>
    
      <!-- delete button -->
    <button 
    class=" text-red-500 cursor-pointer">
    Delete Post
   </button>
    </div>
  </div>


</template>

<script>
import { usePostStore } from '@/stores/PostStore';
  export default {
    props:['id'],
    data(){
      return{
        post: null,
        loading: false
      }
    },
    async created(){
      const postStore= usePostStore()
      await postStore.getPost(this.id)
      this.post = postStore.currentPost
      this.loading = postStore.loading
    }
  }
</script>