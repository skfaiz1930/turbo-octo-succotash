import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-teacher',
  templateUrl: './dialog-teacher.component.html',
  styleUrls: ['./dialog-teacher.component.scss'],
})
export class DialogTeacherComponent implements OnInit {
  genderList = ['Male', 'Female', 'Trans'];
  teacherForm!: FormGroup;
  actionbtn: string = 'Save';
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogTeacherComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.formBuilder.group({
      Name: ['', Validators.required],
      DOB: ['', Validators.required],
      Gender: ['', Validators.required],
      Subject: ['', Validators.required],
    });
    this.editTeacher();
  }

  editTeacher() {
    if (this.editData) {
      this.actionbtn = 'Update';
      this.teacherForm.controls['Name'].setValue(this.editData.Name);
      this.teacherForm.controls['DOB'].setValue(this.editData.DOB);
      this.teacherForm.controls['Subject'].setValue(this.editData.Subject);
      this.teacherForm.controls['Gender'].setValue(this.editData.Gender);
    }
  }

  addTeacher() {
    if (!this.editData) {
      if (this.teacherForm.valid) {
        this.api.postTeacher(this.teacherForm.value).subscribe({
          next: (res) => {
            alert('Teacher added successfully');
          },
          error: () => {
            alert('Error while adding the product');
          },
        });
      }
    } else {
      this.updateTeacher();
    }
  }

  updateTeacher() {
    this.api.putTeacher(this.teacherForm.value, this.editData._id).subscribe({
      next: (res) => {
        alert('Teacher updated successfully');
        this.teacherForm.reset();
        this.dialogRef.close('update');
        this.router.navigate(['/teacherList']);
      },
      error: () => {
        alert('Error while updating the Teacher');
      },
    });
  }
}
