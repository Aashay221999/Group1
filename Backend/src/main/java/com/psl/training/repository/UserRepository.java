package com.psl.training.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.psl.training.entity.User;

@Repository
public interface UserRepository  extends JpaRepository< User, Long> {

	public User findByUsername(String userName);
	
}
