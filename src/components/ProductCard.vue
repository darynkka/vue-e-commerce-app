<template>
  <div class="card product-card h-100">
    <div class="position-relative">
      <img
        :src="product.images[0]"
        class="card-img-top p-3"
        :alt="product.title"
      />
      <button class="btn btn-light btn-favorite" @click="toggleFavorite">
        <i
          class="bi"
          :class="isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart'"
        ></i>
      </button>
    </div>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-truncate">{{ product.title }}</h5>
      <p class="card-text text-muted small mb-2">{{ product.category.name }}</p>
      <p class="card-text description-text">{{ product.description }}</p>
      <div class="mt-auto">
        <div class="d-flex justify-content-between align-items-center">
          <span class="price">${{ product.price }}</span>
          <button class="btn btn-primary" @click="addToCart">
            <i class="bi bi-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/types/ProductInterface'
import { useFavouritesStore } from '@/API/Favourites'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits(['addToCart'])

// Використання favouritesStore
const favouritesStore = useFavouritesStore()

// Перевірка, чи товар у списку улюблених
const isFavorite = computed(() =>
  favouritesStore.items.some(item => item.id === props.product.id),
)

// Додавання та видалення товару з улюблених
const toggleFavorite = () => {
  if (isFavorite.value) {
    favouritesStore.removeItem(props.product.id)
  } else {
    favouritesStore.addItem(props.product)
  }
}

// Додавання товару в кошик
const addToCart = () => {
  emit('addToCart', props.product)
}
</script>

<style scoped>
.product-card {
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.card-img-top {
  height: 200px;
  object-fit: contain;
}

.btn-favorite {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.btn-primary {
  background-color: #0d6efd;
  border: none;
  padding: 0.5rem 1rem;
}

.btn-primary:hover {
  background-color: #0b5ed7;
}
</style>
