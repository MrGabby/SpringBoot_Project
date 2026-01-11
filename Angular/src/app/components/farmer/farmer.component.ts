import { Component } from '@angular/core';
import { Farmer } from 'src/app/models/Farmer.model';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.scss']
})
export class FarmerComponent {

  Farmers: Farmer={
    userid:1009
};


CurrentUser!:User
constructor(private usersService: UsersService, private auth: AuthService) {

  this.auth.getCurrentUser().subscribe({next:(user)=>{
    this.CurrentUser = user
    console.log(this.CurrentUser)
  }
 });

}
}
