import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { invoice } from 'src/app/models/invoice.model';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  paymentMode: string = 'UPI'; // Default
  currentUser: any;
  baseUrl: string = environment.baseUrl;

  constructor(
    private cartService: CartService,
    private router: Router,
    private invoiceService: InvoiceService,
    private authService: AuthService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
    this.totalAmount = this.cartService.getTotalAmount();
    this.currentUser = this.authService.getUser();
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
    this.totalAmount = this.cartService.getTotalAmount();
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
    this.totalAmount = this.cartService.getTotalAmount();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.totalAmount = this.cartService.getTotalAmount();
  }

  getImageUrl(imageUrl: string | undefined): string {
    if (!imageUrl) return 'assets/img/crop-placeholder.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;

    // If it's a local path like 'uploads/filename.jpg', convert to endpoint
    const filename = imageUrl.split('/').pop();
    return `${this.baseUrl}/images/${filename}`;
  }

  getTax(): number {
    return this.totalAmount * 0.05; // 5% tax
  }

  getFinalTotal(): number {
    return this.totalAmount + this.getTax();
  }

  checkout() {
    if (!this.currentUser) {
      this.notification.error('Please login to complete your purchase.', 'Authentication Required');
      this.router.navigate(['/Login']);
      return;
    }

    if (this.cartItems.length === 0) {
      this.notification.error('Your cart is empty.', 'Empty Cart');
      return;
    }

    const newInvoice: invoice = {
      invoiceid: 0,
      userid: this.currentUser.userid,
      dealerid: this.currentUser.userid,
      total_amount: this.getFinalTotal(),
      total_items: this.cartItems.length,
      payment_mode: this.paymentMode,
      status: 'Paid',
      date_created: new Date().toISOString(),
      items: this.cartItems.map(item => ({
        id: 0,
        invoiceId: 0,
        crop_detailid: item.cropDetailid,
        quantity: item.quantityInCart,
        price: item.price,
        farmerid: 0, // Resolved by backend
        crop_Detail: {
          crop_detailid: item.cropDetailid,
          crop_name: item.crop_name,
          cropDetail_description: item.cropDetail_description,
          crop_type: item.crop_type,
          quantity: item.quantity,
          price: item.price,
          location: item.location
        }
      }))
    };

    this.invoiceService.createInvoice(newInvoice).subscribe({
      next: (result) => {
        this.notification.success('Your order has been placed successfully!', 'Order Confirmed');
        this.cartService.clearCart();
        this.router.navigate(['/Invoice']);
      },
      error: (err) => {
        console.error('Checkout failed', err);
        this.notification.error('Failed to process your order. Please try again.', 'Checkout Error');
      }
    });
  }
}


