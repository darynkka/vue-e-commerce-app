import { defineStore } from 'pinia'
import { getAllProducts } from './MainService'
import type { Product } from '@/types/ProductInterface'

const processProductData = (products: Product[]): Product[] => {
  //допоміжна функція, що містить логіку
  return products.map(product => {
    //обробки помилок для нормального відображення картинок
    if (typeof product.images === 'string') {
      const parsed = JSON.parse(product.images)
      product.images = Array.isArray(parsed) ? parsed : [parsed]
    }
    product.images = product.images.map(url =>
      url.replace(/[\[\]"]/g, '').trim(),
    )
    return product
  })
}

//буде зберігати стан продуктів
export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as Product[], // масив продуктів
  }),
  actions: {
    // повертає мінімум 20 продуктів
    async fetchProducts(limit = 20) {
      try {
        const fetchedProducts = await getAllProducts(0, limit)
        this.products = processProductData(fetchedProducts)
        console.log('store products:', this.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },

    // фільтрує за іменем
    filterProductsByName(name: string) {
      try {
        this.products = this.products.filter(product =>
          product.title.toLowerCase().includes(name.toLowerCase()),
        )
      } catch (error) {
        console.error('Error filtering products by name:', error)
      }
    },

    // фільтрує за категорією
    filterProductsByCategory(category: string) {
      try {
        this.products = this.products.filter(product =>
          product.category.name.toLowerCase().includes(category.toLowerCase()),
        )
      } catch (error) {
        console.error('Error filtering products by category:', error)
      }
    },

    // фільтрує за ціною
    filterProductByPrice(from: number, to: number) {
      try {
        this.products = this.products.filter(
          product => product.price >= from && product.price <= to,
        )
      } catch (error) {
        console.error('Error filtering products by price:', error)
      }
    },
  },

  getters: {
    getProducts: state => state.products,
  },
})
