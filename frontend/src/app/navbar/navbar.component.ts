import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../student/signup/signup.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,NgbModule,SignupComponent,RouterLink,RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  @ViewChild("faculty") Elementfaculty:ElementRef
  @ViewChild("student") Elementstudent:ElementRef

  @Output() student:EventEmitter<string>=new EventEmitter<string>();

  isShowed:boolean=false

  facultyValue(){
    this.Elementfaculty.nativeElement.innerHTML;
    this.isShowed=true
  }
  studentValue(){
    this.Elementstudent.nativeElement.innerHTML
    this.isShowed=true
  }

}
