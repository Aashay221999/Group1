import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user = new ReplaySubject<User>();

  readonly user = this._user.asObservable();


  public getUser(): Observable<User> {
    return this._user;
  }
  public setUser(user: User) {
    this._user.next(user);
  }
  constructor() { }
}
