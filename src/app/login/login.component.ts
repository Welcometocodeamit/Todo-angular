import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { HttpServiceService } from '../http-service.service';
import { User } from '../register/register.component';
import { TaskserviceService } from '../taskservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService:AuthServiceService, private http:HttpServiceService, private taskService:TaskserviceService){}

  hide=true

  logged:boolean = this.loginService.isLoggedIn

  @ViewChild('username') username:ElementRef

  @ViewChild('password') password:ElementRef

  user:User= { username: '', password: '' }

  token:string

  submit(){
    // login from database
    this.user.username = this.username.nativeElement.value
    this.user.password = this.password.nativeElement.value
    this.http.loginUser(this.user).subscribe((data:any)=>{
     
      this.token=data.jwtToken
      localStorage.setItem('token', JSON.stringify(this.token))

      // locally login
      if(data.jwtToken){
        this.loginService.logIn(data)
        this.logged=this.loginService.isLoggedIn
      }

      // getting tasks
      // this.http.getTask().subscribe((data:any)=>{
      //   this.taskService.bData=data
      //   this.taskService.subject.next(true)
      // })

    }, 
    (err)=>{
      // failed login
      this.loginService.isLoggedIn=false
      alert(err.error.message)
      this.logged=this.loginService.isLoggedIn
    })


    // this.loginService.logIn(this.username.nativeElement.value, this.password.nativeElement.value)
    // this.logged=this.loginService.isLoggedIn
    // console.log(this.logged)

  }

  logOut(){
    this.loginService.logOut()
    this.token=null
    localStorage.setItem('token', JSON.stringify(this.token))
    this.logged=this.loginService.isLoggedIn
  }


}
