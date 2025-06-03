import {defineStore} from 'pinia'

export const usePostStore = defineStore('postStore',{
  state: ()=>({
    posts: [],
    loading: false
  }),
  getters:{
    totalCount(){
      return this.posts.length
    }
  },
  actions:{
    async getPosts(){
      this.loading = true
      
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        this.posts = data;
     
      this.loading = false
    }
  }
})