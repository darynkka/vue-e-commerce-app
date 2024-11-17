<template>
  <div class="container py-4">
    <h2 class="mb-4">Shopping Cart</h2>

    <div v-if="cartStore.items.length === 0" class="text-center py-5">
      <i class="bi bi-cart-x display-1 text-muted"></i>
      <h3 class="mt-3">Your cart is empty</h3>
      <router-link to="/" class="btn btn-primary mt-3">
        Browse Products
      </router-link>
    </div>

    <div v-else>
      <div class="row g-4">
        <div class="col-md-8">
          <div class="card mb-4" v-for="item in cartStore.items" :key="item.id">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-md-2">
                  <img
                    :src="item.images[0]"
                    :alt="item.title"
                    class="img-fluid rounded"
                  />
                </div>
                <div class="col-md-4">
                  <h5 class="card-title">{{ item.title }}</h5>
                  <p class="text-muted mb-0">{{ item.category.name }}</p>
                </div>
                <div class="col-md-2">
                  <div class="input-group">
                    <button
                      class="btn btn-outline-secondary"
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      :disabled="item.quantity <= 1"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      class="form-control text-center"
                      v-model="item.quantity"
                      min="1"
                      @change="updateQuantity(item.id, item.quantity)"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      @click="updateQuantity(item.id, item.quantity + 1)"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div class="col-md-2 text-end">
                  <p class="price mb-0">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                </div>
                <div class="col-md-2 text-end">
                  <button
                    class="btn btn-outline-danger"
                    @click="removeFromCart(item.id)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Order Summary</h5>
              <div class="d-flex justify-content-between mb-3">
                <span>Items ({{ cartStore.itemCount }}):</span>
                <span>${{ cartStore.total.toFixed(2) }}</span>
              </div>
              <button class="btn btn-primary w-100">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '../API/ShoppingCart'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadFromStorage()
})

const updateQuantity = (id: number, quantity: number) => {
  if (quantity < 1) return
  cartStore.updateQuantity(id, quantity)
}

const removeFromCart = (id: number) => {
  cartStore.removeItem(id)
}
</script>

<style scoped>
.price {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0d6efd;
}

.input-group {
  width: 120px;
}

.input-group input {
  text-align: center;
}

.input-group input::-webkit-outer-spin-button,
.input-group input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
