import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StudentsComponent } from './students.component';
import { StudentDetailsComponent } from './student-details.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: '**', redirectTo: '' }
];