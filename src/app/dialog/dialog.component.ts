import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskserviceService } from '../taskservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

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

  name:any = this.taskservice.item!=null?this.taskservice.item.name:''
  desc:any = this.taskservice.item!=null?this.taskservice.item.desc:''
  date:Date = this.taskservice.item!=null?this.taskservice.item.date:''
  sstatus:any = this.taskservice.item!=null?this.taskservice.item.status:''
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  submitbtn:boolean

  save(){
    this.taskservice.saveData(this.form.value.name, this.form.value.desc, this.form.value.status, this.form.value.date)
  }


  status: any= [
    {value: 'todo'},
    {value: 'inprocess'},
    {value: 'validation'},
    {value: 'complete'},
  ];

  form:FormGroup


}
