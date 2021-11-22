package com.psl.training.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.psl.training.entity.AppointmentCalendar;
import com.psl.training.entity.AppointmentEntry;
import com.psl.training.entity.User;
import com.psl.training.repository.AppointmentCalendarRepository;
import com.psl.training.repository.AppointmentEntryRepository;
import com.psl.training.repository.UserRepository;

import java.time.LocalDate;
import java.util.*;

@Service
public class AppointmentEntryService {
	
    @Autowired
	AppointmentCalendarRepository repositoryAC;
	@Autowired
	AppointmentEntryRepository repositoryAE ;
	@Autowired
	UserRepository repositoryU ;

	public AppointmentEntry insertAppointmentEntry(AppointmentEntry ae) {
		repositoryAE.save(ae);
		return ae;
	}
	
	
	public void approveAppointmentEntry(AppointmentEntry ae) {
		repositoryAE.save(ae);
		
	}
	public List<AppointmentEntry> getSpecificAppointmentEntry(long acID, Boolean isApproved) {
		
		return repositoryAE.findSpecificAppointmentEntry(acID,isApproved);
	}
	
	

	public List<AppointmentEntry> getAppointmentEntry() { // Checking if everything is working
		return repositoryAE.findAll();
	}
	
	public AppointmentEntry getAppointmentEntryById(long aeID)
	{
		//return new object which is not found
		return repositoryAE.findById(aeID).orElseThrow(IllegalArgumentException::new);
		
	}
	
	public List<AppointmentEntry> getAppointmentEntryByACID(long acID)
	{
		//return new object which is not found
		AppointmentCalendar appC = repositoryAC.getById(acID);
		return repositoryAE.findByAppointmentCalendar(appC);
		
	}
	
	public void deleteAppointmentEntryById(long aeID) {
		repositoryAE.deleteById(aeID);
	}
	
	public List<AppointmentEntry> getAppointmentEntryByApointee(long apointee_id) { // Checking if everything is working
		User apointee = repositoryU.findById(apointee_id).orElseThrow(IllegalArgumentException::new);
		return repositoryAE.findByAppointee(apointee);
	}
	
	public List<AppointmentEntry> getAppointmentEntryByOwner(long owner_id) { // Checking if everything is working
		User owner = repositoryU.findById(owner_id).orElseThrow(IllegalArgumentException::new);
		return repositoryAE.findByOwner(owner);
	}	
	

	public List<Integer> getAllUnbookedAppointment(LocalDate date, long acid)
	{	
		List<Integer> listBookedTimeSlots = repositoryAE.getAllUnbookedAppointmentOfSpecificDate(date, acid);	
		List<Integer> listFreeTimeSlots = new ArrayList<Integer>();
		
		
		for (int i = 0; i < 8; i++) 
		{
			if(!listBookedTimeSlots.contains(i)) 
			{
				listFreeTimeSlots.add(i);
			}
		}
		return listFreeTimeSlots;
	}
		
	
	
	
	public List<AppointmentCalendar> getAllAppointment(String text,String type){
		
		if(type.equals("ByType")) {
			return repositoryAC.findByType(text);
		}
		else if(type.equals("ByLocation")) {
			
			return repositoryAC.findByLocation(text);
		}
		else {
			return null;
		}
	}
	
	public List<AppointmentEntry> getAll()
	{
		return repositoryAE.findAll();
	}
	
	
	
	
	
	
}
