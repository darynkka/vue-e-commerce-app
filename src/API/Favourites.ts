import { defineStore } from 'pinia'
import type { Product, CartItem } from '@/types/ProductInterface'

export const useFavouritesStore = defineStore('favouritesStore', {
  state: () => ({
    items: [] as CartItem[],
  }),

  actions: {
    loadFromStorage() {
      const savedFavourites = localStorage.getItem('favourites')
      if (savedFavourites) {
        this.items = JSON.parse(savedFavourites)
      }
    },

    saveToStorage() {
      localStorage.setItem('favourites', JSON.stringify(this.items))
    },

    addItem(product: Product) {
      if (!this.items.some(item => item.id === product.id)) {
        this.items.push({ ...product, quantity: 1 })
        this.saveToStorage()
      }
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

    clearFavourites() {
      this.items = []
      this.saveToStorage()
    },
  },

  getters: {
    itemCount: state => state.items.length,
  },
})
