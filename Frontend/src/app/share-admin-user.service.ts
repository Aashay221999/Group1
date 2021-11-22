import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class ShareAdminUserService {
  private _sharedUser = new ReplaySubject<User>();

  readonly sharedUser = this._sharedUser.asObservable();

  public getSharedUser(): Observable<User> {
    return this._sharedUser;
  }
  public setSharedUser(user: User) {
    this._sharedUser.next(user);
  }
  constructor() { }
}
