import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/Users/users-list/users-list.component';
import { AddUserComponent } from './components/Users/add-user/add-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { EditUserComponent } from './components/Users/edit-user/edit-user.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ErrorComponent } from './components/error/error.component';
import { FarmerComponent } from './components/farmer/farmer.component';
import { DealerComponent } from './components/dealer/dealer.component';
import { PostcropComponent } from './components/postcrop/postcrop.component';
import { GetcropComponent } from './components/getcrop/getcrop.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManageCropsComponent } from './components/manage-crops/manage-crops.component';
import { EditcropComponent } from './components/edit-crop/edit-crop.component';
import { AuthGuard } from './guards/auth.guard';


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
    path: 'Cart',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Invoice',
    component: InvoiceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Error',
    component: ErrorComponent
  },
  {
    path: 'Farmer',
    component: FarmerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Dealer',
    component: DealerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Dealer',
    component: DealerComponent
  }
  , {
    path: 'Farmer/PostCrop',
    component: PostcropComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Farmer/Invoice',
    component: InvoiceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Farmer/GetCrop',
    component: GetcropComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Dealer/GetCrop',
    component: GetcropComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Farmer/edit/:id',
    component: EditUserComponent
  },
  {
    path: 'Admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Admin/Users',
    component: UsersListComponent
  },
  {
    path: 'Admin/Invoice',
    component: InvoiceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Farmer/ManageCrops',
    component: ManageCropsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Farmer/EditCrop/:id',
    component: EditcropComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Admin/ManageCrops',
    component: ManageCropsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Admin/EditCrop/:id',
    component: EditcropComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
