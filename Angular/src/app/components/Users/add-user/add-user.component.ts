import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  newUser: User = {
    userid: 0,
    name: '',
    password: '',
    contact: '',
    address: '',
    email_id: '',
    roles: 'Dealer', // Default
    is_subscribe: false,
    is_active: true
  };

  pageTitle: string = 'Add New User';

  constructor(
    private usersService: UsersService,
    private router: Router,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    if (this.router.url.includes('/Users/add')) {
      this.pageTitle = 'Special Account Creation';
    }
  }

  addUser() {
    // Basic validation
    if (!this.newUser.name || !this.newUser.email_id || !this.newUser.password) {
      this.notification.error('Please fill in all required fields.');
      return;
    }

    this.usersService.AddUser(this.newUser).subscribe({
      next: (user) => {
        this.notification.success('User created successfully!', 'Created');
        this.router.navigate(['/Users']);
      },
      error: (err) => {
        console.error('Failed to add user', err);
        this.notification.error('Failed to create user. Please check your details.');
      }
    });
  }
}
