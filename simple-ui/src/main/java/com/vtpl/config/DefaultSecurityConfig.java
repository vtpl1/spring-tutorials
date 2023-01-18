package com.vtpl.config;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@EnableWebSecurity
public class DefaultSecurityConfig {

        @Bean
        WebSecurityCustomizer webSecurityCustomizer() {
                return (web) -> web.ignoring().requestMatchers("/", "/error", "/webjars/**");
        }

        @Bean
        SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
                http.authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated())
                                .exceptionHandling(e -> e.authenticationEntryPoint(
                                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                                .csrf(c -> c.ignoringRequestMatchers("/logout")
                                                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
                                .logout(l -> l
                                                .logoutSuccessUrl("/").permitAll())
                                .oauth2Login();
                // http.authorizeRequests(authorize -> authorize
                // .antMatchers("/", "/error", "/webjars/**").permitAll()
                // .anyRequest().authenticated())
                // .exceptionHandling(e -> e
                // .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                // .csrf(c -> c.ignoringRequestMatchers("/logout")
                // .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
                // .logout(l -> l
                // .logoutSuccessUrl("/").permitAll())
                // .oauth2Login();
                return http.build();
        }
}
