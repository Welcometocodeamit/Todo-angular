import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { TaskoneComponent } from '../home/taskone.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { RegisterComponent } from '../register/register.component';

export const routes:Routes=[
  {path:'', component:LoginComponent},
  {path:'Login', component:LoginComponent},
  {
    path: 'Home',
    loadChildren: () => import('src/app/home-module/home-module.module').then((m) => m.HomeModuleModule),
    canActivate: [AuthGuardService],
  },
  {path:'Register', component:RegisterComponent},
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
