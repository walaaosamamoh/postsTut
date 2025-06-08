import {defineStore} from 'pinia'

export const usePostStore = defineStore('postStore',{
  state: ()=>({
    posts: [],
    deletedPosts: new Set(),
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
          this.posts = data.filter(p=>{return !this.deletedPosts.has(p.id)});
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
    },

    //delete post
    async deletePost(id){
      this.deletedPosts.add(id);
      this.posts= this.posts.filter((post)=>{
        return post.id !== id
        });

      try{
          await fetch('https://jsonplaceholder.typicode.com/posts/'+ id, {
          method: 'DELETE'
        })
        console.log('deleted')
      }catch(err){
        console.log('error deleting post', err)
      }
    }
  }
})