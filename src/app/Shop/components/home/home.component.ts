import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username?: string;
  title?: string;
  
  constructor(private _authServ: AuthService) {
    this._authServ.user$.subscribe(user => this.username = user?.username)
    this.title = `Welcome, you're logged as ${this.username}`;
  }
}
