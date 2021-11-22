package com.psl.training.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.psl.training.entity.AppointmentCalendar;
import com.psl.training.entity.User;
import com.psl.training.service.UserService;

@RestController
public class UserController {

	@Autowired
	UserService serviceU;
	
	
	@GetMapping("/user/{userID}")
	public User getUserDetails(@PathVariable("userID") long userID)
	{
		return serviceU.findByUserID(userID);
	}
	
	@GetMapping("/users/{userName}")
	public User getUserDetailsByName(@PathVariable("userName") String username)
	{
		return serviceU.findByUserName(username);
	}
	
	
	@PutMapping("/user/{userID}")
	public boolean updateUser(@RequestBody User user)
	{
		serviceU.updateUser(user);
		return true;
	}
	
	@GetMapping("/usernames")
	public List<String> getUsernames()
	{
		List<User> users = serviceU.getAllUsers();
		List<String> usernames = new ArrayList<String>();
		for (User u : users)
		{
			usernames.add(u.getUsername());
		}
		return usernames; 
	}
	@GetMapping("/userids")
	public List<Long> getAppCals()
	{
		List<User> users = serviceU.getAllUsers();
		List<Long> userIDs = new ArrayList<Long>();
		for (User u : users)
		{
			userIDs.add(u.getUserID());
		}
		return userIDs; 
	}
}
