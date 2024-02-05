import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private loginService:AuthServiceService, private http:HttpServiceService){}

  hide=true

  @ViewChild('username') username:ElementRef

  @ViewChild('password') password:ElementRef

  user:User= { username: '', password: '' }

  submit(){
    this.loginService.registerUser(this.username.nativeElement.value, this.password.nativeElement.value)
    this.user.username=this.username.nativeElement.value
    this.user.password=this.password.nativeElement.value
    this.http.registerUser(this.user).subscribe((data)=>{},
    (err)=>{
      
    }
    )
  }

}

export interface User{
  username:string,
  password:string
}
