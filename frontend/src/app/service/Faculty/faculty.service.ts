import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  url = 'http://localhost:8000/api/v1/school'
  constructor(private facultyHttp:HttpClient) { }

  getfaculty(){
    return this.facultyHttp.get(this.url)
  }
}
