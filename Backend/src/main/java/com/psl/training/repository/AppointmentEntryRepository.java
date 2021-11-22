package com.psl.training.repository;

import java.time.LocalDate;
import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.psl.training.entity.AppointmentCalendar;
import com.psl.training.entity.AppointmentEntry;
import com.psl.training.entity.User;


@Repository
public interface AppointmentEntryRepository extends JpaRepository<AppointmentEntry, Long> {
	
	
//	@Query(value = "select * from appointment_entry where userID=?",nativeQuery=true)
//    public List<AppointmentEntry> getAppointmentByApointee(String appointee);
	
	public List<AppointmentEntry> findByOwner(User owner);
	
	public List<AppointmentEntry> findByAppointmentCalendar(AppointmentCalendar appC);
	
	public List<AppointmentEntry> findByAppointee(User apointee);

	@Query(value = "select * from appointment_entries where acID=?1 and is_approved=?2",nativeQuery=true)
    public List<AppointmentEntry> findSpecificAppointmentEntry(long acID, Boolean isApproved);
	
	
//	@Query(value= "select time_slot from appointment_entries where date=?1 and acid=?2 ",nativeQuery=true)
//	public List<Integer> getAppointmentEntryByNameDate(LocalDate date, long acid);
//	
	
	@Query(value= "select time_slot from appointment_entries where date=?1 and acid=?2 ",nativeQuery=true)
	public List<Integer> getAllUnbookedAppointmentOfSpecificDate(LocalDate date, long acid);
	
	
}
