<template>
  <div class="container">
    <div class="bg-white rounded-md mt-5 shadow-md p-5 border-teal-500 border-2">
      <h2 class="font-bold text-gray-700 text-[18px]">Post {{ index }}</h2>
      <div class="flex justify-between items-center">
        <h3 class="text-gray-600 capitalize">{{ post.title }}</h3>
        <div class="flex ">
          <i
            class="material-icons !text-[20px] text-teal-500 cursor-pointer"
            @click="postStore.deletePost(post.id)"
          >
            delete
          </i>
          <i
            class="material-icons !text-[20px] text-teal-500 cursor-pointer"
            @click="goTo(post.id)"
          >
            forward
          </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post', 'index', 'postStore'],
  
  methods: {
    goTo(postId) {
      this.$router.push(`/post/${postId}`)
    },
  },
}
</script>
