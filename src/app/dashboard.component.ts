import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentService } from './student.service';
import { Student } from './models';

@Component({
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterLink],
  template: `
    <section class="page" *ngIf="data">
      <div class="page-head">
        <div><p class="eyebrow">OVERVIEW</p><h1>Good morning 👋</h1><p class="muted">Here is your current transport fee snapshot.</p></div>
        <a routerLink="/students" class="primary">Manage Students</a>
      </div>

      <div class="stats">
        <article class="stat"><span>Total Students</span><strong>{{data.totalStudents}}</strong><small>Active students</small></article>
        <article class="stat"><span>Total Monthly Fee</span><strong>{{data.totalFee | currency:'INR':'symbol':'1.0-0'}}</strong><small>Expected this month</small></article>
        <article class="stat success"><span>Received Amount</span><strong>{{data.received | currency:'INR':'symbol':'1.0-0'}}</strong><small>Payments recorded</small></article>
        <article class="stat danger"><span>Pending Amount</span><strong>{{data.due | currency:'INR':'symbol':'1.0-0'}}</strong><small>Still to collect</small></article>
      </div>

      <section class="card">
        <div class="section-head"><div><h2>Current Month Due Students</h2><p class="muted">Showing the next 7 students who have an outstanding balance.</p></div><a routerLink="/students" class="text-link">View all →</a></div>
        <div class="table-wrap">
          <table><thead><tr><th>Student</th><th>Class</th><th>Pickup Place</th><th>Fee</th><th>Paid</th><th>Pending</th></tr></thead>
          <tbody>
            <tr *ngFor="let row of data.dues | slice:0:7">
              <td><a [routerLink]="['/students', row.student.id]" class="student-link">{{row.student.studentName}}</a><small>{{row.student.mobileNumber}}</small></td>
              <td>{{row.student.className}}</td><td>{{row.student.pickupPlace}}</td>
              <td>{{row.student.monthlyFee | currency:'INR':'symbol':'1.0-0'}}</td>
              <td>{{row.paid | currency:'INR':'symbol':'1.0-0'}}</td>
              <td><span class="badge danger">{{row.student.monthlyFee - row.paid | currency:'INR':'symbol':'1.0-0'}}</span></td>
            </tr>
          </tbody></table>
        </div>
      </section>
    </section>
  `,
})
export class DashboardComponent {
  private service = inject(StudentService);
  data!: {totalStudents:number,totalFee:number,received:number,due:number,dues:{student:Student,paid:number}[]};
  constructor() { this.service.dashboard().subscribe(x => this.data = x); }
}