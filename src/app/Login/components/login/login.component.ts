import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredentials } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  title = 'Login';
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _auths: AuthService,
    private _router: Router,
    private _activRoute: ActivatedRoute
  ) {
    this.loginForm = this._fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{3,}$/)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/
          ),
        ],
      ],
    });
  }

  login() {
    this._auths
      .login(this.loginForm.value as UserCredentials)
      .subscribe((res) => {
        if (!res.success) alert(res.msg);
        else {
          console.log(res.msg);
          this._router.navigate(['shop', 'catalogue'], {
            relativeTo: this._activRoute,
          });
        }
      });
  }
}
