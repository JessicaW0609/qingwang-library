<!-- src/views/HomeView.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isAuthenticated = ref(false)
const email = ref('')
const role = ref('')

function loadFromLocal() {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
  email.value = localStorage.getItem('email') || ''
  role.value = localStorage.getItem('role') || ''
}

function onStorage(e) {
  if (['isAuthenticated', 'email', 'role'].includes(e.key)) {
    loadFromLocal()
  }
}

onMounted(() => {
  loadFromLocal()
  window.addEventListener('storage', onStorage)
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', onStorage)
})
</script>

<template>
  <section>
    <h1>Home</h1>
    <p class="text-muted">
      Welcome! Click <strong>About</strong> to test protected routing. If blocked, click
      <strong>Login</strong>, then try again.
    </p>

    <div class="mt-3 p-3 border rounded">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <h5 class="mb-0">Current User</h5>
        <span class="badge" :class="isAuthenticated ? 'bg-success' : 'bg-secondary'">{{
          isAuthenticated ? 'Authenticated' : 'Guest'
        }}</span>
      </div>

      <div class="row g-2">
        <div class="col-12 col-md-6">
          <div class="small text-uppercase text-muted">Email</div>
          <div class="fw-semibold">{{ email || '-' }}</div>
        </div>
        <div class="col-12 col-md-6">
          <div class="small text-uppercase text-muted">Role</div>
          <div>
            <span v-if="role" class="badge bg-dark">{{ role }}</span>
            <span v-else>-</span>
          </div>
        </div>
      </div>

      <div class="mt-3 d-flex flex-wrap gap-2">
        <router-link class="btn btn-outline-primary btn-sm" to="/about">
          Go to About (Protected)
        </router-link>
        <router-link class="btn btn-outline-secondary btn-sm" to="/firelogin"> Login </router-link>
        <router-link class="btn btn-outline-secondary btn-sm" to="/fireregister">
          Register
        </router-link>
        <button class="btn btn-light btn-sm" @click="loadFromLocal">Refresh</button>
      </div>
    </div>

    <p class="small text-muted mt-3">
      Tip: use different emails to demonstrate multiple roles (e.g. <code>admin*@*</code> → Admin,
      <code>*@monash.edu</code> → Staff, others → Student).
    </p>
  </section>
</template>

<style scoped>
section {
  padding: 8px 0;
}
</style>
