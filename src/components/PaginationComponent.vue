<template>
  <nav aria-label="Product pagination" class="mt-4">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button
          class="page-link"
          @click="emit('update:currentPage', currentPage - 1)"
          :disabled="currentPage === 1"
        >
          Previous
        </button>
      </li>
      <li
        v-for="page in totalPages"
        :key="page"
        class="page-item"
        :class="{ active: page === currentPage }"
      >
        <button class="page-link" @click="emit('update:currentPage', page)">
          {{ page }}
        </button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button
          class="page-link"
          @click="emit('update:currentPage', currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  'update:currentPage': [number]
}>()
</script>

<style scoped>
.pagination .page-link {
  color: #0d6efd;
}

.pagination .active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
}
</style>
