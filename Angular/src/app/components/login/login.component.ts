import { Component, NgModule } from '@angular/core';
import { User } from '../../models/User.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from '../../services/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

// @NgModule({ imports:[
//   FormsModule]
// })

export class LoginComponent {


  Username: string = "";
  password: string = "";

  CurrentUser!: User
  returnUrl: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.Username.trim() == "" || this.password.trim() == "") {
      alert("Please Enter All The Details!");
      this.password = "";
    }
    else {
      console.log(this.Username + " " + this.password);
      this.auth.login({ emailId: this.Username.trim(), password: this.password.trim() }).subscribe(
        {
          next: (res) => {
            // console.log(res.token);
            //  alert(res.token);
            this.auth.setToken(res.token);
            localStorage.setItem("token", res.token);
            this.auth.changeUserState(res.user);
            // console.log(res.user);
            if (this.returnUrl && this.returnUrl !== '/') {
              this.router.navigateByUrl(this.returnUrl);
            } else if (res.user && res.user.roles) {
              const role = res.user.roles;
              if (role.includes("Admin") || role == "Admin") {
                this.router.navigate(['Admin']);
              }
              else if (role.includes("Farmer") || role == "Farmer") {
                this.router.navigate(['Farmer']);
              }
              else if (role.includes("Dealer") || role == "Dealer") {
                this.router.navigate(['Dealer']);
              }
              else {
                this.router.navigate(['Error']);
              }
            } else {
              this.router.navigate(['Error']);
            }

          },
          error: (error) => {
            console.error("Login error:", error);
            const errorMessage = error.error?.message || error.message || "Login failed. Please check your credentials.";
            alert(errorMessage);
            this.password = "";
          }
        });
    }
  }

}
