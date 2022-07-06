import { FilterComponent } from './filter/filter.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';

const routes: Routes = [
  {
    path: '',
    component: FilterComponent,
  },
  {
    path: 'studentList',
    component: StudentListComponent,
  },
  {
    path: 'teacherList',
    component: TeacherListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
