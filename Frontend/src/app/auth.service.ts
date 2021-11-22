import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLogged = new ReplaySubject<boolean>();

  readonly isLogged = this._isLogged.asObservable();

  public getIsAdmin(): Observable<boolean> {
    return this._isLogged;
  }
  public setIsAdmin(value: boolean) {
    this._isLogged.next(value);
  }
  constructor() { }
}
