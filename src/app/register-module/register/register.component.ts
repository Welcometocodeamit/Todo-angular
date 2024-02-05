import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpServiceService } from '../../services/http-service.service';
import { User } from 'src/app/Models/User';

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
    
    this.user.username=this.username.nativeElement.value
    this.user.password=this.password.nativeElement.value
    this.http.registerUser(this.user).subscribe((data)=>{
      
    },
    (err)=>{
      console.log(err)
    }
    )

    this.loginService.registerUser(this.user)
  }

}


