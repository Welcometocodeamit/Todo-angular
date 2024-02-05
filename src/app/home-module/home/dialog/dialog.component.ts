import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskserviceService } from 'src/app/services/taskservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { TaskModel } from 'src/app/Models/Task';
import { Status } from 'src/app/Models/Status';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskservice:TaskserviceService,
    private formBuilder:FormBuilder
  ) {}
  form:FormGroup

  ngOnInit() {
    this.taskservice.subject.asObservable().subscribe((data)=>{
      this.disableh=data
    })
   

    this.form=this.formBuilder.group({
      name:['', Validators.required],
      desc:['', Validators.required],
      date:['', Validators.required],
      status:[{ value: 'initialValue', disabled: this.disableh }, Validators.required]
    })
  }


  disableh:boolean;

  name:string = this.taskservice.item!=null?this.taskservice.item.taskName:''
  desc:string = this.taskservice.item!=null?this.taskservice.item.taskDesc:''
  date:Date = new Date(this.taskservice.item!=null?this.taskservice.item.date:'') 
  sstatus:string = this.taskservice.item!=null?this.taskservice.item.status:''
  isDelete:boolean=false
  
  onNoClick(): void {
    this.taskservice.item=null
    this.dialogRef.close();
  }

  submitbtn:boolean

  Task:TaskModel={taskId:null, taskName:"", 
                  taskDesc:"", 
                  status:"", 
                  date:null, 
                  delete:false}

  save(){
    this.Task.taskId=0
    this.Task.taskName=this.form.value.name
    this.Task.taskDesc=this.form.value.desc
    this.Task.status=this.form.value.status
    this.Task.date=this.form.value.date
    this.taskservice.saveData(this.Task)
  }


  status: Status[]= [
    {value: 'todo'},
    {value: 'inprocess'},
    {value: 'validation'},
    {value: 'complete'},
  ];

 


}
