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
import { PieComponent } from './charts/pie/pie.component';
import { LineComponent } from './charts/line/line.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { BarDateComponent } from './charts/bar/bar-date/bar-date.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskoneComponent,
    DialogComponent,
    DeleteComponentComponent,
    ChartsComponent,
    BarComponent,
    PieComponent,
    LineComponent,
    BarDateComponent,
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
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
