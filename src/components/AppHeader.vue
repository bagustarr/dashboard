<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Crypto Dashboard</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/top10" active-class="active">ТОП 10</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about" active-class="active">О нас</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/news" active-class="active">Новости</router-link>
            </li>
          </ul>
          <form class="d-flex me-2" @submit.prevent="handleSearch">
            <input 
              class="form-control me-2" 
              type="search" 
              placeholder="Поиск криптовалюты" 
              v-model="searchQuery"
              @input="handleInput"
            >
            <button class="btn btn-outline-light" type="submit">Найти</button>
          </form>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'AppHeader',
    data() {
      return {
        searchQuery: '',
        searchResults: []
      };
    },
    methods: {
      handleInput() {
        if (this.searchQuery.length > 0) {
          this.$emit('search', this.searchQuery);
        }
      },
      handleSearch() {
        if (this.searchQuery.trim()) {
          this.$router.push({
            path: '/search',
            query: { q: this.searchQuery }
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar-nav .nav-item .nav-link {
    color: #ffffff;
  }
  
  .navbar-nav .nav-item .nav-link.active {
    font-weight: bold;
    color: #ffb800;
  }
  </style>
