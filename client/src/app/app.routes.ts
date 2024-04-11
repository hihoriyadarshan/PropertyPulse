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
    {path: 'profile-update',loadComponent: ()=>import('./pages/profileupdate/profileupdate.component')},
    {path: 'property',loadComponent: ()=>import('./pages/property/property.component')},
    {path: 'create-property',loadComponent: ()=>import('./pages/create-property/create-property.component')},
    {path: 'created-property-details',loadComponent: ()=>import('./pages/created-property-details/created-property-details.component')},
    {path: 'more-property-details/:id',loadComponent: ()=>import('./pages/more-details-property/more-details-property.component')},
    {path: 'create-feedback',loadComponent: ()=>import('./pages/feedback/feedback.component')},

    
    
    {path: 'admin-dashboard',loadComponent: ()=> import('./pages/admin-dashboard/admin-dashboard.component')},
    {path: 'admin-users',loadComponent: ()=>import('./pages/users/users.component')},
    {path: 'admin-contacts',loadComponent: ()=>import('./pages/admin-contacts/admin-contacts.component')},
    {path: 'admin-property',loadComponent: ()=>import('./pages/admin-property/admin-property.component')},
    {path: 'create-category',loadComponent: ()=>import('./pages/create-category/create-category.component')},
    {path: 'create-sub-category',loadComponent: ()=>import('./pages/create-sub-category/create-sub-category.component')},
    {path: 'admin-feedback',loadComponent: ()=>import('./pages/admin-feedback/admin-feedback.component')},
    {path: 'admin-profile',loadComponent: ()=>import('./pages/admin-profile/admin-profile.component')},
    {path: 'admin-inquiry',loadComponent: ()=>import('./pages/admin-inquiry/admin-inquiry.component')},
    
];
