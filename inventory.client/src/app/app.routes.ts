import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {UsersComponent} from './users/user-list/users.component'
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import {ProductListComponent} from './products/product-list/product-list.component'

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'users',component:UsersComponent},
    {path:'users/create',component:UserCreateComponent},
    {path:'users/edit/:id',component:UserEditComponent},
    {path:'products',component:ProductListComponent},
];
