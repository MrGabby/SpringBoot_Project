import { Component, NgModule } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { register } from 'src/app/models/register.model';
import { RegisterService } from 'src/app/services/register.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// @NgModule({ imports:[
//   FormsModule]
// })

// @NgModule({
//   declarations: [
//     Component
//   ],
//   imports: [
//     BrowserModule, FormsModule // <<<< And here
//   ],
//   providers: [],
//   bootstrap: [Component]
// })

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  addUser: register={
    name:'',
    contact: '',
    email_id:'',
    address: '',
    roles: '',
    password:''


  }

  constructor(private adduserservice :RegisterService) { }

  ngOnInit(): void {

  }

  RegisterUser(){
this.adduserservice.addUser(this.addUser).subscribe({next: (register) => {
  console.log(register);
  alert("Successfully registered")
}});
  }

}
