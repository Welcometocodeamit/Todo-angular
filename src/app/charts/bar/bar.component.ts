import { ChangeDetectorRef, Component } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js'
import { ChartServiceService } from '../chart-service.service';
import { TaskserviceService } from 'src/app/services/taskservice.service';
Chart.register(...registerables)

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent {

  constructor(private service:ChartServiceService, private todoservice:TaskserviceService, private cdr: ChangeDetectorRef){}

  ngOnInit(){
    this.todoservice.subject.asObservable().subscribe((data)=>{
      this.receivedDataPie=this.service.getData()
      this.receivedDataBar=this.service.getDataBar()
      this.cdr.detectChanges();
    })
    this.receivedDataBar=this.service.getDataBar()
    this.receivedDataPie=this.service.getData()
  }

  receivedDataPie:any
  receivedDataBar:any


}
