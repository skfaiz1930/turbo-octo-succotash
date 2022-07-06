import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogTeacherComponent } from '../dialog-teacher/dialog-teacher.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dob', 'gender', 'subject', 'Action'];

  teacherSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private DialogTeacherComponent: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllTeachers();
  }

  goToFilter() {
    this.router.navigate(['']);
  }

  getAllTeachers() {
    this.api.getTeacher().subscribe({
      next: (res) => {
        this.teacherSource = new MatTableDataSource(res.teachers);
        this.teacherSource.paginator = this.paginator;
        this.teacherSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the records');
      },
    });
  }
  editTeacher(row: any) {
    this.dialog
      .open(DialogTeacherComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllTeachers();
        }
      });
  }
  deleteTeacher(id: number) {
    this.api.deleteTeacher(id).subscribe({
      next: () => {
        alert('Deleted Student Successfully');
        this.getAllTeachers();
      },
      error: () => {
        alert('Error while deleting the record');
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.teacherSource.filter = filterValue.trim().toLowerCase();

    if (this.teacherSource.paginator) {
      this.teacherSource.paginator.firstPage();
    }
  }
}
