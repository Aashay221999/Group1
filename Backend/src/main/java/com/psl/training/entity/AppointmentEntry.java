package com.psl.training.entity;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Column;
import javax.persistence.Entity;



@Entity
@Table(name = "Appointment_Entries", uniqueConstraints = {@UniqueConstraint(columnNames = {"aeID"})})
public class AppointmentEntry implements Serializable {
	
	@Id
	@Column(nullable = false)
	private long aeID;
	
	@JsonBackReference(value="myacae")
	@ManyToOne
	@JoinColumn(name="acID", nullable=false)
	private AppointmentCalendar appointmentCalendar;
	
	@Column(name = "acID", insertable = false, updatable=false, nullable = false)
	private Long appointmentCalendarID;
	
	@JsonBackReference(value="myOwnedAe")
	@ManyToOne
	@JoinColumn(name="owner_name", nullable=false, insertable=true, updatable=false, referencedColumnName="username")
	private User owner;

	@Column(name = "owner_name", insertable = false, updatable=false, nullable = false)
	private String ownerid;
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	@Column(nullable = false)
	private LocalDate date;
	
	@Column(nullable = false)
	private Boolean isApproved;
	
	@Column(nullable = false)
	private long timeSlot;
	
	@JsonBackReference(value="myBookedAe")
	@ManyToOne
	@JoinColumn(name="apointee_name", nullable=false, referencedColumnName="username")
	private User appointee;
	
	@Column(name = "apointee_name", insertable = false, updatable=false, nullable = false)
	private String apointeeid;

	@Column(nullable = false)
	private String description;

	public AppointmentEntry()
	{
		
	}
	
	public AppointmentEntry(long aeID, AppointmentCalendar appointmentCalendar, User owner, LocalDate date,
			Boolean isApproved, long timeSlot, User appointee, String description) {
		super();
		this.aeID = aeID;
		this.appointmentCalendar = appointmentCalendar;
		this.owner = owner;
		this.date = date;
		this.isApproved = isApproved;
		this.timeSlot = timeSlot;
		this.appointee = appointee;
		this.description = description;
	}

	public Long getAppointmentCalendarID() {
		return appointmentCalendarID;
	}

	public void setAppointmentCalendarID(Long appointmentCalendarID) {
		this.appointmentCalendarID = appointmentCalendarID;
	}
	
	public String getOwnerid() {
		return ownerid;
	}

	public void setOwnerid(String ownerid) {
		this.ownerid = ownerid;
	}

	public String getApointeeid() {
		return apointeeid;
	}

	public void setApointeeid(String apointeeid) {
		this.apointeeid = apointeeid;
	}
	
	public long getAeID() {
		return aeID;
	}

	public void setAeID(long aeID) {
		this.aeID = aeID;
	}

	public AppointmentCalendar getAppointmentCalendar() {
		return appointmentCalendar;
	}

	public void setAppointmentCalendar(AppointmentCalendar appointmentCalendar) {
		this.appointmentCalendar = appointmentCalendar;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Boolean getIsApproved() {
		return isApproved;
	}

	public void setIsApproved(Boolean isApproved) {
		this.isApproved = isApproved;
	}

	public long getTimeSlot() {
		return timeSlot;
	}

	public void setTimeSlot(long timeSlot) {
		this.timeSlot = timeSlot;
	}

	public User getAppointee() {
		return appointee;
	}

	public void setAppointee(User appointee) {
		this.appointee = appointee;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	

}
