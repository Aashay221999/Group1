package com.psl.training.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.psl.training.entity.User;
import com.psl.training.repository.UserRepository;


@Service
public class UserService {

	@Autowired
	UserRepository repositoryU;
	
	
	public void insertUser(User user) {
		repositoryU.save(user);
		
	}
	
	public void updateUser(User user) {
		repositoryU.save(user);
		
	}
	
	public void deleteUserById(long userID)
	{
		repositoryU.deleteById(userID);
	}
	
	public List<User> getAllUsers(){
		return repositoryU.findAll();
	}

	public User findByUserName(String userName)
	{
		return repositoryU.findByUsername(userName);
	}
	
	public User findByUserID(long userID)
	{
		return repositoryU.findById(userID).orElseThrow(IllegalArgumentException::new);
	}

	
}


