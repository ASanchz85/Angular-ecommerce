import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User, UserCredentials } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _url = 'http://localhost:3000/api/auth/';
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));
  private _credentials$ = '';

  constructor(private _http: HttpClient) {}

  login(user: UserCredentials) {
    return this._http.post<any>(this._url + 'login/', user).pipe(
      tap((data) => {
        if (data.success) {
          this._credentials$ = btoa(
            `${data.query?.username}:${data.query?.password}`
          );
          this.user.next(data.query);
        }
      })
    );
  }

  getCredentials() {
    return this._credentials$;
  }

  createUser(user: User) {
    return this._http.post<any>(this._url + 'new/', user);
  }
}
