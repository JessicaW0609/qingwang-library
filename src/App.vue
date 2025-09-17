<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
const router = useRouter()

function toggleLogin() {
  if (isAuthenticated.value) {
    localStorage.removeItem('isAuthenticated')
    isAuthenticated.value = false
    router.push('/')
  } else {
    localStorage.setItem('isAuthenticated', 'true')
    isAuthenticated.value = true
  }
}
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="#">My Library App</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMain"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navMain">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/firelogin">Firebase Login</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/fireregister">Register</router-link>
            </li>
          </ul>

          <button class="btn btn-outline-primary" @click="toggleLogin">
            {{ isAuthenticated ? 'Logout' : 'Login' }}
          </button>
        </div>
      </div>
    </nav>

    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
