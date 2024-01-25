import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskoneComponent } from './taskone/taskone.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from './dialog/dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteComponentComponent } from './delete-component/delete-component.component';
import { ChartsComponent } from './charts/charts.component';
import { BarComponent } from './charts/bar/bar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { BarDateComponent } from './charts/bar/bar-date/bar-date.component';
import { LoginComponent } from './login/login.component';
import {MatIconModule} from '@angular/material/icon';
import { Route, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { PieTaskComponent } from './charts/bar/pie-task/pie-task.component';

export const routes:Routes=[
  {path:'', component:LoginComponent},
  {path:'Login', component:LoginComponent},
  {path:'Home', component:TaskoneComponent, canActivate:[AuthGuardService]},
  {path:'Register', component:RegisterComponent},
  {path:'**', component:LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TaskoneComponent,
    DialogComponent,
    DeleteComponentComponent,
    ChartsComponent,
    BarComponent,
    BarDateComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    PieTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
