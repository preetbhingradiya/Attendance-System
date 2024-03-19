import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StudetService } from '../../service/Student/student.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { emailValidation, space } from '../../validation/customeValidation';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  studnetService: StudetService = inject(StudetService);

  formData: FormGroup;
  isShowed: boolean = false;

  constructor() {
    this.formData = new FormGroup({
      fullname: new FormControl(null,[Validators.required, Validators.pattern('^(?!\s*$)[-a-zA-Z ]*$')]),
      email: new FormControl('',[Validators.required,space.noSpaceAllowed,emailValidation.emailValid]),
      password: new FormControl('',[Validators.required,Validators.pattern('^.{6,10}$')]),
      studentContect: new FormControl('',[Validators.pattern('^[0-9]*$'),Validators.pattern('^.{10,10}$')]),
      parentContect: new FormControl('',[Validators.required,Validators.pattern('^[0-9]*$'),Validators.pattern('^.{10,10}$')]),
      std: new FormControl('6'),
      previousScl: new FormControl('',[Validators.required,Validators.pattern('^(?!\s*$)[-a-zA-Z ]*$')]),
      previousStdPer: new FormControl('',[Validators.required,Validators.pattern('^[0-9]*$')]),
    });
  }

  SignUpStudent() {
    let data = this.formData.value;
    this.isShowed = true;
    setTimeout(() => {
      this.isShowed = false;
    }, 700);
    setTimeout(()=>{
      this.studnetService
      .postStudent(data)
      .pipe(
        catchError((error: any) => {
          let errormessage=""
          if (error.status === 0) {
            console.error('An error occurred:', error.error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `An error occurred:, ${error.error}`,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.message,
            });
          }
          return errormessage;
        })
      )
      .subscribe((res: any) => {
        if(res=='d'){
          return
        }
        else{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.Message,
            showConfirmButton: false,
            timer: 2500
          });
        }
      });
    },750)
  }
}
