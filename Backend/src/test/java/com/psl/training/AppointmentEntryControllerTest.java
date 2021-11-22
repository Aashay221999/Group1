package com.psl.training;

import static org.junit.Assert.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.psl.training.entity.AppointmentCalendar;
import com.psl.training.entity.AppointmentEntry;
import com.psl.training.service.AppointmentEntryService;
import com.psl.training.service.UserService;

@RunWith(SpringRunner.class)
//@SpringBootTest(classes= {AppointmentCalendarController.class})
@SpringBootTest(properties = "spring.main.lazy-initialization=true",classes= {com.psl.training.config.GabsApplication.class})
@AutoConfigureMockMvc
public class AppointmentEntryControllerTest {
	
	AppointmentEntry e1=new AppointmentEntry();
	
	@MockBean
	AppointmentEntryService serviceAE;
	
	@MockBean
	UserService serviceU;
	
	@Autowired
	private MockMvc mockmvc;
	
	@Test
	public void testInsertAppointmentEntry() throws Exception {
		
		
		AppointmentCalendar c1=new  AppointmentCalendar();
		

		ObjectMapper mapper= new ObjectMapper();
		String appJson=mapper.writeValueAsString(c1);
		
		MockHttpServletRequestBuilder req=MockMvcRequestBuilders.post("/book/1/1/createaeform")
		.contentType(MediaType.APPLICATION_JSON)
		.content(appJson);
		
		ResultActions perform=mockmvc.perform(req);
		MvcResult andReturn=perform.andReturn();
		
		MockHttpServletResponse response=andReturn.getResponse();
		int status=response.getStatus();
		assertEquals(200,status);
		
		
	}
	

	

}
