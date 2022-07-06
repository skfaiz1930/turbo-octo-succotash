import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  ngOnInit(): void {}
  subject: string = '';
  subjects: any[] = [];
  displayedColumns: string[] = ['name', 'class', 'gender', 'subject'];
  dataSource!: MatTableDataSource<any>;
  subjectDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private api: ApiService) {}
  goToStudent() {
    this.router.navigate(['/studentList']);
  }

  goToTeacher() {
    this.router.navigate(['/teacherList']);
  }
  search() {
    console.log(this.subject);
    this.api.filterBySubject(this.subject).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res.matched);
        res.matched.map((teacher: any) => {
          teacher.matchedSubject.map((teacher: any) => {
            this.subjects.push(teacher);
          })
        });
        this.subjectDataSource = new MatTableDataSource(this.subjects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
