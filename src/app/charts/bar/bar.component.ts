import { Component } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js'
import { ChartServiceService } from '../chart-service.service';
import { TaskserviceService } from 'src/app/taskservice.service';
Chart.register(...registerables)

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent {

  constructor(private service:ChartServiceService, private todoservice:TaskserviceService){}

  ngOnInit(){
    this.todoservice.subject.asObservable().subscribe((data)=>{
      this.RenderChart('pie', 'pie')
    })
    this.RenderChart('pie', 'pie')
  }

  mainData:any=[]
  labels:any=[]

  setData(){
    let data = this.service.getData()
    data.map((data)=>{
      this.labels.push(data.name)
      this.mainData.push(data.value)
    })

  }


  RenderChart(id, chart){
    Chart.defaults.borderColor = 'rgb(190, 204, 216)';
    Chart.defaults.font.family="'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    Chart.defaults.font.weight='bold'

    this.mainData=[]
    this.labels=[]
    this.setData()

    const existingChart = Chart.getChart(chart);

    if (existingChart) {
      existingChart.destroy();
    }
  new Chart(chart, {
    type: id,
    data: {
      labels: this.labels,
      datasets: [{
        label: 'Tasks',
        data: this.mainData,
        
        borderWidth: 1
      }]
    },
    options: {
      // scales: {
      //   y: {
      //     beginAtZero: true
      //   }
      // }
    }
  });

  }

  
  

}
