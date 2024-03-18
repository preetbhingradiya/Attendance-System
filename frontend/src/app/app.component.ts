import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FacultyService } from './service/Faculty/faculty.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { StudetService } from './service/Student/student.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule,NgbModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[FacultyService,StudetService]
})
export class AppComponent implements OnInit {
  title = 'frontend';
  facultyService:FacultyService=inject(FacultyService)


  ngOnInit(): void {
    this.facultyService.getfaculty().subscribe((res)=>{
      console.log(res)
    })
  }
}
