import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskserviceService } from 'src/app/services/taskservice.service';

@Component({
  selector: 'app-delete-component',
  templateUrl: './delete-component.component.html',
  styleUrls: ['./delete-component.component.css']
})
export class DeleteComponentComponent {

  constructor(public dialogRef: MatDialogRef<DeleteComponentComponent>, private taskservice:TaskserviceService) {}


  deleteTask(){
    this.taskservice.deleteTask()
  }

  noClick(){
    this.taskservice.item=null
  }

  task:string=this.taskservice.item?this.taskservice.item.taskName:''
}
