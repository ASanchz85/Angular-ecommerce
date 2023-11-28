import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  title = 'Sign up';
  signupForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.signupForm = this._fb.group({
      userName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,}$/)],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[a-zA-Z0-9@$!%*?&-_]{8,}$/
          ),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required]]
    });
  }

  register() {}
}
