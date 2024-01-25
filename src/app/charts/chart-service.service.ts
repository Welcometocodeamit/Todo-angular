import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor() { }


  //filter Data for pie chart
  getData(){
    let localdata = JSON.parse(localStorage.getItem('data'))
    let uid = JSON.parse(localStorage.getItem('uid'))
    let todo=0
    let inprocess=0
    let validation=0
    let complete=0
    localdata.map((data)=>{
      if(data.status=='todo' && data.isDelete==false && data.uid==uid){
        todo++
      }else if(data.status=='inprocess' && data.isDelete==false && data.uid==uid){
        inprocess++
      }else if(data.status=='validation' && data.isDelete==false && data.uid==uid){
        validation++
      }else if(data.status=='complete' && data.isDelete==false && data.uid==uid){
        complete++
      }
    })

    return [{name:'Todo', value: todo}, {name:'Inprocess', value: inprocess}, {name:'Validation', value: validation}, {name:'Complete', value: complete}]

  }


  //filter Data for Date bar chart
  getDataBar(){
    let localdata = JSON.parse(localStorage.getItem('data'))
    let uid = JSON.parse(localStorage.getItem('uid'))
    localdata=localdata.filter((data)=>data.uid==uid)
    localdata.forEach((item) => {
      item.date = new Date(item.date);
    });
    localdata.sort((a,b)=>b.date.getTime() - a.date.getTime())

    const result:{date:Date; statusCount:number}[]=[]
    
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
