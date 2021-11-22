import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminService {
  private _isAdmin = new ReplaySubject<boolean>();

  readonly user = this._isAdmin.asObservable();

  public getIsAdmin(): Observable<boolean> {
    return this._isAdmin;
  }
  public setIsAdmin(value: boolean) {
    this._isAdmin.next(value);
  }
  constructor() { }
}
