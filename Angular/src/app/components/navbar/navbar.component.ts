import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  CurrentUser!: User | null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe({
      next: (user) => {
        this.CurrentUser = user;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.auth.changeUserState(null);
    this.router.navigate(['/Login']);
  }
}
