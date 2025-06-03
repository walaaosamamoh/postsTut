<template>
  <div class="bg-white rounded-sm mt-5 shadow-md p-5 border-teal-500 border-2 cursor-pointer">
    <h2 class="font-bold">Post {{ post.id }}</h2>
    <div class="flex justify-between items-center">
      <h3 class="text-gray-600">{{ post.title }}</h3>
      <i class="material-icons !text-[20px] text-teal-500 cursor-pointer">
        delete
      </i>
    </div>
  </div>
</template>

<script>
  export default {
    props:['post']
  }
</script>