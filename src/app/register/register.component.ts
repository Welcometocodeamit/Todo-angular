import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private loginService:AuthServiceService){}

  hide=true

  @ViewChild('username') username:ElementRef

  @ViewChild('password') password:ElementRef

  submit(){
    this.loginService.registerUser(this.username.nativeElement.value, this.password.nativeElement.value)
  }

}
