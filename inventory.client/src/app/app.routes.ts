import { Routes } from '@angular/router';
import {HomeComponent} from './shared/components/home/home.component';
import { UsersComponent } from './features/users/pages/user-list/users.component';
import { UserCreateComponent } from './features/users/pages/user-create/user-create.component';
import { UserEditComponent } from './features/users/pages/user-edit/user-edit.component';
import {ProductListComponent} from './features/products/pages/product-list/product-list.component'

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'users',component:UsersComponent},
    {path:'users/create',component:UserCreateComponent},
    {path:'users/edit/:id',component:UserEditComponent},
    {path:'users/seedtestusers',component:UsersComponent},
    {path:'products',component:ProductListComponent},
];
