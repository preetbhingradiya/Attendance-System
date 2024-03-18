import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudetService {

  baseUsrl='http://localhost:8000/api/v1/school'
  constructor(private studenHttp:HttpClient) {}

  postStudent(data:any){
    return this.studenHttp.post(this.baseUsrl+'/request/student',data)
  }
}
