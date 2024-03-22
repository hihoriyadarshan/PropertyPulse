import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' }, 
    // { path: '/admin-dashboard', redirectTo: '/admin-dashboard', pathMatch: 'full' },
    {path: 'login',loadComponent: ()=> import('./pages/login/login.component')},
    {path: 'register',loadComponent: ()=> import('./pages/register/register.component')},
    {path: 'forget-password',loadComponent: ()=> import('./pages/forget-password/forget-password.component')},
    {path: 'home',loadComponent: ()=> import('./pages/home/home.component')},
    {path: 'profile',loadComponent: ()=> import('./pages/profile/profile.component')},
    {path: 'reset/:token',loadComponent: ()=> import('./pages/reset/reset.component')},
    {path: 'about',loadComponent: ()=> import('./pages/about/about.component')},
    {path: 'contact',loadComponent: ()=> import('./pages/contact/contact.component')},
    {path: 'admin-dashboard',loadComponent: ()=> import('./pages/admin-dashboard/admin-dashboard.component')},
    {path: 'admin-users',loadComponent: ()=>import('./pages/users/users.component')},
    {path: 'admin-contacts',loadComponent: ()=>import('./pages/admin-contacts/admin-contacts.component')},
    {path: 'profile-update',loadComponent: ()=>import('./pages/profileupdate/profileupdate.component')},
    {path: 'property',loadComponent: ()=>import('./pages/property/property.component')},
    {path: 'create-property',loadComponent: ()=>import('./pages/create-property/create-property.component')},
   
];
