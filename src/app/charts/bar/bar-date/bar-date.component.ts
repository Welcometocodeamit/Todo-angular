import { Component } from '@angular/core';
import { ChartServiceService } from '../../chart-service.service';
import { TaskserviceService } from 'src/app/taskservice.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-date',
  templateUrl: './bar-date.component.html',
  styleUrls: ['./bar-date.component.css']
})
export class BarDateComponent {

  constructor(private service:ChartServiceService, private todoservice:TaskserviceService){}


  ngOnInit(){
    this.todoservice.subject.asObservable().subscribe((data)=>{
      this.RenderChart('bar', 'bar')
    })
    this.RenderChart('bar', 'bar')
  }


  mainData:any=[]
  labels:any=[]

  setData(){
    let data = this.service.getDataBar()
    data.map((data)=>{
      let simpleDate = new Date(data.date).toLocaleDateString();
      this.labels.push(simpleDate)
      this.mainData.push(data.statusCount)
    })

  }


  RenderChart(id, chart){
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
        backgroundColor:'#0074D9',
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max:5,
          precision: 0,
          ticks: {
            stepSize: 1
        }
        }
      }
    }
  });

  }

  deletePermanant(){
    this.todoservice.deleteTaskPermant()
  }

  

}
