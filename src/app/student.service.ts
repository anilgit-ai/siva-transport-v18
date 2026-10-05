import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Payment, Student } from './models';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private http = inject(HttpClient);
  private base = 'http://localhost:3000';

  students(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.base}/students`);
  }

  payments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.base}/payments`);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.base}/students/${id}`);
  }

  createStudent(student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(`${this.base}/students`, student);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.base}/students/${student.id}`, student);
  }

  addPayment(payment: Omit<Payment, 'id'>): Observable<Payment> {
    return this.http.post<Payment>(`${this.base}/payments`, payment);
  }

  dashboard() {
    return forkJoin({ students: this.students(), payments: this.payments() }).pipe(
      map(({students, payments}) => {
        const active = students.filter(s => s.active);
        const month = new Date().toISOString().slice(0, 7);
        const currentPayments = payments.filter(p => p.month === month);
        const received = currentPayments.reduce((sum, p) => sum + p.amount, 0);
        const total = active.reduce((sum, s) => sum + s.monthlyFee, 0);
        const due = Math.max(total - received, 0);
        const dues = active
          .map(s => ({ student: s, paid: currentPayments.filter(p => p.studentId === s.id).reduce((x, p) => x + p.amount, 0) }))
          .filter(x => x.paid < x.student.monthlyFee);
        return { totalStudents: active.length, totalFee: total, received, due, dues };
      })
    );
  }
}