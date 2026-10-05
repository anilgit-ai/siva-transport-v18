import { Component, inject } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Payment, Student } from './models';
import { StudentService } from './student.service';

@Component({
  standalone:true,
  imports:[NgIf,NgFor,CurrencyPipe,FormsModule,RouterLink],
  template:`
  <section class="page" *ngIf="student">
    <a routerLink="/students" class="back">← Back to students</a>
    <div class="profile-head">
      <div class="avatar">{{student.studentName.charAt(0)}}</div>
      <div><p class="eyebrow">STUDENT PROFILE</p><h1>{{student.studentName}}</h1><p class="muted">Class {{student.className}} · {{student.pickupPlace}}</p></div>
      <span class="badge" [class.success]="student.active" [class.muted-badge]="!student.active">{{student.active?'ACTIVE':'INACTIVE'}}</span>
    </div>

    <div class="detail-grid">
      <article class="card"><h2>Student Details</h2>
        <div class="detail-row"><span>Student Name</span><strong>{{student.studentName}}</strong></div>
        <div class="detail-row"><span>Class</span><strong>{{student.className}}</strong></div>
        <div class="detail-row"><span>Mobile Number</span><strong>{{student.mobileNumber}}</strong></div>
        <div class="detail-row"><span>Pickup Place</span><strong>{{student.pickupPlace}}</strong></div>
        <div class="detail-row"><span>Joining Date</span><strong>{{student.joiningDate}}</strong></div>
        <div class="detail-row"><span>Monthly Fee</span><strong>{{student.monthlyFee | currency:'INR':'symbol':'1.0-0'}}</strong></div>
      </article>

      <article class="card"><h2>Record Payment</h2>
        <form (ngSubmit)="pay()">
          <label>Month<input type="month" [(ngModel)]="month" name="month" required></label>
          <label>Amount<input type="number" [(ngModel)]="amount" name="amount" required></label>
          <button class="primary full" type="submit">Record Payment</button>
        </form>
        <div class="payment-summary"><span>This month paid</span><strong>{{paidThisMonth | currency:'INR':'symbol':'1.0-0'}}</strong><span>Pending</span><strong class="danger-text">{{pending | currency:'INR':'symbol':'1.0-0'}}</strong></div>
      </article>
    </div>

    <article class="card"><h2>Payment History</h2>
      <div class="table-wrap"><table><thead><tr><th>Month</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
      <tbody><tr *ngFor="let p of payments"><td>{{p.month}}</td><td>{{p.paymentDate}}</td><td>{{p.amount | currency:'INR':'symbol':'1.0-0'}}</td><td><span class="badge success">{{p.status}}</span></td></tr></tbody></table></div>
    </article>
  </section>`
})
export class StudentDetailsComponent {
  private service=inject(StudentService); private route=inject(ActivatedRoute);
  student!: Student; payments:Payment[]=[]; month=new Date().toISOString().slice(0,7); amount=0;
  get paidThisMonth(){return this.payments.filter(p=>p.month===this.month).reduce((s,p)=>s+p.amount,0)}
  get pending(){return Math.max(this.student.monthlyFee-this.paidThisMonth,0)}
  constructor(){const id=Number(this.route.snapshot.paramMap.get('id')); forkJoin({student:this.service.getStudent(id),payments:this.service.payments()}).subscribe(x=>{this.student=x.student;this.payments=x.payments.filter(p=>p.studentId===id).sort((a,b)=>b.month.localeCompare(a.month));this.amount=this.pending;});}
  pay(){if(!this.amount)return;this.service.addPayment({studentId:this.student.id,month:this.month,amount:Number(this.amount),paymentDate:new Date().toISOString().slice(0,10),status:this.amount>=this.student.monthlyFee?'PAID':'PARTIAL'}).subscribe(p=>{this.payments=[p,...this.payments];this.amount=this.pending;});}
}