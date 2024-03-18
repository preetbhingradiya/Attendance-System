import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StudetService } from '../../service/Student/student.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent{
  studnetService: StudetService = inject(StudetService);

  formData:FormGroup;

  constructor(){
    this.formData = new FormGroup({
      fullname:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl(''),
      studentContect:new FormControl(''),
      parentContect:new FormControl(''),
      std:new FormControl('6'),
      previousScl:new FormControl(''),
      previousStd:new FormControl('')
    })
  }

  SignUpStudent(){
    console.log(this.formData.value);
  }
}
