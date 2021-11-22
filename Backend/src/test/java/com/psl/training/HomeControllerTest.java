package com.psl.training;


import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.psl.training.controllers.HomeController;



@RunWith(SpringRunner.class)
@SpringBootTest(properties = "spring.main.lazy-initialization=true",classes= {com.psl.training.config.GabsApplication.class})
@AutoConfigureMockMvc

public class HomeControllerTest {
	

	@Autowired
	HomeController controller;
	
	
	@Autowired
	private MockMvc mockmvc;	

	@BeforeEach
	public void setUp() {
		this.mockmvc=MockMvcBuilders.standaloneSetup(controller).build();
	}
	
	@Test
	public void  getAppointmentEntryByOwner() throws Exception{

		
		MvcResult result = mockmvc.perform(get("/home/1" ))
		        .andReturn();
			    String string = result.getResponse().getContentType();
			   // assertEquals(string,"[{\"aeID\":1,\"appointmentCalendarID\":1,\"ownerid\":\"vcm848\",\"date\":\"2021-10-19\",\"isApproved\":false,\"timeSlot\":1,\"apointeeid\":\"vcm848\",\"description\":\"NA\"}]");
				assertEquals(string,"application/json");
		
	}	

}
