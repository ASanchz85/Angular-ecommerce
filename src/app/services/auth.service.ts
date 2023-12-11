import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User, UserCredentials } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _url = 'http://localhost:3000/api/auth/login/';
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  constructor(private _http: HttpClient) {}

  login(user: UserCredentials) {
    return this._http.post<any>(this._url, user).pipe(
      tap((data) => {
        if (data.success) this.user.next(data.query);
      })
    );
  }
}
