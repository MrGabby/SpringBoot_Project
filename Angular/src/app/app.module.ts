import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/Users/users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './components/Users/add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditUserComponent } from './components/Users/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/Users/delete-user/delete-user.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ErrorComponent } from './components/error/error.component';
import { FarmerComponent } from './components/farmer/farmer.component';
import { DealerComponent } from './components/dealer/dealer.component';

import { AdminComponent } from './components/admin/admin.component';
import { PostcropComponent } from './components/postcrop/postcrop.component';
import { GetcropComponent } from './components/getcrop/getcrop.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    AddUserComponent,
    RegisterComponent,
    LoginComponent,
    WelcomepageComponent,
    WelcomepageComponent,
    FooterComponent,
    EditUserComponent,
    DeleteUserComponent,
    InvoiceComponent,
    NavbarComponent,
    ErrorComponent,
    FarmerComponent,
    DealerComponent,
    //PostcComponent,
    AdminComponent,
    PostcropComponent,
    GetcropComponent,
   // PostcComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
