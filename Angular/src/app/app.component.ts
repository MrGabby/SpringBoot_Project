import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Crop_deal1';

  constructor(private uservice: UsersService, private auth: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.uservice.GetUserByToken().subscribe({
        next: (user) => {
          this.auth.changeUserState(user);
        },
        error: (err) => {
          console.warn('Session restoration failed:', err);
          // Optionally clear token if invalid
          // localStorage.removeItem('token');
        }
      });
    }
  }
}
