package com.psl.training.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Users", uniqueConstraints = {@UniqueConstraint(columnNames = {"userID", "userName", "mobileNumber"})})
public class User implements Serializable {
	
		@Id
		@Column(nullable = false)
		private long userID;
		
		@Column(nullable = false)
		private String username;
		
		@Column(nullable = false)
		private String mobileNumber;
		

		@Column(nullable = false)
		private String DoB;
		
		@Column(nullable = false)
		private String email;
		
		@Column(nullable = false)
		private Boolean isAdmin;
		
		@Column(nullable = false)
		private String password; 
		
		@JsonManagedReference(value="myBookedAe")
		//@JsonIgnoreProperties({"owner", "apointee"})
		@OneToMany(mappedBy = "appointee", cascade = CascadeType.REMOVE, orphanRemoval = true)
		private Set<AppointmentEntry> appointmentEntries;
		
		@JsonManagedReference(value="myac")
		//@JsonIgnoreProperties({"owner"})
		@OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE, orphanRemoval = true)
		private Set<AppointmentCalendar> appointmentCalendars;
		
		@JsonManagedReference(value="myOwnedAe")
		@OneToMany(mappedBy = "owner", cascade = CascadeType.REMOVE, orphanRemoval = true)
		private Set<AppointmentEntry> appointmentEntriesOwnedByMe;
		
		public  User() {
			
		}

		public User(long userID, String userName, String mobileNumber, String doB, String email, boolean isAdmin,
				String password, Set<AppointmentEntry> appointmentEntries,
				Set<AppointmentCalendar> appointmentCalendars,Set<AppointmentEntry> appointmentEntriesOwnedByMe) {
			super();
			this.userID = userID;
			this.username = userName;
			this.mobileNumber = mobileNumber;
			this.DoB = doB;
			this.email = email;
			this.isAdmin = isAdmin;
			this.password = password;
			this.appointmentEntries = appointmentEntries;
			this.appointmentEntriesOwnedByMe = appointmentEntriesOwnedByMe;
			this.appointmentCalendars = appointmentCalendars;
		}

		public Set<AppointmentEntry> getAppointmentEntriesOwnedByMe() {
			return appointmentEntriesOwnedByMe;
		}

		public void setAppointmentEntriesOwnedByMe(Set<AppointmentEntry> appointmentEntriesOwnedByMe) {
			this.appointmentEntriesOwnedByMe = appointmentEntriesOwnedByMe;
		}

		public long getUserID() {
			return userID;
		}


		public void setUserID(long userID) {
			this.userID = userID;
		}


		public String getUsername() {
			return username;
		}


		public void setUsername(String userName) {
			this.username = userName;
		}


		public String getMobileNumber() {
			return mobileNumber;
		}


		public void setMobileNumber(String mobileNumber) {
			this.mobileNumber = mobileNumber;
		}


		public String getDoB() {
			return DoB;
		}


		public void setDoB(String doB) {
			DoB = doB;
		}


		public String getEmail() {
			return email;
		}


		public void setEmail(String email) {
			this.email = email;
		}


		public Boolean getIsAdmin() {
			return isAdmin;
		}


		public void setIsAdmin(Boolean isAdmin) {
			this.isAdmin = isAdmin;
		}


		public String getPassword() {
			return password;
		}


		public void setPassword(String password) {
			this.password = password;
		}


		public Set<AppointmentEntry> getAppointmentEntries() {
			return appointmentEntries;
		}


		public void setAppointmentEntries(Set<AppointmentEntry> appointmentEntries) {
			this.appointmentEntries = appointmentEntries;
		}


		public Set<AppointmentCalendar> getAppointmentCalendars() {
			return appointmentCalendars;
		}


		public void setAppointmentCalendars(Set<AppointmentCalendar> appointmentCalendars) {
			this.appointmentCalendars = appointmentCalendars;
		}


		
		
		
		
}

		
   
