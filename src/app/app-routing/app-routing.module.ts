import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login-module/login/login.component';
import { AuthGuardService } from '../services/auth-guard.service';

export const routes:Routes=[
  {path:'', component:LoginComponent},
  {path:'Login', loadChildren: () => import('src/app/login-module/login-module.module').then((m) => m.LoginModuleModule),},
  {
    path: 'Home',
    loadChildren: () => import('src/app/home-module/home-module.module').then((m) => m.HomeModuleModule),
    canActivate: [AuthGuardService],
  },
  {path:'Register', loadChildren: () => import('src/app/register-module/register-module.module').then((m) => m.RegisterModuleModule),},
  {path:'**', component:LoginComponent}
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule {
 }
