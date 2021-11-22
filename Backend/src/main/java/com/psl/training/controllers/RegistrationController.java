package com.psl.training.controllers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.psl.training.entity.User;
import com.psl.training.service.UserService;

@RestController
public class RegistrationController {

	@Autowired
	UserService serviceU;
	
//	@PostMapping(value="/reg/{dateString}")
//	public boolean insertUser(@RequestBody User user, @PathVariable("dateString") String dateString)
//	{	
//		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//		LocalDate localDate = LocalDate.parse(dateString, formatter);
//		user.setDoB(localDate);
//		serviceU.insertUser(user);
//		return true;
//	}
}

