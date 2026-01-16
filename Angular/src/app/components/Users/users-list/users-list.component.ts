import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UsersService } from '../../../services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  Users: User[] = [];

  CurrentUser!: User
  constructor(private usersService: UsersService, private auth: AuthService) {

    this.auth.getCurrentUser().subscribe({
      next: (user) => {
        this.CurrentUser = user
        console.log(this.CurrentUser)
      }
    });

  }
  ngOnInit() {

    this.usersService.getallusers().subscribe({
      next: (users) => {
        this.Users = users;

        this.usersService.GetUserByToken().subscribe({
          next: (user) => {
            /*   this.CurrentUser = user
            console.log(this.CurrentUser.roles); */
            this.auth.changeUserState(user);

          }
        });

      },
      error: (response) => {
        console.log(response);
      }

    })
  }
  getRoleClass(role: string): string {
    if (!role) return 'bg-secondary bg-opacity-10 text-secondary';

    if (role.toLowerCase().includes('admin')) {
      return 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-10';
    } else if (role.toLowerCase().includes('farmer')) {
      return 'bg-success bg-opacity-10 text-success border border-success border-opacity-10';
    } else if (role.toLowerCase().includes('dealer')) {
      return 'bg-info bg-opacity-10 text-info border border-info border-opacity-10';
    }
    return 'bg-secondary bg-opacity-10 text-secondary';
  }
}
