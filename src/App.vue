<template>
  <HeaderComp />
  <router-link :to="{name: 'home'}"></router-link>
  <router-view />
</template>

<script>
import HeaderComp from './components/HeaderComp.vue'
  export default {
    components:{HeaderComp}
  }
</script>
