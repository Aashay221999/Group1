package com.psl.training.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.psl.training.entity.AppointmentCalendar;
import com.psl.training.entity.User;
import com.psl.training.repository.AppointmentCalendarRepository;
import com.psl.training.repository.UserRepository;

@Service
public class AppointmentCalendarService {

	@Autowired
	AppointmentCalendarRepository repositoryAC;
	
	@Autowired
	UserRepository repositoryU;
	
	public void insertAppointmentCalendar(AppointmentCalendar object)
	{
		repositoryAC.save(object);
	}
	
	public void updateAppointmentCalendar(AppointmentCalendar object)
	{
		repositoryAC.save(object);
	}
	
	public void deleteAppointmentCalendarById(long acID)
	{
		repositoryAC.deleteById(acID);
	}
	
	public AppointmentCalendar getAppointmentCalendarById(long acID)
	{
		//return new object which is not found
		return repositoryAC.findById(acID).orElseThrow(IllegalArgumentException::new);
	}
	
	public List<AppointmentCalendar> getAppointmentCalendarByUserID(long UserID ) {
		User owner = repositoryU.getById(UserID);
		return repositoryAC.findByOwner(owner);
	}
	
	public List<AppointmentCalendar> getAppointmentCalendarByType (String type ) {
		return repositoryAC.findByType(type);
	}
	
	public List<AppointmentCalendar> getAppointmentCalendarByLocation (String location ) {
		return repositoryAC.findByLocation(location);
	}
	
	public List<AppointmentCalendar> getAppointmentCalendarByUserName (String  userName ) {
		User owner = repositoryU.findByUsername(userName);
		return repositoryAC.findByOwner(owner);
	}
	
	public List<AppointmentCalendar> getAll()
	{
		return repositoryAC.findAll();
	}
	
}
