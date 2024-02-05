import { Component, Input } from '@angular/core';
import { ChartServiceService } from '../../chart-service.service';
import { TaskserviceService } from 'src/app/services/taskservice.service';
import {Chart, registerables} from 'node_modules/chart.js'
import { PieData } from 'src/app/Models/PieData';
Chart.register(...registerables)

@Component({
  selector: 'app-pie-task',
  templateUrl: './pie-task.component.html',
  styleUrls: ['./pie-task.component.css']
})
export class PieTaskComponent {

  @Input() receivedData:PieData[]
  constructor(private service:ChartServiceService, private todoservice:TaskserviceService){}

  ngOnInit(){
    this.todoservice.subject.asObservable().subscribe((data)=>{
      this.setData()
      this.RenderChart('pie', 'pie')
    })
    this.setData()
    this.RenderChart('pie', 'pie')
  }

  mainData:number[]=[]
  labels:string[]=[]

  setData(){
    this.mainData=[]
    this.labels=[]
    this.receivedData.map((data)=>{
      this.labels.push(data.name)
      this.mainData.push(data.value)
    })
  }


  
  RenderChart(id, chart){
    Chart.defaults.borderColor = 'rgb(190, 204, 216)';
    Chart.defaults.font.family="'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    Chart.defaults.font.weight='bold'


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
    options: {}
  });

  }
}
