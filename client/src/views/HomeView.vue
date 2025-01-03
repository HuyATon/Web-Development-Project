<template>
  <div>
    <Header/>
    <h1>This is Home</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Header
  }
}
</script>
