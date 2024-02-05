import { Component } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { HttpServiceService } from './services/http-service.service';
import { TaskserviceService } from './services/taskservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth:AuthServiceService, private http:HttpServiceService, private task:TaskserviceService, private route:Router){
    let token=localStorage.getItem('token')
    if(token == null || token == "null"){
      
    }else{
      this.auth.isLoggedIn=true
      this.route.navigate(['/Home'])
        this.task.subject.next(false)
      // this.http.getTask().subscribe((data:any)=>{
      //   this.auth.isLoggedIn=true
      //   this.task.bData=data
      //   this.route.navigate(['/Home'])
      //   this.task.subject.next(false)
      // })
    }
  }
  title = 'task2';
}
