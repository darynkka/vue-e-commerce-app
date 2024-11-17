<template>
  <div class="page-404 text-center py-5 mt-5">
    <h1 class="display-3 text-primary">404 page</h1>
    <p class="lead text-muted">Oops... Page not found</p>
    <button @click="$router.push('/')" class="btn btn-primary mt-3">
      Back to home page
    </button>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped>
.text-primary {
  color: #0d6efd;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}
</style>
