import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TaskserviceService } from './taskservice.service';
import Toastify from "toastify";
import { User } from '../Models/User';
import { Token } from '../Models/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isLoggedIn:boolean=false
  username:string

  private loginSubject = new BehaviorSubject<boolean>(false);
  loginO = this.loginSubject.asObservable();

  

  constructor(private route:Router, private taskService:TaskserviceService) {

    // if(localStorage.getItem('loggedIn')=='true'){
    //   this.isLoggedIn=true
    //   this.loginSubject.next(true)
    // }else if(localStorage.getItem('loggedIn')=='false'){
    //   this.isLoggedIn=false
    //   this.loginSubject.next(false)
    // }

   }

  //  uid=null


  //  local login
  logIn(data:Token){
    this.username=data.username
    this.isLoggedIn=true
    // alert(`Welcome ${data.username}`)
    this.route.navigate(['/Home'])

    // let users=JSON.parse(localStorage.getItem('users'))
    // let foundUser
    // // console.log(users)
    // if(users == null){
    //   this.isLoggedIn=false
    //   alert(`Incorrect credentials`)
    // }else{
    //   foundUser=users.filter((data)=>data.username==username && data.password==password)
    // }

    // if(foundUser.length>0){
    //   this.uid=foundUser[0].uid
    //   this.isLoggedIn=true
    //   this.loginSubject.next(true)
      
    //   localStorage.setItem('loggedIn', JSON.stringify(true))
      
    //   alert(`Welcome ${username}`)
    //   this.route.navigate(['/Home'])

    //   localStorage.setItem('uid', JSON.stringify(this.uid));

      

    // }else{
    //   this.isLoggedIn=false
    //   alert(`Incorrect credentials`)
    // }
    
  }


  logOut(){
    // localStorage.setItem('loggedIn', JSON.stringify(false))
    this.isLoggedIn=false
    // this.uid=null
    this.taskService.bData=[]
    // localStorage.setItem('uid', JSON.stringify(this.uid));
    this.loginSubject.next(false)
  }

  getkey(){
    let ld = JSON.parse(localStorage.getItem('users'))
    let key
   if(ld == null || ld.length==0){
      return 0
    }
    if(ld == undefined){
      return 0
    } 
    let length = ld.length-1
    key = ld[length].uid
    return key
  }

  // users:any=[]

  registerUser(user:User){
    // if(localStorage.getItem('users')==null){
    //   localStorage.setItem('users', JSON.stringify(this.users));
    // }
    // console.log(this.getkey())
      // this.users=JSON.parse(localStorage.getItem('users'))
      // this.users.push({uid:this.getkey()+1, username:name, password:password})
      // localStorage.setItem('users', JSON.stringify(this.users));
      // localStorage.setItem('loggedIn', JSON.stringify(false))
      this.isLoggedIn=false
      this.loginSubject.next(false)
      alert("Registration sucess, Please login")
      this.route.navigate(['/Login'])
  }
}
