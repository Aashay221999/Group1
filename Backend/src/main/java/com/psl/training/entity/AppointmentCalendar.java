package com.psl.training.entity;


import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Appointment_Calendars", uniqueConstraints = {@UniqueConstraint(columnNames = {"acID"})})
public class AppointmentCalendar implements Serializable {

	@Id
	@Column(nullable = false)
	private long acID;
	
	@JsonBackReference(value="myac")
	@ManyToOne
	@JoinColumn(name="owner_name", nullable=false, insertable=true, updatable=false, referencedColumnName="username")
	private User owner;
	
	@Column(name = "owner_name", insertable = false,updatable=false, nullable = false)
	private String ownername;
	
	
	@Column(nullable = false)
	private String type;
	
	@Column(nullable = false)
	private String location;
	
	@Column(nullable = false)
	private String description;

	@JsonManagedReference(value="myacae")
	//@JsonIgnoreProperties({"owner", "apointee", "appointmentCalendar"})
	@OneToMany(mappedBy = "appointmentCalendar", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private Set<AppointmentEntry> listAppointmentEntries;
	
	
	public AppointmentCalendar() {
		// TODO Auto-generated constructor stub
	}


	public AppointmentCalendar(long acID, User owner, String type, String location, String description,
			Set<AppointmentEntry> listAppointmentEntries) {
		super();
		this.acID = acID;
		this.owner = owner;
		this.type = type;
		this.location = location;
		this.description = description;
		this.listAppointmentEntries = listAppointmentEntries;
	}


	public long getAcID() {
		return acID;
	}


	public String getOwnername() {
		return ownername;
	}


	public void setOwnername(String ownername) {
		this.ownername = ownername;
	}


	public void setAcID(long acID) {
		this.acID = acID;
	}


	public User getOwner() {
		return owner;
	}


	public void setOwner(User owner) {
		this.owner = owner;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public Set<AppointmentEntry> getListAppointmentEntries() {
		return listAppointmentEntries;
	}


	public void setListAppointmentEntries(Set<AppointmentEntry> listAppointmentEntries) {
		this.listAppointmentEntries = listAppointmentEntries;
	}
	
	
	
}
