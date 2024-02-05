import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
// import { DialogComponent } from './home/dialog/dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { DeleteComponentComponent } from './home/delete-component/delete-component.component';;
// import { ChartsComponent } from './charts/charts.component';
// import { BarComponent } from './charts/bar/bar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
// import { BarDateComponent } from './charts/bar/bar-date/bar-date.component';
import {MatIconModule} from '@angular/material/icon';
import { Route, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
// import { PieTaskComponent } from './charts/bar/pie-task/pie-task.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorInterceptor } from './Interceptor/http-interceptor.interceptor';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeModuleModule } from './home-module/home-module.module';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
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
    HttpClientModule,
    AppRoutingModule
   
  ],
  exports:[
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
