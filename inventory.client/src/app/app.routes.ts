import { Routes } from '@angular/router';
import {HomeComponent} from './shared/components/home/home.component';
import { EmployeesComponent } from './features/employees/pages/employee-list/employees.component';
import { EmployeeCreateComponent } from './features/employees/pages/employee-create/employee-create.component';
import { EmployeeEditComponent } from './features/employees/pages/employee-edit/employee-edit.component';
import { CategoriesComponent } from './features/categories/pages/categories/categories.component';
import { CategoryCreateComponent } from './features/categories/pages/category-create/category-create.component';
import { CategoryEditComponent } from './features/categories/pages/category-edit/category-edit.component';
import { ProductListComponent } from './features/products/pages/product-list/product-list.component';
import { ProductCreateComponent } from './features/products/pages/product-create/product-create.component';
import { ProductEditComponent } from './features/products/pages/product-edit/product-edit.component';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';
import { ProductDeleteComponent } from './features/products/pages/product-delete/product-delete.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { LogoutComponent } from './features/auth/pages/logout/logout.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'employees',component:EmployeesComponent},
    {path:'employees/create',component:EmployeeCreateComponent},
    {path:'employees/edit/:id',component:EmployeeEditComponent},
    {path:'employees/seedtestusers',component:EmployeesComponent},
    {path:'products',component:ProductListComponent},
    {path:'categories',component:CategoriesComponent},
    {path:'categories/create',component:CategoryCreateComponent},
    {path:'categories/edit/:id',component:CategoryEditComponent},
    {path:'products',component:ProductListComponent},
    {path:'products/create',component:ProductCreateComponent},
    {path:'products/edit/:id',component:ProductEditComponent},
    {path:'products/details/:id',component:ProductDetailsComponent},
    {path:'products/delete/:id',component:ProductDeleteComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'logout',component:LogoutComponent},
];


