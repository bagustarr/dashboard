<template>
  <div id="app">
    
    <AppHeader />
   
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader
  }
};
</script>

<style>
body {
  background-color: #121212;
  color: #ffffff;
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
}

.table {
  color: #ffffff;
}

.card {
  background-color: #1f1f1f;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar {
  margin-bottom: 20px;
}

.container {
  padding: 20px;
}
</style>