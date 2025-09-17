<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')
const router = useRouter()
const auth = getAuth()

const register = async () => {
  errorMsg.value = ''
  loading.value = true
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('Firebase Register Successful!')

    router.push('/firelogin')
  } catch (err) {
    errorMsg.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container py-4" style="max-width: 480px">
    <h2 class="mb-3">Create an Account</h2>

    <div class="card p-3">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" placeholder="Email" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>
      <button class="btn btn-primary w-100" :disabled="loading" @click="register">
        {{ loading ? 'Creating...' : 'Save to Firebase' }}
      </button>

      <p v-if="errorMsg" class="text-danger small mt-2">{{ errorMsg }}</p>
    </div>
  </div>
</template>
