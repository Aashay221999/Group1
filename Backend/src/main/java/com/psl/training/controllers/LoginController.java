package com.psl.training.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.psl.training.entity.User;
import com.psl.training.service.UserService;

@RestController
public class LoginController {
	
	@Autowired
	UserService serviceU;


	@PostMapping("/login")
	public boolean auhtenticateUser (@RequestBody Map<String, String> payload) throws Exception{ 
		String userName = payload.get("userName");
		String password = payload.get("password"); 
		User owner= serviceU.findByUserName(userName) ;
		if(owner.getPassword()==password) 
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}
