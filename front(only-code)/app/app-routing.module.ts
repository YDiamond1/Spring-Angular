import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {GuardGuard} from './services/Guard/guard.guard';


const routes: Routes = [
  {path : 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path : 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  {path : '', redirectTo: '/auth/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = RouterModule.forRoot(routes);
