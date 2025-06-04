<template>
  <div class="container">
    <div class="bg-white rounded-md mt-5 shadow-md p-5 border-teal-500 border-2 cursor-pointer"
    @click="goTo(post.id)">
    <h2 class="font-bold text-gray-700 text-[18px]">Post {{ post.id }}</h2>
    <div class="flex justify-between items-center">
      <h3 class="text-gray-600 capitalize">{{ post.title }}</h3>
      <i class="material-icons !text-[20px] text-teal-500 cursor-pointer">
        delete
      </i>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    props:['post'],
    methods:{
      goTo(postId){
        this.$router.push(`/post/${postId}`)
      }
    }
  }
</script>