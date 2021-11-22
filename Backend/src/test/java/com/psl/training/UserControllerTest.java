package com.psl.training;


import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.psl.training.entity.User;
import com.psl.training.service.UserService;


@RunWith(SpringRunner.class)
@SpringBootTest(properties = "spring.main.lazy-initialization=true",classes= {com.psl.training.config.GabsApplication.class})
@AutoConfigureMockMvc

public class UserControllerTest {
	


	@MockBean
	UserService serviceU;

	@Autowired
	private MockMvc mockmvc;	
	
	


	
	
	@Test
	public void testgetUserDetails() throws Exception {
		User l =null ;
		when(serviceU.findByUserID(1)).thenReturn(l);
		
		MockHttpServletRequestBuilder req=MockMvcRequestBuilders.get("/user/1");
		ResultActions perform=mockmvc.perform(req).andDo(print());
		
		MvcResult mvcResult=perform.andReturn();
		MockHttpServletResponse response=mvcResult.getResponse();
		int status=response.getStatus();
		assertEquals(200,status);
			
	}


	
	
	@Test
	public void testgetUserDetailsByName() throws Exception {
		
       
		User l =null ;
		when(serviceU.findByUserName("Anuja")).thenReturn(l);
		
		MockHttpServletRequestBuilder req=MockMvcRequestBuilders.get("/users/Anuja");
		ResultActions perform=mockmvc.perform(req).andDo(print());
		
		MvcResult mvcResult=perform.andReturn();
		MockHttpServletResponse response=mvcResult.getResponse();
		int status=response.getStatus();
		assertEquals(200,status);
		
		
			
	}	

}
