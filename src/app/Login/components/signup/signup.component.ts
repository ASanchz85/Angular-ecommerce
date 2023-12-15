import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  title = 'Sign up';
  signupForm!: FormGroup;
  passNotConfimed?: string;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.signupForm = this._fb.group({
      username: [
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
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[a-zA-Z0-9@$!%*?&-_]{8,}$/
          ),
        ],
      ],
    });
  }

  confirmPasswordCheker(): boolean {
    return (
      this.signupForm.get('password')?.value ===
        this.signupForm.get('confirmPassword')?.value ?? false
    );
  }

  register() {
    if (!this.confirmPasswordCheker()) {
      this.passNotConfimed = "Password couldn't be confirmed";
      return;
    }
    if (this.signupForm.valid) {
      const newUser: User = {
        username: this.signupForm.get('username')?.value,
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value,
        role: 'Customer',
      };

      this._auth
        .createUser(newUser)
        .subscribe(() => this._router.navigate(['admin', 'list']));
    }
  }
}
