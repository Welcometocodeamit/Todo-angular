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
      // if(this.list1){
      //   let d= JSON.parse(localStorage.getItem('data'))
      //   let k = JSON.parse(localStorage.getItem('key'))
      //   d.filter((d)=>{
      //     if(d.id==k){
      //       this.list1.push(`name: ${d.name}, desc: ${d.desc}`)
      //     }
      //   })

      // }else{
        // console.log('data from main ')
        this.gfh=data
        this.filterData()
      // }
      this.showEditButton=false
      this.deletebtn=false
    })

    this.filterData()
    
  }

 

  gfh


  filterData(){
    const storedDataString = localStorage.getItem('data');
  
    if (storedDataString) {
    const storedData = JSON.parse(storedDataString);
    this.list1=[]
    this.list2=[]
    this.list3=[]
    this.list4=[]
    storedData.map((data) => {
      if(data.status=='todo'){
        this.list1.push(data);
      }else if(data.status=='inprocess'){
        this.list2.push(data);
      }else if(data.status=='validation'){
        this.list3.push(data);
      }else if(data.status=='complete'){
        this.list4.push(data);
      }
      
      // console.log(data.name);
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
      // this.taskservice.subject.next(true)
      
      let containerId=event.container.element.nativeElement.id
      let data = event.container.data
      // console.log(event.container.data)
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
    // console.log(item)
  }

 


 

  openDialog1(): void {

    // this.taskservice.nameShow
    

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
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
      // console.log('The dialog was closed');
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







  