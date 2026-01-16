import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  paymentMode: string = 'UPI'; // Default

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalAmount = this.cartService.getTotalAmount();
    });
  }

  getTax(): number {
    return this.totalAmount * 0.05; // 5% tax
  }

  getFinalTotal(): number {
    return this.totalAmount + this.getTax();
  }

  checkout() {
    alert('Purchase Successful!');
    this.cartService.clearCart();
    this.router.navigate(['/Farmer/GetCrop']); // Redirect back to shopping
  }
}
