// initialize and write the body of the functions
import type { Product, CartItem } from '@/types/ProductInterface'

export class MainRepository {
  private favourites: CartItem[] = []
  private cartItems: CartItem[] = []
  private products: Product[] = []

  constructor() {
    this.loadFromLocalStorage()
  }

  private loadFromLocalStorage() {
    const savedFavourites = localStorage.getItem('favourites')
    const savedCart = localStorage.getItem('cartItems')
    const savedProducts = localStorage.getItem('products')

    if (savedFavourites) this.favourites = JSON.parse(savedFavourites)
    if (savedCart) this.cartItems = JSON.parse(savedCart)
    if (savedProducts) this.products = JSON.parse(savedProducts)
  }

  private convertToCartItem(product: Product, quantity: number = 1): CartItem {
    return {
      ...product,
      quantity,
    }
  }

  getAllFavourites(): CartItem[] {
    return this.favourites
  }

  getAllCartItems(): CartItem[] {
    return this.cartItems
  }

  addToFavourites(product: Product) {
    if (!this.favourites.some(item => item.id === product.id)) {
      const favouriteItem = this.convertToCartItem(product)
      this.favourites.push(favouriteItem)
      this.saveFavouritesToLocalStorage()
    }
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      const cartItem = this.convertToCartItem(product)
      this.cartItems.push(cartItem)
    }
    this.saveCartItemsToLocalStorage()
  }

  deleteFavouriteItem(id: number) {
    this.favourites = this.favourites.filter(item => item.id !== id)
    this.saveFavouritesToLocalStorage()
  }

  deleteCartItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id)
    this.saveCartItemsToLocalStorage()
  }

  updateFavouritesQuantity(id: number, quantity: number) {
    const item = this.favourites.find(item => item.id === id)
    if (item) {
      item.quantity = quantity
      this.saveFavouritesToLocalStorage()
    }
  }

  updateCartQuantity(id: number, quantity: number) {
    const item = this.cartItems.find(item => item.id === id)
    if (item) {
      item.quantity = quantity
      this.saveCartItemsToLocalStorage()
    }
  }

  clearArray(arr: 'favourites' | 'cart' | 'products') {
    switch (arr) {
      case 'favourites':
        this.favourites = []
        this.saveFavouritesToLocalStorage()
        break
      case 'cart':
        this.cartItems = []
        this.saveCartItemsToLocalStorage()
        break
      case 'products':
        this.products = []
        this.saveProductsToLocalStorage()
        break
    }
  }

  saveFavouritesToLocalStorage() {
    localStorage.setItem('favourites', JSON.stringify(this.favourites))
  }

  saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
  }

  saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.products))
  }

  searchProductByName(name: string): Product[] {
    return this.products.filter(product =>
      product.title.toLowerCase().includes(name.toLowerCase()),
    )
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  }
}
