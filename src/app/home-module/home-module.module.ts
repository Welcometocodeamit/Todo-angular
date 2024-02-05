import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskoneComponent } from './home/taskone.component';
import { DialogComponent } from './home/dialog/dialog.component';
import { DeleteComponentComponent } from './home/delete-component/delete-component.component';
import { ChartsComponent } from './home/charts/charts/charts.component';
import { BarComponent } from './home/charts/charts/bar/bar.component';
import { BarDateComponent } from './home/charts/charts/bar/bar-date/bar-date.component';
import { PieTaskComponent } from './home/charts/charts/bar/pie-task/pie-task.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';



@NgModule({
  declarations: [
    TaskoneComponent,
    DialogComponent,
    DeleteComponentComponent,
    ChartsComponent,
    BarComponent,
    BarDateComponent,
    PieTaskComponent
  ],
  imports: [
    CommonModule,
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
    RouterModule.forChild([
      { path: '', component: TaskoneComponent, canActivate: [AuthGuardService] }
    ]),
  ],
  providers:[]
})
export class HomeModuleModule {
  constructor(){
    console.log("home")
  }
 }
