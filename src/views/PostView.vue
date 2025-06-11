<template>
  <div class="container">
    <!-- post -->
    <div v-if="post" class="max-w-[800px] bg-white m-auto p-5 mt-6 rounded-md">
      <h3 class="font-bold text-gray-600 text-xl mb-2 capitalize">{{ post.title }}</h3>
      <p class="text-gray-500">{{ post.body }}</p>
    </div>

    <!-- loading -->
    <div class="max-w-[640px] m-auto mt-2.5 text-white bg-teal-500 px-0 py-1.5 text-center" v-else>
      Loading Post...
    </div>

    <div class="max-w-[800px] m-auto mt-8 flex justify-between items-center font-bold text-xl text-teal-500">
    <!-- back -->
    <router-link :to="{ name: 'home' }" class=" cursor-pointer"> Back </router-link>

    <!-- update post button -->
    <button class="cursor-pointer " @click="isEditing = true">
      Update Post
    </button>
    </div>

    <!-- update form -->
    <form @submit.prevent = "handleUpdate" v-if="isEditing"
    class="max-w-[600px] m-auto mt-8 flex flex-col gap-2 rounded-md shadow-md
    p-5 bg-white">
      <div class="flex items-center gap-2">
        <label class="pr-1">Change Title:</label>
        <input type="text" v-model="editData.title" 
        class="text-gray-500 p-2 bg-white rounded-md focus:outline-none border-teal-500 border-2 flex-1"/>
      </div>
      
      <div class="flex items-center gap-2">
        <label>Change Body:</label>
        <textarea v-model="editData.body"
        class="text-gray-500 p-2 bg-white rounded-md focus:outline-none border-teal-500 border-2 h-[150px] flex-1"></textarea>
      </div>

      <div class="flex items-center justify-between mt-2">
        <button @click="handleCancel"
        class="py-2 px-6 text-white cursor-pointer bg-teal-500 w-fit rounded-md">Cancel</button>
        <input type="submit" value="Save"
        class="py-2 px-6 text-white cursor-pointer bg-teal-500 w-fit rounded-md"/>
      </div>
    </form>

  </div>
</template>

<script>
import { usePostStore } from '@/stores/PostStore'
export default {
  props: ['id'],
  data() {
    return {
      isEditing: false,
      post: null,
      postStore: usePostStore(),
      editData:{
        title:'',
        body:''
      }
    }
  },

  async created() {
    await this.postStore.getPost(this.id)
    this.post = this.postStore.currentPost
    this.editData={...this.post}
  },

  methods:{
    async handleUpdate(){
       await this.postStore.updatePost({
        id: this.id,
        ...this.editData})

        this.post = {...this.editData}
        this.isEditing= false
      
    },

    handleCancel(){
      this.isEditing = true
      this.editData = {...this.post}
    }
  }
}
</script>
