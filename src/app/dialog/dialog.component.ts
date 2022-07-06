import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  genderList = ['Male', 'Female', 'Trans'];
  studentForm!: FormGroup;

  actionbtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Class: ['', Validators.required],
      DOB: ['', Validators.required],
      Gender: ['', Validators.required],
      Subject: ['', Validators.required],
    });

    if (this.editData) {
      this.actionbtn = 'Update';
      this.studentForm.controls['Name'].setValue(this.editData.Name);
      this.studentForm.controls['DOB'].setValue(this.editData.DOB);
      this.studentForm.controls['Subject'].setValue(this.editData.Subject);
      this.studentForm.controls['Gender'].setValue(this.editData.Gender);
      this.studentForm.controls['Class'].setValue(this.editData.Class);
    }
  }
  addStudent() {
    if (!this.editData) {
      if (this.studentForm.valid) {
        this.api.postStudent(this.studentForm.value).subscribe({
          next: (res) => {
            alert('Student Added Successfully');
            this.studentForm.reset();
            this.dialogRef.close('save');
            this.router.navigate(['/studentList']);
          },
          error: () => {
            alert('Error while adding student Add');
          },
        });
      }
    } else {
      this.updateStudent();
    }
  }
  updateStudent() {
    this.api.putStudent(this.studentForm.value, this.editData._id).subscribe({
      next: (res) => {
        alert('Student updated Successfully');
        this.studentForm.reset();
        this.dialogRef.close('update');
        this.router.navigate(['/studentList']);
      },
      error: () => {
        alert('Error while updating Student Update');
      },
    });
  }
}
