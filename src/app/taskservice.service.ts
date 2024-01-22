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
    console.log(key)
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
   
// Save or update data in local storage
   saveData(name:string, desc:string, status:string, date:any, isDelete:boolean){
    let local = JSON.parse(localStorage.getItem('data'))
    let dataExist=false
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
      local.push({id:currentkey, name: name, desc: desc, date: date, status: status, isDelete:isDelete})
      localStorage.setItem('data', JSON.stringify(local))
      this.subject.next(false)
    }else{
      console.log('data exist')
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
    if(containerId=='cdk-drop-list-0'){
      status='todo'
    }else if(containerId=='cdk-drop-list-1'){
      status='inprocess'
    }else if(containerId=='cdk-drop-list-2'){
      status='validation'
    }else if(containerId == 'cdk-drop-list-3'){
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
    // console.log(index)
    
    // index>=0?localdata.splice(index, 1):''
    // console.log(localdata)
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
