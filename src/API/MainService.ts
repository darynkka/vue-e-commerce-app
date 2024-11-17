// call all functions here
// export this file in components
// MainService.ts
import axios from 'axios'
import { MainRepository } from './MainRepository'
import type { Product, CartItem } from '@/types/ProductInterface'

const BASE_URL = 'https://api.escuelajs.co/api/v1/products'

export class MainService {
  private repository: MainRepository

  constructor() {
    this.repository = new MainRepository()
  }

  // API методи
  async getAllProducts(offset = 0, limit = 20): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(
        `${BASE_URL}?offset=${offset}&limit=${limit}`,
      )

      if (!response.data) {
        throw new Error('No data received from the server')
      }

      // Зберігаємо отримані продукти в localStorage
      this.repository.saveProductsToLocalStorage()

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(`Server error: ${error.response.status}`)
        } else if (error.request) {
          console.error('No response received from server')
        } else {
          console.error('Error setting up request')
        }
      } else {
        console.error('Error fetching products:', error)
      }
      return []
    }
  }

  // Методи для роботи з улюбленими
  getFavourites(): CartItem[] {
    return this.repository.getAllFavourites()
  }

  addItemToFavourites(product: Product) {
    this.repository.addToFavourites(product)
  }

  removeFromFavourites(id: number) {
    this.repository.deleteFavouriteItem(id)
  }

  updateFavouriteQuantity(id: number, quantity: number) {
    this.repository.updateFavouritesQuantity(id, quantity)
  }

  // Методи для роботи з корзиною
  getCartItems(): CartItem[] {
    return this.repository.getAllCartItems()
  }

  addItemToCart(product: Product) {
    this.repository.addToCart(product)
  }

  removeFromCart(id: number) {
    this.repository.deleteCartItem(id)
  }

  updateCartItemQuantity(id: number, quantity: number) {
    this.repository.updateCartQuantity(id, quantity)
  }

  getCartTotal(): number {
    return this.repository.getCartTotal()
  }

  // Пошук продуктів
  searchProducts(name: string): Product[] {
    return this.repository.searchProductByName(name)
  }
}

export const getAllProducts = async (
  offset = 0,
  limit = 20,
): Promise<Product[]> => {
  const service = new MainService()
  return service.getAllProducts(offset, limit)
}
