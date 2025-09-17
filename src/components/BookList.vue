<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../Firebase/init'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

const books = ref([])
const loading = ref(false)
const errorMsg = ref('')

async function load() {
  loading.value = true
  errorMsg.value = ''
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(50),
    )
    const snap = await getDocs(q)
    books.value = snap.docs.map((d) => {
      const data = d.data()
      return {
        id: d.id,
        ...data,

        _editing: false,
        _draftName: data.name,
        _draftIsbn: data.isbn,
      }
    })
  } catch (e) {
    errorMsg.value = e.message || 'Failed to load books.'
  } finally {
    loading.value = false
  }
}
onMounted(load)

defineExpose({ load })

function startEdit(row) {
  row._editing = true
  row._draftName = String(row.name || '')
  row._draftIsbn = row.isbn
}
function cancelEdit(row) {
  row._editing = false
}

async function saveRow(row) {
  const name = String(row._draftName || '').trim()
  const isbnNum = Number(row._draftIsbn)
  if (!name || !Number.isFinite(isbnNum)) {
    alert('Please enter valid name & numeric ISBN.')
    return
  }
  try {
    await updateDoc(doc(db, 'books', row.id), { name, isbn: isbnNum })
    row.name = name
    row.isbn = isbnNum
    row._editing = false
    console.log('[BookList] update success', row.id)
  } catch (e) {
    alert('Update failed: ' + (e.message || e))
  }
}

async function removeRow(id) {
  if (!confirm('Delete this book?')) return
  try {
    await deleteDoc(doc(db, 'books', id))
    books.value = books.value.filter((b) => b.id !== id)
    console.log('[BookList] delete success', id)
  } catch (e) {
    alert('Delete failed: ' + (e.message || e))
  }
}
</script>

<template>
  <div class="mt-4">
    <div class="d-flex align-items-center justify-content-between mb-2">
      <h5 class="mb-0">Books (isbn &gt; 1000)</h5>
      <div class="small text-muted me-2">
        Query: where(isbn &gt; 1000) • orderBy(isbn, asc) • limit(50)
      </div>
      <button class="btn btn-sm btn-outline-secondary" :disabled="loading" @click="load">
        {{ loading ? 'Refreshing...' : 'Refresh' }}
      </button>
    </div>

    <p v-if="errorMsg" class="text-danger small">{{ errorMsg }}</p>
    <p v-else-if="loading" class="text-muted small">Loading...</p>
    <p v-else-if="!books.length" class="text-muted">No books found.</p>

    <table v-else class="table table-sm align-middle">
      <thead>
        <tr>
          <th style="width: 140px">ISBN</th>
          <th>Name</th>
          <th style="width: 240px">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in books" :key="row.id">
          <td>
            <template v-if="row._editing">
              <input
                v-model.number="row._draftIsbn"
                type="number"
                class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ row.isbn }}
            </template>
          </td>
          <td>
            <template v-if="row._editing">
              <input
                v-model.trim="row._draftName"
                type="text"
                class="form-control form-control-sm"
              />
            </template>
            <template v-else>
              {{ row.name }}
            </template>
          </td>
          <td>
            <template v-if="!row._editing">
              <button class="btn btn-sm btn-outline-secondary me-2" @click="startEdit(row)">
                Edit
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="removeRow(row.id)">
                Delete
              </button>
            </template>
            <template v-else>
              <button class="btn btn-sm btn-primary me-2" @click="saveRow(row)">Save</button>
              <button class="btn btn-sm btn-light" @click="cancelEdit(row)">Cancel</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
