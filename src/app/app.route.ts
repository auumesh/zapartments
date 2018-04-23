import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full'},
  {
    path: 'pages',
    loadChildren: './pages/pages.module#PagesModule',
   
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes,{ useHash: true });
