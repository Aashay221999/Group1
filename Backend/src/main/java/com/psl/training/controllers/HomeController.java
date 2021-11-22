package com.psl.training.controllers;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.psl.training.entity.AppointmentEntry;
import com.psl.training.entity.User;
import com.psl.training.service.AppointmentEntryService;
import com.psl.training.service.UserService;

@RestController
public class HomeController {
	
	
	@Autowired
	AppointmentEntryService serviceAE;
	
	@GetMapping("/home/{userID}")
	public List<AppointmentEntry> getAppointmentEntryByOwner(@PathVariable("userID") long userID){
	
		return serviceAE.getAppointmentEntryByOwner(userID);
	}
}
	
