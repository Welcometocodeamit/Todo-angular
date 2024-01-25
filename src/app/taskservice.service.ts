import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {


  constructor() {


    const data = [];

    if(localStorage.getItem('data') == null){
      localStorage.setItem('data', JSON.stringify(data))
    }
    
    
  }

  item:any

  subject = new BehaviorSubject<boolean>(false)
  subject2 = new BehaviorSubject<boolean>(false)

  getkey(){
    let ld = JSON.parse(localStorage.getItem('data'))
    let key
   if(ld == null || ld.length==0){
      return 0
    }
    if(ld == undefined){
      return 0
    } 
    let length = ld.length-1
    key = ld[length].id
    return key
  }

  
// Check data exist or not
  dataExist(name:string, data){
    let exist = false

    data.map((data)=>{
      data.name==name
      exist = true
    })

    return exist

  }

// Getting object by name
  getDataByName(name, local){

    let d 

    local.map((data)=>{
    
      if(data.name == name){
        d=data
      }else{
        d=null
      }
    })
    return d
  }

  uid:number | null | undefined=JSON.parse(localStorage.getItem('uid'))
   
// Save or update data in local storage
   saveData(name:string, desc:string, status:string, date:any, isDelete:boolean){
    let local = JSON.parse(localStorage.getItem('data'))
    let dataExist=false
    this.uid=JSON.parse(localStorage.getItem('uid'))
    if( this.item != null ){
       dataExist = this.dataExist(this.item.name, local)
    }
   

    if(!dataExist){
      let currentkey = this.getkey()+1
      if(local==null){
        let data=[]
        localStorage.setItem('data', JSON.stringify(data))
        local=JSON.parse(localStorage.getItem('data'))
      }
      local.push({id:currentkey, name: name, desc: desc, date: date, status: status, isDelete:isDelete, uid:this.uid})
      localStorage.setItem('data', JSON.stringify(local))
      this.subject.next(false)
    }else{
      let i = this.getIndex(this.item.id)
      local[i].name=name
      local[i].date=date
      local[i].desc=desc
      localStorage.setItem('data', JSON.stringify(local))
      this.subject.next(true)
    }
    
   }



// Extract status from container
  determineStatus(containerId){
    let status
    if(containerId=='1'){
      status='todo'
    }else if(containerId=='2'){
      status='inprocess'
    }else if(containerId=='3'){
      status='validation'
    }else if(containerId == '4'){
      status='complete'
    }
    return status
  }



// Change status 
  changeStatus(containerId, data){
    let status =this.determineStatus(containerId)
    let localdata = JSON.parse(localStorage.getItem('data'))
    data.map((d)=>{
      let fdata = d.name
      let ddata=d.desc

      localdata.map((data)=>{
        let ldata = data.name
        let dldata=data.desc
        if(fdata.match(ldata) && ddata.match(dldata) ){
          
          if(data.status!=status){
            data.status=status
            localStorage.setItem('data', JSON.stringify(localdata))
          }
        }
      })
     
    })
    this.subject.next(true)
   }

// Delete task
  deleteTask(){
    let localdata = JSON.parse(localStorage.getItem('data'))
    let id = this.item.id
    let index=this.getIndex(id)

    localdata[index].isDelete=true
    localStorage.setItem('data', JSON.stringify(localdata))
    this.subject.next(true)
  }

  // Delete task from history log
  deleteTaskPermant(){
    let localdata = JSON.parse(localStorage.getItem('data'))
    let newData = localdata.filter((data) => !data.isDelete);
    localStorage.setItem('data', JSON.stringify(newData));
    this.subject.next(true)

  }


  // Get index of object by id
  getIndex(id){
    let count=-1
    let localdata = JSON.parse(localStorage.getItem('data'))
    for(let i=0; i<localdata.length; i++){
      count++
      if(localdata[i].id==id){
        break;
      }
    }
    return count
  }

}
