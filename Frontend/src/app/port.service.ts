import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortService {
  portNumber:number;

  constructor() {
    this.portNumber = 9090;
   }

  public setPortNumber(port:number):void {
    this.portNumber = port;
  }
  public getPortNumber(): string{
    return this.portNumber.toString();
  }
}
