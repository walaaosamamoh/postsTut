<template>
  <form @submit.prevent="handleSubmit" 
  class="flex flex-col max-w-[400px] m-auto gap-2">
    <input class="p-2 bg-white focus:outline-none focus:border-teal-500 focus:border-2"
    type="text" placeholder="Enter Title" v-model="title"/>
    <textarea class="p-2 bg-white focus:outline-none focus:border-teal-500 focus:border-2" 
    type="text" placeholder="Enter Body" v-model="body"></textarea>
    <button class="py-2 px-6 text-white cursor-pointer bg-teal-500 w-fit m-auto rounded-md">
      Add New Post
    </button>
  </form>
</template>

<script>
import { usePostStore } from '@/stores/PostStore'

export default {
  data(){
    return{
      postStore: usePostStore(),
      title: '',
      body: ''
    }
  },
  methods:{
    handleSubmit(){
      if(this.title.length>0 && this.body.length>0){
        this.postStore.addPost({
          id: Math.floor(Math.random()*1000)+100,
          title: this.title,
          body: this.body
        })

        this.title=''
        this.body=''
      }
    }
  }
}
</script>
