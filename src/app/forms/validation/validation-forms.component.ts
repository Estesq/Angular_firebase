import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

export class User {
  public fname: string;
  public lname: string;
  public city: string;
}

@Component({
  selector: 'app-validation-forms',
  templateUrl: './validation-forms.component.html',
  styleUrls: ['./validation-forms.component.scss']
})

export class ValidationFormsComponent implements OnInit {
  @ViewChild('vform') validationForm: FormGroup;
  user: User;
  model = new User();
  submitted = false;

  employeeForm = new FormGroup({
    fname: new FormControl('Mark', [Validators.required]),
    lname: new FormControl('Otto', [Validators.required]),
    city: new FormControl('', [Validators.required])
  });

  constructor() {
    this.model = {
      fname: 'Mark',
      lname: 'Otto',
      city: ''
    }
  }

  ngOnInit() {

  }

  onSubmit(form) {
    console.log(form.value)
  }

  get f() {
    return this.employeeForm.controls;
  }

  onReactiveFormSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    console.log(this.employeeForm.value);
  }

  onCustomFormSubmit() {
    this.validationForm.reset();
  }




}
