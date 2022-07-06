import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogTeacherComponent } from './dialog-teacher/dialog-teacher.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angularCRUD';

  displayedColumns: string[] = [
    'name',
    'class',
    'dob',
    'gender',
    'subject',
    'Action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private DialogTeacherComponent: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllStudents();
  }

  goToFilter() {
    this.router.navigate(['']);
  }

  goToStudent() {
    this.router.navigate(['/studentList']);
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllStudents();
        }
      });
  }

  openDialogTeacher() {
    this.dialog
      .open(DialogTeacherComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllStudents();
        }
      });
  }

  getAllStudents() {
    this.api.getStudent().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the records');
      },
    });
  }
  editStudent(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          this.getAllStudents();
        }
      });
  }
  deleteStudent(id: number) {
    this.api.deleteStudent(id).subscribe({
      next: () => {
        alert('Deleted Student Successfully');
        this.getAllStudents();
      },
      error: () => {
        alert('Error while deleting the record');
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
