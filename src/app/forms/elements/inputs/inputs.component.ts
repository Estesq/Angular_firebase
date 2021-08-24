import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class User {
  public fname: string;
  public lname: string;
  public city: string;
}

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent {

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
}
