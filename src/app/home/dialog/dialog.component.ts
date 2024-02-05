import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskserviceService } from '../../services/taskservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { TaskModel } from '../../Models/Task';

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

  name:any = this.taskservice.item!=null?this.taskservice.item.taskName:''
  desc:any = this.taskservice.item!=null?this.taskservice.item.taskDesc:''
  date:Date = new Date(this.taskservice.item!=null?this.taskservice.item.date:'') 
  sstatus:any = this.taskservice.item!=null?this.taskservice.item.status:''
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
                  isDelete:false}

  save(){
    this.Task.taskName=this.form.value.name
    this.Task.taskDesc=this.form.value.desc
    this.Task.status=this.form.value.status
    this.Task.date=this.form.value.date
    this.taskservice.saveData(this.Task)
  }


  status: any= [
    {value: 'todo'},
    {value: 'inprocess'},
    {value: 'validation'},
    {value: 'complete'},
  ];

 


}
