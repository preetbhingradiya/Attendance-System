import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StudetService } from '../../service/Student/student.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent{
  studnetService: StudetService = inject(StudetService);

  formData:FormGroup;
  isShowed:boolean=false

  constructor(){
    this.formData = new FormGroup({
      fullname:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl(''),
      studentContect:new FormControl(''),
      parentContect:new FormControl(''),
      std:new FormControl('6'),
      previousScl:new FormControl(''),
      previousStdPer:new FormControl('')
    })
  }

  SignUpStudent(){
    let data = this.formData.value
    this.studnetService.postStudent(data).subscribe((res:any)=>{
      setTimeout(()=>{
        this.isShowed=true
      },2000)
      try {
        this.isShowed=false
        return res;
      } catch (error) {
        console.log(error.message);
      }
    })
  }
}
