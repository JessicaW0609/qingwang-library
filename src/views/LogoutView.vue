<!-- src/views/LogoutView.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth()
const router = useRouter()
const busy = ref(false)
const note = ref('Ready to sign out.')

const doLogout = async () => {
  if (busy.value) return
  busy.value = true
  note.value = 'Signing out… check the Console panel.'

  console.log('[Logout] before signOut:', auth.currentUser)
  try {
    await signOut(auth)
  } catch (e) {
    console.log('[Logout] signOut error:', e)
  }
  console.log('[Logout] after signOut:', auth.currentUser)

  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('email')
  localStorage.removeItem('role')

  note.value = 'Signed out. See logs above.'
  busy.value = false
}
</script>

<template>
  <div class="container py-4" style="max-width: 560px">
    <h2 class="mb-2">Log out</h2>
    <p class="text-muted">Open DevTools → <strong>Console</strong> ( <em>Preserve log</em>),</p>

    <div class="card p-3">
      <button class="btn btn-danger" :disabled="busy" @click="doLogout">
        {{ busy ? 'Signing out...' : 'Sign out & log current user' }}
      </button>
      <p class="small text-muted mt-2 mb-0">{{ note }}</p>
    </div>

    <div class="mt-3">
      <router-link class="btn btn-outline-primary btn-sm" to="/">Back to Home</router-link>
    </div>
  </div>
</template>
