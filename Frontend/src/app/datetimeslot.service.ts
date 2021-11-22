import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeslotService {
  private _timeslot:number;
  private _acID:number;
  private _date:string;

  public getDate(): string {
    return this._date;
  }
  public setDate(value: string) {
    this._date= value;
  }
  public getTimeslot(): number {
    return this._timeslot;
  }
  public setTimeslot(value: number) {
    this._timeslot = value;
  }
  public getAcid(): number {
    return this._acID;
  }
  public setAcid(value: number) {
    this._acID = value;
  }
  constructor() { }
}
