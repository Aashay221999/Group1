package com.psl.training.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.psl.training"})
@EntityScan(basePackages = {"com.psl.training"})
@ComponentScan(basePackages = {"com.psl.training"})
@EnableJpaRepositories(basePackages = {"com.psl.training"})
@EnableConfigurationProperties
public class GabsApplication {

	public static void main(String[] args) {
		SpringApplication.run(GabsApplication.class, args);
	}

}
