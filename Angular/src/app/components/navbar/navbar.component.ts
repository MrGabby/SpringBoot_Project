import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import { AuthService } from '../../services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  CurrentUser!: User | null;
  cartCount: number = 0;

  constructor(private auth: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe({
      next: (user) => {
        this.CurrentUser = user;
      }
    });

    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.reduce((acc, item) => acc + item.quantityInCart, 0);
    });
  }

  logout() {
    localStorage.clear();
    this.auth.changeUserState(null);
    this.router.navigate(['/Login']);
  }
}
