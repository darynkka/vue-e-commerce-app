import { defineStore } from 'pinia'
import type { Product, CartItem } from '@/types/ProductInterface'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    items: [] as CartItem[],
  }),

  actions: {
    loadFromStorage() {
      const savedCart = localStorage.getItem('cartItems')
      if (savedCart) {
        this.items = JSON.parse(savedCart)
      }
    },

    saveToStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.items))
    },

    addItem(product: Product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.saveToStorage()
    },

    removeItem(id: number) {
      this.items = this.items.filter(item => item.id !== id)
      this.saveToStorage()
    },

    updateQuantity(id: number, quantity: number) {
      const item = this.items.find(item => item.id === id)
      if (item) {
        item.quantity = quantity
        this.saveToStorage()
      }
    },

    clearCart() {
      this.items = []
      this.saveToStorage()
    },
  },

  getters: {
    total: state => {
      return state.items.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    },

    itemCount: state => {
      return state.items.reduce((count, item) => count + item.quantity, 0)
    },
  },
})
