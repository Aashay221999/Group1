import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private _jwtToken = new ReplaySubject<string>();

  readonly jwtToken = this._jwtToken.asObservable();

  public getToken(): Observable<string> {
    return this._jwtToken;
  }
  public setToken(value: string) {
    this._jwtToken.next(value);
  }
  constructor() { }
}
