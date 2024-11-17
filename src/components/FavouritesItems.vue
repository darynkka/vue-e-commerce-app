<template>
  <div class="container py-4">
    <h2 class="mb-4">Favourites</h2>

    <div v-if="favouritesStore.items.length === 0" class="text-center py-5">
      <i class="bi bi-heart-break display-1 text-muted"></i>
      <h3 class="mt-3">Your favourites list is empty</h3>
      <router-link to="/" class="btn btn-primary mt-3">
        Browse Products
      </router-link>
    </div>

    <div v-else class="row g-4">
      <div
        class="col-md-3"
        v-for="item in favouritesStore.items"
        :key="item.id"
      >
        <div class="card h-100 position-relative">
          <button
            class="btn btn-outline-danger btn-remove"
            @click="removeFromFavourites(item.id)"
          >
            <i class="bi bi-x"></i>
          </button>
          <img :src="item.images[0]" class="card-img-top" :alt="item.title" />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="description-text text-muted">{{ item.description }}</p>
            <p class="price mb-0">${{ item.price.toFixed(2) }}</p>
            <button class="btn btn-primary w-100 mt-3" @click="addToCart(item)">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useFavouritesStore } from '../API/Favourites'
import { useCartStore } from '../API/ShoppingCart'
import type { Product } from '@/types/ProductInterface'

// Ініціалізація магазину улюблених та кошика
const favouritesStore = useFavouritesStore()
const cartStore = useCartStore()

// Завантаження збережених улюблених при завантаженні компонента
onMounted(() => {
  favouritesStore.loadFromStorage()
})

// Метод для видалення товару з улюблених
const removeFromFavourites = (id: number) => {
  favouritesStore.removeItem(id)
}

// Метод для додавання товару в кошик
const addToCart = (product: Product) => {
  cartStore.addItem(product)
}
</script>

<style scoped>
.btn-remove {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.description-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.9rem;
}

.price {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0d6efd;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
