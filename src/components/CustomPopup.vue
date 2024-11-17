<template>
  <Transition name="slide-fade">
    <div v-if="isVisible" class="custom-popup">
      <div class="popup-header">
        <h5 class="mb-0">Shopping Cart</h5>
        <button class="btn-close" @click="close"></button>
      </div>

      <div class="popup-body">
        <div class="cart-summary">
          <div class="cart-items">
            <template v-if="cartStore.items.length > 0">
              <h6 class="mb-3">Cart Items</h6>
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="cart-item mb-3"
              >
                <img
                  :src="item.images[0]"
                  :alt="item.title"
                  class="item-image"
                />
                <div class="item-details">
                  <div
                    class="d-flex justify-content-between align-items-start mb-2"
                  >
                    <h6 class="item-title">{{ item.title }}</h6>
                    <button
                      class="btn btn-sm btn-delete"
                      @click="removeFromCart(item.id)"
                      title="Remove item"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                  <div class="price-quantity">
                    <span class="price">${{ item.price }}</span>
                    <div class="quantity-control">
                      <button
                        class="btn btn-sm btn-outline-secondary"
                        @click="decrementQuantity(item)"
                        :disabled="item.quantity <= 1"
                      >
                        -
                      </button>
                      <span class="quantity">{{ item.quantity }}</span>
                      <button
                        class="btn btn-sm btn-outline-secondary"
                        @click="incrementQuantity(item)"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <div v-else class="text-center py-4">Your cart is empty</div>
          </div>

          <div class="cart-total mt-4" v-if="cartStore.items.length > 0">
            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>${{ cartStore.total }}</span>
            </div>
            <router-link
              to="/shopping-cart"
              class="btn btn-primary w-100"
              @click="close"
            >
              Checkout
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Backdrop -->
  <Transition name="fade">
    <div v-if="isVisible" class="popup-backdrop" @click="close"></div>
  </Transition>
</template>

<script setup lang="ts">
import { useCartStore } from '@/API/ShoppingCart'
import type { Product } from '@/types/ProductInterface'

const cartStore = useCartStore()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  isVisible: boolean
  lastAddedItem: Product | null
}>()

const emit = defineEmits(['close', 'updateCart'])

const close = () => {
  emit('close')
}

const removeFromCart = (id: number) => {
  cartStore.removeItem(id)
  emit('updateCart')
}

const incrementQuantity = (item: Product & { quantity: number }) => {
  cartStore.updateQuantity(item.id, item.quantity + 1)
  emit('updateCart')
}

const decrementQuantity = (item: Product & { quantity: number }) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1)
    emit('updateCart')
  }
}
</script>

<style scoped>
.custom-popup {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 1050;
  display: flex;
  flex-direction: column;
}

.popup-header {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup-body {
  padding: 1rem;
  overflow-y: auto;
  flex-grow: 1;
}

.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.item-details {
  flex-grow: 1;
}

.item-title {
  font-size: 0.9rem;
  margin-bottom: 0;
  margin-right: 0.5rem;
}

.price-quantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity {
  min-width: 2rem;
  text-align: center;
}

.btn-delete {
  color: #dc3545;
  padding: 0.25rem 0.5rem;
  border: none;
  background: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.btn-delete:hover {
  opacity: 1;
  color: #dc3545;
}

/* Animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 576px) {
  .custom-popup {
    width: 100%;
  }
}
</style>
