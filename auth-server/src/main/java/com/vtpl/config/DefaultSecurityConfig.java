package com.vtpl.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@Configuration(proxyBeanMethods = false)
public class DefaultSecurityConfig {

	// @formatter:off
	@Bean
	SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
		// http
		// 	.authorizeHttpRequests(authorize ->
		// 		authorize.requestMatchers("/login/").permitAll()
		// 		.anyRequest().authenticated()
		// 	)
		// 	.formLogin().loginPage("/login");
		http.authorizeHttpRequests().anyRequest().permitAll();
		return http.build();
	}
	// @formatter:on

	// @formatter:off
	@Bean
	UserDetailsService users() {
		UserDetails user = User.withUsername("user1")
				.password(passwordEncoder().encode("password"))
				.roles("USER")
				.build();
		return new InMemoryUserDetailsManager(user);
	}
	// @formatter:on

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
