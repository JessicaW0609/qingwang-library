<!-- src/views/AddBookView.vue -->
<script setup>
import { ref } from 'vue'
import { db } from '../Firebase/init'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import BookList from '../components/BookList.vue'

const isbn = ref(null)
const name = ref('')
const loading = ref(false)
const message = ref('')
const errorMsg = ref('')

const listRef = ref(null)

const onSubmit = async () => {
  message.value = ''
  errorMsg.value = ''

  const nameTrim = String(name.value ?? '').trim()

  const isbnNum =
    typeof isbn.value === 'number' ? isbn.value : Number(String(isbn.value ?? '').trim())

  if (!nameTrim || !Number.isFinite(isbnNum)) {
    errorMsg.value = 'Both fields are required. ISBN must be a number.'
    return
  }

  loading.value = true
  try {
    await addDoc(collection(db, 'books'), {
      isbn: isbnNum,
      name: nameTrim,
      createdAt: serverTimestamp(),
    })
    message.value = 'Book added to Firestore.'

    isbn.value = null
    name.value = ''

    listRef.value?.load()
  } catch (e) {
    errorMsg.value = e.message || 'Failed to add book.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container py-4" style="max-width: 640px">
    <h2 class="mb-3">Add Book</h2>

    <form class="card p-3 mb-3" @submit.prevent="onSubmit" novalidate>
      <div class="mb-3">
        <label class="form-label">ISBN (number)</label>
        <input
          v-model.number="isbn"
          type="number"
          class="form-control"
          placeholder="e.g. 1234"
          required
          :disabled="loading"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Name</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          placeholder="Book name"
          required
          :disabled="loading"
        />
      </div>

      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Saving...' : 'Save to Firestore' }}
      </button>

      <p v-if="message" class="text-success small mt-2 mb-0">{{ message }}</p>
      <p v-if="errorMsg" class="text-danger small mt-2 mb-0">{{ errorMsg }}</p>
    </form>

    <BookList ref="listRef" />
  </div>
</template>
