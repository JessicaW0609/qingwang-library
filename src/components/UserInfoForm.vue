<script setup>
import { ref } from 'vue'

const INITIAL_FORM = {
  username: '',
  password: '',
  isAustralian: false,
  gender: '',
  reason: ''
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
  submissions.value.push({
    ...form.value,
    submittedAt: new Date().toLocaleString()
  })
  Object.assign(form.value, INITIAL_FORM)
  formEl.classList.remove('was-validated')
}

const onClear = (e) => {
  const formEl = e.target.closest('form')
  Object.assign(form.value, INITIAL_FORM)
  if (formEl) formEl.classList.remove('was-validated')
}

const clearAll = () => { submissions.value = [] }
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">User Information Form</h1>

    <!-- Form -->
    <form class="needs-validation" novalidate @submit="onSubmit">
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            v-model.trim="form.username"
            type="text"
            class="form-control"
            placeholder="Enter your username"
            autocomplete="username"
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
            placeholder="At least 6 characters"
            minlength="6"
            autocomplete="new-password"
            required
          />
          <div class="invalid-feedback">Password must be at least 6 characters.</div>
        </div>
      </div>

      <div class="row g-3 mt-1">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <div class="form-check form-switch mt-4 mt-md-0">
            <input id="isAustralian" v-model="form.isAustralian" class="form-check-input" type="checkbox" />
            <label class="form-check-label" for="isAustralian">Australian Resident?</label>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <label for="gender" class="form-label">Gender</label>
          <select id="gender" v-model="form.gender" class="form-select" required>
            <option value="" disabled>Select...</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
            <option value="prefer_not_to_say">prefer not to say</option>
          </select>
          <div class="invalid-feedback">Please select your gender.</div>
        </div>
      </div>

      <div class="mt-3">
        <label for="reason" class="form-label">Reason for joining</label>
        <textarea
          id="reason"
          v-model.trim="form.reason"
          class="form-control"
          rows="4"
          placeholder="Tell us briefly why you are joining..."
          required
        />
        <div class="invalid-feedback">Please tell us your reason.</div>
      </div>

      <div class="d-flex gap-2 mt-4">
        <button class="btn btn-primary" type="submit">Submit</button>
        <button class="btn btn-secondary" type="button" @click="onClear">Clear</button>
      </div>
    </form>

    <!-- Horizontal table (submissions) -->
    <div class="card mt-4" v-if="submissions.length">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span class="fw-semibold">Submissions</span>
        <button class="btn btn-sm btn-outline-danger" @click="clearAll">Clear All</button>
      </div>

      <div class="table-responsive">
        <table class="table table-hover mb-0 align-middle">
          <thead class="table-light">
            <tr>
              <th style="width:56px;">#</th>
              <th>Username</th>
              <th>Password</th>
              <th>Australian Resident</th>
              <th>Gender</th>
              <th style="min-width: 260px;">Reason</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(s, i) in submissions" :key="i">
              <td>{{ i + 1 }}</td>
              <td class="text-nowrap">{{ s.username }}</td>
              <td class="text-nowrap">{{ s.password ? '*'.repeat(s.password.length) : '' }}</td>
              <td>
                <span :class="['badge', s.isAustralian ? 'text-bg-success' : 'text-bg-secondary']">
                  {{ s.isAustralian ? 'Yes' : 'No' }}
                </span>
              </td>
              <td class="text-nowrap">{{ s.gender }}</td>
              <td style="white-space: pre-wrap;">{{ s.reason }}</td>
              <td class="text-nowrap">{{ s.submittedAt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 { letter-spacing: .5px; }

.table-responsive { overflow-x: auto; }
</style>
