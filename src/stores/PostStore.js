import {defineStore} from 'pinia'

export const usePostStore = defineStore('postStore',{
  state: ()=>({
    posts: [],
    currentPost: null,
    loading: false
  }),
  getters:{
    totalCount(){
      return this.posts.length
    }
  },
  actions:{
    // get all posts
    async getPosts(){
      this.loading = true
      
        try{
          const res = await fetch('https://jsonplaceholder.typicode.com/posts');
          const data = await res.json();
          this.posts = data;
        }catch(err){
          console.log('error fetching posts', err)
        }
     
      this.loading = false
    },

    //get single post
    async getPost(id){
      this.loading = true
      
        try{
          const res = await fetch('https://jsonplaceholder.typicode.com/posts/'+ id);
          const data = await res.json();
          this.currentPost = data;
        }catch(err){
          console.log('error fetching post', err)
        }
     
      this.loading = false
    }
  }
})