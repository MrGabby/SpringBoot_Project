import { Component } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {



  CurrentUser!:User
constructor(private usersService: UsersService, private auth: AuthService) {

  this.auth.getCurrentUser().subscribe({next:(user)=>{
    this.CurrentUser = user
    console.log(this.CurrentUser)
  }
 });

}


}
