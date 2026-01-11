import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/Users/users-list/users-list.component';
import { AddUserComponent } from './components/Users/add-user/add-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { EditUserComponent } from './components/Users/edit-user/edit-user.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ErrorComponent } from './components/error/error.component';
import { FarmerComponent } from './components/farmer/farmer.component';
import { DealerComponent } from './components/dealer/dealer.component';
import { PostcropComponent } from './components/postcrop/postcrop.component';
import { GetcropComponent } from './components/getcrop/getcrop.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomepageComponent
  },
  {
    path: 'Users',
    component: UsersListComponent
  },
  {
    path: 'Users/edit/:id',
    component: EditUserComponent
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'Register',
    component: RegisterComponent
  },
  {
    path: 'Login/Register',
    component: RegisterComponent
  },
  {
    path: 'Invoice',
    component: InvoiceComponent
  },
  {
    path: 'Error',
    component: ErrorComponent
  },
  {
   path:'Farmer',
   component: FarmerComponent
  },
  {
    path:'Dealer',
    component: DealerComponent
  },
  {
    path:'Dealer',
    component: DealerComponent
  }
  ,{
    path:'Farmer/PostCrop',
    component: PostcropComponent
  },
  {
    path: 'Farmer/Invoice',
    component: InvoiceComponent
  },
  {
    path:'Farmer/GetCrop',
    component: GetcropComponent
  },
  {
    path: 'Dealer/GetCrop',
    component: GetcropComponent
  },
  {
    path: 'Farmer/edit/:id',
    component: EditUserComponent
  },
  {
    path: 'Admin',
    component: AdminComponent
  },
  {
    path: 'Admin/Users',
    component: UsersListComponent
  },
  {
    path: 'Admin/Invoice',
    component: InvoiceComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
