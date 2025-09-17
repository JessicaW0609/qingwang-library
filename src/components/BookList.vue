<!-- src/components/BookList.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../Firebase/init'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'

const books = ref([])
const loading = ref(true)
const errorMsg = ref('')

async function load() {
  loading.value = true
  errorMsg.value = ''
  books.value = []
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(100),
    )
    const snap = await getDocs(q)
    books.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  } catch (e) {
    errorMsg.value = e.message || 'Failed to load books.'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="mt-4">
    <div class="d-flex align-items-center justify-content-between mb-2">
      <h5 class="mb-0">Books (isbn &gt; 1000)</h5>
      <button class="btn btn-sm btn-outline-secondary" @click="load" :disabled="loading">
        {{ loading ? 'Refreshing...' : 'Refresh' }}
      </button>
    </div>

    <p v-if="errorMsg" class="text-danger small">{{ errorMsg }}</p>
    <p v-else-if="loading" class="text-muted small">Loading...</p>
    <p v-else-if="!books.length" class="text-muted">No books found.</p>

    <table v-else class="table table-sm align-middle">
      <thead>
        <tr>
          <th style="width: 120px">ISBN</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in books" :key="b.id">
          <td>{{ b.isbn }}</td>
          <td>{{ b.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
