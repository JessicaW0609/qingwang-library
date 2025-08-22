<script setup>
import { ref } from 'vue'

const INITIAL_FORM = {
  username: '',
  password: '',
  isAustralian: false,
  gender: '',
  reason: '',
}

const form = ref({ ...INITIAL_FORM })
const submissions = ref([])

const onSubmit = (e) => {
  e.preventDefault()
  const formEl = e.target

  if (!formEl.checkValidity()) {
    e.stopPropagation()
    formEl.classList.add('was-validated')
    return
  }

  submissions.value.push({ ...form.value })

  Object.assign(form.value, INITIAL_FORM)
  formEl.classList.remove('was-validated')
}

const onClear = (e) => {
  const formEl = e.target.closest('form')
  Object.assign(form.value, INITIAL_FORM)
  if (formEl) formEl.classList.remove('was-validated')
}

const clearAllCards = () => {
  submissions.value = []
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">User Information Form</h1>

    <form class="needs-validation" novalidate @submit="onSubmit">
      <!-- Row 1: Username / Password -->
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            v-model.trim="form.username"
            type="text"
            class="form-control"
            required
          />
          <div class="invalid-feedback">Please enter your username.</div>
        </div>

        <div class="col-12 col-md-6">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-control"
            minlength="6"
            required
          />
          <div class="invalid-feedback">Password must be at least 6 characters.</div>
        </div>
      </div>

      <!-- Row 2: Australian Resident? / Gender -->
      <div class="row g-3 mt-1">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <div class="form-check mt-4 mt-md-0">
            <input
              id="isAustralian"
              v-model="form.isAustralian"
              class="form-check-input"
              type="checkbox"
            />
            <label class="form-check-label" for="isAustralian"> Australian Resident? </label>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <label for="gender" class="form-label">Gender</label>
          <select id="gender" v-model="form.gender" class="form-select" required>
            <option value="" disabled>Select...</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
          <div class="invalid-feedback">Please select your gender.</div>
        </div>
      </div>

      <!-- Row 3: Reason -->
      <div class="mt-3">
        <label for="reason" class="form-label">Reason for joining</label>
        <textarea id="reason" v-model.trim="form.reason" class="form-control" rows="4" required />
        <div class="invalid-feedback">Please tell us your reason.</div>
      </div>

      <!-- Actions -->
      <div class="d-flex gap-2 mt-4">
        <button class="btn btn-primary" type="submit">Submit</button>
        <button class="btn btn-secondary" type="button" @click="onClear">Clear</button>

        <button
          v-if="submissions.length"
          class="btn btn-outline-danger ms-auto"
          type="button"
          @click="clearAllCards"
        >
          Clear All Cards
        </button>
      </div>
    </form>

    <div class="row row-cols-1 row-cols-md-2 g-4 mt-4" v-if="submissions.length">
      <div class="col" v-for="(s, idx) in submissions" :key="idx">
        <div class="card h-100 shadow-sm">
          <div class="card-header bg-primary text-white">User Information</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>Username:</strong> {{ s.username }}</li>
            <li class="list-group-item"><strong>Password:</strong> {{ s.password }}</li>
            <li class="list-group-item">
              <strong>Australian Resident:</strong> {{ s.isAustralian ? 'Yes' : 'No' }}
            </li>
            <li class="list-group-item"><strong>Gender:</strong> {{ s.gender }}</li>
            <li class="list-group-item"><strong>Reason:</strong> {{ s.reason }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  letter-spacing: 0.5px;
}
</style>
