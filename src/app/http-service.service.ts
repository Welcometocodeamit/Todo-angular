import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './register/register.component';
import { TaskModel } from './Models/Task';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http:HttpClient) { }

  BASE_URL="http://localhost:8080"

  registerUser(user:User){
    return this.http.post(`${this.BASE_URL}/user`, user)
  }

  loginUser(user:User){
    return this.http.post(`${this.BASE_URL}/auth/login`, user)
  }

  getTask(){
    return this.http.get(`${this.BASE_URL}/task`)
  }

  addTask(task:any){
    return this.http.post(`${this.BASE_URL}/task`, task)
  }
//
  updateTask(task:any){
    return this.http.put(`${this.BASE_URL}/task`, task)
  }

  changeStatus(taskId:number, status:string){
    return this.http.patch(`${this.BASE_URL}/task/${taskId}/${status}`, {})
  }

  deleteTask(taskId:number){
    return this.http.patch(`${this.BASE_URL}/task/${taskId}`,{})
  }

  deleteTaskPermanantaly(){
    return this.http.delete(`${this.BASE_URL}/task`)
  }
}
