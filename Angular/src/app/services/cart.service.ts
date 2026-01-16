import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { crop } from '../models/crop.model';

export interface CartItem extends crop {
  quantityInCart: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  private saveCart(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItems.next(items);
  }

  addToCart(product: crop) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.cropDetailid === product.cropDetailid);

    if (existingItem) {
      existingItem.quantityInCart += 1;
      this.saveCart([...currentItems]);
    } else {
      const newItem: CartItem = { ...product, quantityInCart: 1 };
      this.saveCart([...currentItems, newItem]);
    }
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.value.filter(item => item.cropDetailid !== productId);
    this.saveCart(currentItems);
  }

  decreaseQuantity(productId: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(i => i.cropDetailid === productId);

    if (item) {
      if (item.quantityInCart > 1) {
        item.quantityInCart -= 1;
        this.saveCart([...currentItems]);
      } else {
        this.removeFromCart(productId);
      }
    }
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((acc, item) => acc + item.quantityInCart, 0);
  }

  getTotalAmount(): number {
    return this.cartItems.value.reduce((acc, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      return acc + (price * item.quantityInCart);
    }, 0);
  }

  clearCart() {
    this.saveCart([]);
  }
}
