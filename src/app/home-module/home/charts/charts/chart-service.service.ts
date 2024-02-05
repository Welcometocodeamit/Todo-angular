import { Injectable } from '@angular/core';
import { BarData } from 'src/app/Models/BarData';
import { TaskserviceService } from 'src/app/services/taskservice.service';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor(private taskService:TaskserviceService) { }


  //filter Data for pie chart
  getData(){
    let localdata = this.taskService.bData
    let todo=0
    let inprocess=0
    let validation=0
    let complete=0
    localdata.map((data)=>{
      if(data.status=='todo' && data.delete==false){
        todo++
      }else if(data.status=='inprocess' && data.delete==false){
        inprocess++
      }else if(data.status=='validation' && data.delete==false){
        validation++
      }else if(data.status=='complete' && data.delete==false){
        complete++
      }
    })

    return [{name:'Todo', value: todo}, {name:'Inprocess', value: inprocess}, {name:'Validation', value: validation}, {name:'Complete', value: complete}]

  }


  //filter Data for Date bar chart
  getDataBar(){
    let localdata = this.taskService.bData
    // let uid = JSON.parse(localStorage.getItem('uid'))
    // localdata=localdata.filter((data)=>data.uid==uid)
    localdata.forEach((item) => {
      item.date = new Date(item.date);
    });
    localdata.sort((a,b)=>b.date.getTime() - a.date.getTime())
    const result:BarData[]=[]
    
    localdata.forEach((item)=>{
    
    let Exist=false
    let obj = null
    
    result.some((data) => {
      if (data.date.getTime() === item.date.getTime()) {
        Exist = true;
        obj = data;
        return true;
      }
      return false
    });

    if(Exist){
      obj.statusCount=obj.statusCount+1
    }else{
      const newEntry = {
        date: item.date,
        statusCount: 1 ,
      };
      result.push(newEntry);
    }
   })

   let resultLength=result.length
   let lastResult
   let lastResultDate

   if(resultLength<7){
    if(resultLength==0){

    }else{
     lastResult = result[resultLength-1]
     lastResultDate=result[resultLength-1].date
    

    for(let i=0; i<7-resultLength; i++){
      let entryDate = new Date(lastResultDate);
      entryDate.setDate(lastResultDate.getDate() - 1);
  
      let entry = {
        date: entryDate,
        statusCount:0
      };

      result.push(entry);
      lastResultDate = entryDate;
    }

   }
  }


   return result

    
  }
}
