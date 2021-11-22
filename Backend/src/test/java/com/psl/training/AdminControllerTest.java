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
import com.psl.training.controllers.AdminController;


@RunWith(SpringRunner.class)
@SpringBootTest(properties = "spring.main.lazy-initialization=true",classes= {com.psl.training.config.GabsApplication.class})
@AutoConfigureMockMvc
public class AdminControllerTest {
	

	
	@Autowired
	AdminController controller;
	
	
	@Autowired
	private MockMvc mockmvc;
	
	@BeforeEach
	public void setUp() {
		this.mockmvc=MockMvcBuilders.standaloneSetup(controller).build();
	}
	
	@Test
	public void testGetUsers() throws Exception {

		
		MvcResult result = mockmvc.perform( get( "/admin/users" ))
        .andReturn();
	    String string = result.getResponse().getContentType();
	    //assertEquals(string,"[{\"userID\":1,\"userName\":\"vcm848\",\"mobileNumber\":\"899989\",\"DoB\":\"1999-02-14\",\"email\":\"valen@gmail.com\",\"isAdmin\":true,\"password\":\"abc12345\",\"appointmentEntries\"}]");
		assertEquals(string,"application/json");
	}

	
	

}
