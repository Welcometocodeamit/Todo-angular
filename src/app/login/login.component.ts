import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService:AuthServiceService){}

  hide=true

  logged:boolean = this.loginService.isLoggedIn

  @ViewChild('username') username:ElementRef

  @ViewChild('password') password:ElementRef

  submit(){
    this.loginService.logIn(this.username.nativeElement.value, this.password.nativeElement.value)
    this.logged=this.loginService.isLoggedIn
    console.log(this.logged)
  }

  logOut(){
    this.loginService.logOut()
    this.logged=this.loginService.isLoggedIn
  }


}
