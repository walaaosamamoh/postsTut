import {defineStore} from 'pinia'

export const usePostStore = defineStore('postStore',{
  state: ()=>({
    posts: [],
    deletedPosts: new Set(),
    updatedPostsid: new Set(),
    updatedPosts:[],
    addedPosts: [],
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
          this.posts = this.posts.filter(p=>{return !this.updatedPostsid.has(p.id)});
          this.posts= [...this.posts, ...this.addedPosts, ...this.updatedPosts]
        }catch(err){
          console.log('error fetching posts', err)
        }

      this.loading = false
    },

    //get single post
    async getPost(id){
      const localPost = this.posts.find(p => p.id == id);
      if(localPost){
        this.currentPost=localPost;
        return
      }
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
      this.addedPosts= this.addedPosts.filter((post)=>{
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
    },

    //add new post
    async addPost(post){
      this.addedPosts.push(post)
      this.posts.push(post)

      try{
        await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify(post),
          headers: { 'Content-Type': 'application/json' },
        })
      }catch(err){
        console.log('error adding post', err)
        }
    },

    //update post
    async updatePost(post){
      this.updatedPostsid.add(post.id)
      
      if(this.addedPosts.some(p=>p.id===post.id)){
        this.addedPosts = this.addedPosts.map(p =>
        p.id === post.id ? {...p, ...post} : p);
      }else {
        this.updatedPosts.push(post)
      }
      
      if(this.posts.some(p=>p.id===post.id)){
        this.posts = this.posts.map(p =>
        p.id === post.id ? {...p, ...post} : p)
      }

      try{
        await fetch('https://jsonplaceholder.typicode.com/posts/' + post.id,{
          method: 'PATCH',
          body: JSON.stringify({
            title: post.title,
            body: post.body
          }),
          headers: { 'Content-Type': 'application/json' },
        })
      }catch(err){
        console.log('error updating post', err)
        }
    }
  }
})
