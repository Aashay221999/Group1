package com.psl.training.controllers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.psl.training.entity.AppointmentCalendar;
import com.psl.training.entity.AppointmentEntry;
import com.psl.training.entity.User;
import com.psl.training.service.AppointmentCalendarService;
import com.psl.training.service.AppointmentEntryService;
import com.psl.training.service.UserService;

@RestController
public class BookController {
	
	@Autowired
	AppointmentEntryService serviceAE;
	
	@Autowired
	AppointmentCalendarService serviceAC;
	
	@Autowired
	UserService serviceU;

	@GetMapping("/book/{acid}/{date}")
	public List<Integer> getAllUnbookedAppointment(@PathVariable("acid") long acid,@PathVariable("date") String stringDate){
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate localDate = LocalDate.parse(stringDate, formatter);
		return serviceAE.getAllUnbookedAppointment(localDate, acid);
	}
	
	
	
	@PostMapping("/book/{userID}/{acID}/createaeform/{stringDate}")
	public boolean createAppointment(@RequestBody AppointmentEntry appointmentEntry , @PathVariable("acID") long acID, @PathVariable("userID") long userID, @PathVariable("stringDate") String stringDate){
		AppointmentCalendar appointmentCalendar = serviceAC.getAppointmentCalendarById(acID);
		System.out.println(stringDate);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate localDate = LocalDate.parse(stringDate, formatter);
		
		User appointee = serviceU.findByUserID(userID);
		appointmentEntry.setAppointmentCalendar(appointmentCalendar);
		appointmentEntry.setAppointee(appointee);
		appointmentEntry.setOwner(appointmentCalendar.getOwner());
		appointmentEntry.setDate(localDate);
		System.out.println(localDate);
		System.out.println(appointmentEntry.getTimeSlot());
		serviceAE.insertAppointmentEntry(appointmentEntry);
		
		return true;
	}
	
	@GetMapping("/book/search/{searchText}/{searchCriteria}")
	public List<AppointmentCalendar> getAppointmentCalendarsBySearch(@PathVariable("searchText") String searchText,@PathVariable("searchCriteria") String searchCriteria )
	{

		if (searchCriteria.equals("Location"))
		{
			return serviceAC.getAppointmentCalendarByLocation(searchText);
		}
		if (searchCriteria.equals("Type"))
		{
			return serviceAC.getAppointmentCalendarByType(searchText);
		}
		else 
		{
			return serviceAC.getAppointmentCalendarByUserName(searchText);
		}
	}
}
