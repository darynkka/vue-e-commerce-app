<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg custom-navbar">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <i class="bi bi-shop me-2"></i>
          E-COMMERCE
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto"></ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/favourites-items">
                <i class="bi bi-heart"></i>
                <span class="ms-1">Favourites</span>
                <span class="badge bg-primary rounded-pill ms-1">{{
                  favouritesItemCount
                }}</span>
              </router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/shopping-cart">
                <i class="bi bi-cart"></i>
                <span class="ms-1">Cart</span>
                <span class="badge bg-primary rounded-pill ms-1">{{
                  cartItemCount
                }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCartStore } from '../API/ShoppingCart'
import { useFavouritesStore } from '../API/Favourites'

const cartStore = useCartStore()
const favouritesStore = useFavouritesStore()

onMounted(() => {
  cartStore.loadFromStorage()
  favouritesStore.loadFromStorage()
})

const cartItemCount = computed(() => cartStore.itemCount)
const favouritesItemCount = computed(() => favouritesStore.itemCount)
</script>

<style scoped>
.custom-navbar {
  background: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.navbar-brand {
  color: #0d6efd;
  font-weight: 600;
  font-size: 1.4rem;
}

.nav-link {
  color: #495057;
  font-weight: 500;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}

.nav-link:hover {
  color: #0d6efd;
}

.badge {
  font-size: 0.7rem;
}
</style>
