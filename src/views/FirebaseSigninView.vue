<!-- src/views/FirebaseSigninView.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const router = useRouter()
const auth = getAuth()

function deriveRoleByEmail(e) {
  const lower = (e || '').toLowerCase().trim()
  if (lower.startsWith('admin')) return 'Admin'
  if (lower.endsWith('@monash.edu')) return 'Staff'
  return 'Student'
}

const signin = async () => {
  errorMsg.value = ''

  const emailTrim = (email.value ?? '').trim()
  const pwdTrim = (password.value ?? '').trim()

  if (!emailTrim || !pwdTrim) {
    errorMsg.value = 'Please enter email and password.'
    return
  }

  loading.value = true
  try {
    await signInWithEmailAndPassword(auth, emailTrim, pwdTrim)
    console.log('Firebase Sign-in Successful!')
    console.log(auth.currentUser)

    localStorage.setItem('isAuthenticated', 'true')

    localStorage.setItem('email', emailTrim)
    localStorage.setItem('role', deriveRoleByEmail(emailTrim))

    const redirect =
      typeof router.currentRoute.value.query.redirect === 'string'
        ? router.currentRoute.value.query.redirect
        : '/'
    router.push(redirect)
  } catch (err) {
    console.log(err.code, err.message)
    switch (err.code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        errorMsg.value = 'Email or password is incorrect, or the account does not exist.'
        break
      case 'auth/invalid-email':
        errorMsg.value = 'Invalid email format.'
        break
      case 'auth/too-many-requests':
        errorMsg.value = 'Too many attempts. Please try again later.'
        break
      case 'auth/network-request-failed':
        errorMsg.value = 'Network error. Please check your connection and try again.'
        break
      case 'auth/user-disabled':
        errorMsg.value = 'This account has been disabled.'
        break
      default:
        errorMsg.value = err.message || 'Sign-in failed.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container py-4" style="max-width: 480px">
    <h2 class="mb-3">Sign in</h2>

    <form class="card p-3" @submit.prevent="signin" novalidate>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          v-model.trim="email"
          type="email"
          class="form-control"
          placeholder="Email"
          :disabled="loading"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Password</label>
        <input
          v-model.trim="password"
          type="password"
          class="form-control"
          placeholder="Password"
          :disabled="loading"
          required
        />
      </div>

      <button class="btn btn-primary w-100" :disabled="loading">
        {{ loading ? 'Signing in...' : 'Sign in via Firebase' }}
      </button>

      <p v-if="errorMsg" class="text-danger small mt-2 mb-0">{{ errorMsg }}</p>
    </form>

    <p class="small mt-3">
      Don't have an account?
      <router-link to="/fireregister">Register here</router-link>
    </p>
  </div>
</template>
