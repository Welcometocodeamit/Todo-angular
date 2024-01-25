import { AfterViewInit, Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { TaskserviceService } from '../taskservice.service';
import { DeleteComponentComponent } from '../delete-component/delete-component.component';


@Component({
  selector: 'app-taskone',
  templateUrl: './taskone.component.html',
  styleUrls: ['./taskone.component.css'],
})
export class TaskoneComponent implements AfterViewInit{

  constructor(public dialog: MatDialog, private taskservice:TaskserviceService) {}
  ngAfterViewInit(): void {
    
  }

  
  data=[]

  
  list1 = [];
  

  list2 = [];

  list3=[]

  list4=[]

  ngOnInit(){
    this.taskservice.subject.asObservable().subscribe((data)=>{
 
        this.gfh=data
        this.filterData()
      this.showEditButton=false
      this.deletebtn=false
    })

    this.filterData()
    
  }

 

  gfh


  filterData(){
    const storedDataString = localStorage.getItem('data');
    let uid = JSON.parse(localStorage.getItem('uid'))
    if (storedDataString) {
    const storedData = JSON.parse(storedDataString);
    this.list1=[]
    this.list2=[]
    this.list3=[]
    this.list4=[]
    storedData.map((data) => {
      if(data.status=='todo' && data.isDelete==false && data.uid==uid){
        this.list1.push(data);
      }else if(data.status=='inprocess' && data.isDelete==false && data.uid==uid){
        this.list2.push(data);
      }else if(data.status=='validation' && data.isDelete==false && data.uid==uid){
        this.list3.push(data);
      }else if(data.status=='complete' && data.isDelete==false && data.uid==uid){
        this.list4.push(data);
      }
    });

  }}




  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let containerId=event.container.element.nativeElement.id
      let data = event.container.data
      this.taskservice.changeStatus(containerId, data)
    }
  }



  showEditButton:boolean=false

  handleOnClick(item){
    this.taskservice.subject2.next(true)
    this.taskservice.subject.next(true)
    this.showEditButton=true
    this.taskservice.item=item
    if(this.taskservice.item.status=='complete'){
      this.deletebtn=true
    }
  }

 


 

  openDialog1(): void {

    

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;

    });
  }

  animal: string;
  name: string;

  openDialog(): void {
    this.taskservice.subject.next(false)
    this.taskservice.item=null
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  deletebtn:boolean=false

  deleteTask(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteComponentComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}







  