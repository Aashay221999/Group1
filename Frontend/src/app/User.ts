import { AppointmentEntity } from "./AppointmentEntity";
import { AppointmentCalendar } from "./AppointmentCalendar";

export class User{
    private _userID:number = 0;
    private _userName:string = "";
    private _mobileNumber:string = "";
    private _DoB:Date = new Date();
    private _email:string = "";
    private _isAdmin:boolean = false;
    private _listMyBookedAppointmentEntries:AppointmentEntity[] = [];
    private _listMyAppointmentCalendars:AppointmentCalendar[] = [];
    private _isLoggedIn = false;

    constructor(userID:number, userName:string, mobileNumber:string,DoB:Date,
            email:string, isAdmin:boolean, listMyBookedAppointmentEntries:AppointmentEntity[],
            listMyAppointmentCalendars:AppointmentCalendar[]){
        this._userID = userID;
        this._userName = userName;
        this._mobileNumber = mobileNumber;
        this._DoB = DoB;
        this._email = email;
        this._isAdmin = isAdmin;
        this._listMyBookedAppointmentEntries = listMyBookedAppointmentEntries;
        this._listMyAppointmentCalendars = listMyAppointmentCalendars;
}   
    public getuserID():number {
        return this._userID;
    }
    public setuserID(aeID:number) {
        this._userID = aeID;
    }
    public getIsLoggedIn():boolean {
        return this._isLoggedIn;
    }
    public setIsLoggedIn(isl:boolean) {
        this._isLoggedIn = isl;
    }
    public getUserName():string {
        return this._userName;
    }
    public setUserName(ownerid:string) {
        this._userName = ownerid;
    }
    public getMobileNumber():string {
        return this._mobileNumber;
    }
    public setMobileNumber(mobileNumber:string) {
        this._mobileNumber = mobileNumber;
    }
    public getDoB():Date {
        return this._DoB;
    }
    public setDoB(date:Date) {
        this._DoB = date;
    }
    public getEmail():string {
        return this._email;
    }
    public setEmail(email:string) {
        this._email = email;
    }
    public getIsAdmin():boolean {
        return this._isAdmin;
    }
    public setIsAdmin(isAdmin:boolean) {
        this._isAdmin = isAdmin;
    }

    public getListMyBookedAppointmentEntries():AppointmentEntity[]
    {
        return this._listMyBookedAppointmentEntries;
    }
    public setListMyBookedAppointmentEntries(listAppointmentEntries:AppointmentEntity[])
    {
        this._listMyBookedAppointmentEntries = listAppointmentEntries;
    }

    public getListMyAppointmentCalendars():AppointmentCalendar[]
    {
        return this._listMyAppointmentCalendars;
    }
    public setListMyAppointmentCalendars(listMyAppointmentCalendars:AppointmentCalendar[])
    {
        this._listMyAppointmentCalendars = listMyAppointmentCalendars;
    }
    public getLMyAppointmentCalendarByAcid(acid:number):AppointmentCalendar
    {
        let i = 0;
        for( i = 0; i < this._listMyAppointmentCalendars.length; i++)
        {
            if (this._listMyAppointmentCalendars[i].getAcID() == acid)
            {
                
                break;
            }
        }
        console.log(this._listMyAppointmentCalendars[i].getAcID());
        return this._listMyAppointmentCalendars[i];
    }
}
