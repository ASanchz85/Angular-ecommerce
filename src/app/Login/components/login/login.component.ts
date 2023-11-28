import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  title = 'Login';
  loginForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.loginForm = this._fb.group({
      userName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,}$/)],
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
    });
  }

  login() {}
}
