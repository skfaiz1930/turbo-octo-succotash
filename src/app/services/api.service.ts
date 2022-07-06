import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postStudent(data: any) {
    return this.http.post<any>(
      'http://localhost:3000/student/addStudent',
      data
    );
  }
  getStudent() {
    return this.http.get<any>('http://localhost:3000/student/getStudents');
  }
  putStudent(data: any, id: number) {
    return this.http.put<any>(
      'http://localhost:3000/student/editStudent/' + id,
      data
    );
  }
  deleteStudent(id: number) {
    return this.http.delete<any>(
      'http://localhost:3000/student/softDelete/' + id
    );
  }
  postTeacher(data: any) {
    return this.http.post<any>(
      'http://localhost:3000/teacher/addTeacher',
      data
    );
  }
  getTeacher() {
    return this.http.get<any>('http://localhost:3000/teacher/getTeachers');
  }
  putTeacher(data: any, id: number) {
    return this.http.put<any>(
      'http://localhost:3000/teacher/editTeacher/' + id,
      data
    );
  }
  deleteTeacher(id: number) {
    return this.http.delete<any>(
      'http://localhost:3000/teacher/softDeleteTeacher/' + id
    );
  }

  filterBySubject(subject: string) {
    return this.http.get<any>(
      'http://localhost:3000/student/getBySubject/' + subject
    );
  }
}
