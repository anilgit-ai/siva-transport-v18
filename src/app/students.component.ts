import { Component, inject } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Student } from './models';
import { StudentService } from './student.service';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, FormsModule, RouterLink],
  template: `
    <section class="page">
      <div class="page-head">
        <div><p class="eyebrow">STUDENTS</p><h1>Student Directory</h1><p class="muted">{{filtered.length}} students found</p></div>
        <button class="primary" (click)="showForm=!showForm">{{showForm ? 'Close' : '+ Add Student'}}</button>
      </div>

      <form class="card form-grid" *ngIf="showForm" (ngSubmit)="save()">
        <h2>Add New Student</h2>
        <label>Student Name<input [(ngModel)]="draft.studentName" name="name" required></label>
        <label>Class<input [(ngModel)]="draft.className" name="class" required></label>
        <label>Mobile Number<input [(ngModel)]="draft.mobileNumber" name="mobile" required></label>
        <label>Pickup Place<input [(ngModel)]="draft.pickupPlace" name="pickup" required></label>
        <label>Joining Date<input type="date" [(ngModel)]="draft.joiningDate" name="joining" required></label>
        <label>Monthly Fee<input type="number" [(ngModel)]="draft.monthlyFee" name="fee" required></label>
        <div><button class="primary" type="submit">Save Student</button></div>
      </form>

      <section class="card">
        <div class="toolbar"><input class="search" [(ngModel)]="query" placeholder="Search name, class, mobile or pickup place..."><select [(ngModel)]="status"><option value="all">All students</option><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
        <div class="table-wrap"><table><thead><tr><th>Student</th><th>Class</th><th>Mobile</th><th>Pickup Place</th><th>Joining Date</th><th>Monthly Fee</th><th></th></tr></thead>
        <tbody><tr *ngFor="let s of filtered">
          <td><a class="student-link" [routerLink]="['/students',s.id]">{{s.studentName}}</a></td><td>{{s.className}}</td><td>{{s.mobileNumber}}</td><td>{{s.pickupPlace}}</td><td>{{s.joiningDate}}</td><td>{{s.monthlyFee | currency:'INR':'symbol':'1.0-0'}}</td><td><a [routerLink]="['/students',s.id]" class="text-link">Details</a></td>
        </tr></tbody></table></div>
      </section>
    </section>
  `
})
export class StudentsComponent {
  private service = inject(StudentService);
  students: Student[] = [];
  query = ''; status = 'all'; showForm = false;
  draft: Omit<Student,'id'> = {studentName:'',className:'',mobileNumber:'',pickupPlace:'',joiningDate:new Date().toISOString().slice(0,10),monthlyFee:1000,active:true};
  get filtered() {
    const q = this.query.toLowerCase().trim();
    return this.students.filter(s => (this.status==='all'||(this.status==='active'?s.active:!s.active)) &&
      (!q || [s.studentName,s.className,s.mobileNumber,s.pickupPlace].some(v => v.toLowerCase().includes(q))));
  }
  constructor(){ this.load(); }
  load(){ this.service.students().subscribe(x=>this.students=x); }
  save(){ this.service.createStudent(this.draft).subscribe(()=>{this.showForm=false;this.draft={studentName:'',className:'',mobileNumber:'',pickupPlace:'',joiningDate:new Date().toISOString().slice(0,10),monthlyFee:1000,active:true};this.load();}); }
}