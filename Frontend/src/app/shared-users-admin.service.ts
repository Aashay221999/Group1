import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class SharedUsersAdminService {

  private _sharedUsers = new ReplaySubject<Array<User>>();

  readonly sharedUsers = this._sharedUsers.asObservable();

  public getSharedUsers(): Observable<Array<User>> {
    return this._sharedUsers;
  }
  public setSharedUser(user: Array<User>) {
    this._sharedUsers.next(user);
  }
}
