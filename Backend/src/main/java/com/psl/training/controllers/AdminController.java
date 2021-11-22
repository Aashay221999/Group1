package com.psl.training.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.psl.training.entity.User;
import com.psl.training.service.UserService;

@RestController
public class AdminController {

	@Autowired
	UserService serviceU;
	
	@PostMapping("/admin/delete/{userID}")
	public boolean deleteUser(@PathVariable("userID") long userID)
	{
		serviceU.deleteUserById(userID);
		return true;
	}
	
	@GetMapping("/admin/users")
	public List<User> getUsers()
	{
		return serviceU.getAllUsers();
	}
	
}
