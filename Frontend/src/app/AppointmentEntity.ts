
export class AppointmentEntity{
    private _aeID:number;
    private _appointmentCalendarID:number;
    private _ownerid:string;
    private _date:Date;
    private _isApproved:boolean;
    private _timeSlot:number;
    private _apointeeid:string;
    private _description:string;

    constructor(aeID:number,appointmentCalendarID:number, ownerid:string, 
            date:Date, isApproved:boolean, timeSlot:number,
            apointeeid:string, description:string){
        this._aeID = aeID;
        this._appointmentCalendarID = appointmentCalendarID;
        this._ownerid = ownerid;
        this._date = date;
        this._isApproved = isApproved;
        this._timeSlot = timeSlot;
        this._apointeeid = apointeeid;
        this._description = description;
    }   
    
    public getAeID():number {
        return this._aeID;
    }
    public setAeID(aeID:number) {
        this._aeID = aeID;
    }
    public getAppointmentCalendarID():number {
        return this._appointmentCalendarID;
    }
    public setAppointmentCalendarID(appointmentCalendarID:number) {
        this._appointmentCalendarID = appointmentCalendarID;
    }
    public getOwnerid():string {
        return this._ownerid;
    }
    public setOwnerid(ownerid:string) {
        this._ownerid = ownerid;
    }
    public getDate():Date {
        return this._date;
    }
    public setDate(date:Date) {
        this._date = date;
    }
    public getIsApproved():boolean {
        return this._isApproved;
    }
    public setIsApproved(aeID:boolean) {
        this._isApproved = aeID;
    }
    public getTimeSlot():number {
        return this._timeSlot;
    }
    public setTimeSlot(timeSlot:number) {
        this._timeSlot = timeSlot;
    }
    public getTime():string
    {
        if(this._timeSlot == 0)
        {
            return "9 am - 10 am";
        }
        else if(this._timeSlot == 1)
        {
            return "10 am - 11 am";
        }
        else if(this._timeSlot == 2)
        {
            return "11 am - 12 pm";
        }
        else if(this._timeSlot == 3)
        {
            return "12 pm - 1 pm";
        }
        else if(this._timeSlot == 4)
        {
            return "2 pm - 3 pm";
        }
        else if(this._timeSlot == 7)
        {
            return "3 pm - 4 pm";
        }
        else if(this._timeSlot == 5)
        {
            return "4 pm - 5 pm";
        }
        else (this._timeSlot == 6)
        {
            return "5 pm - 6 pm";
        }
    }
    public getAppointeeID():string {
        return this._apointeeid;
    }
    public setAppointeeID(appointeeid:string) {
        this._apointeeid = appointeeid;
    }
    public getDescription():string {
        return this._description;
    }
    public setdescription(description:string) {
        this._description = description;
    }

}
