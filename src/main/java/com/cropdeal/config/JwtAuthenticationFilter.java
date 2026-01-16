package com.cropdeal.config;

import com.cropdeal.service.JwtService;
import com.cropdeal.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        String token = null;
        String emailId = null;

        System.out.println("JwtAuthFilter: Processing request: " + request.getRequestURI());
        System.out.println("JwtAuthFilter: Authorization Header: " + authHeader);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                emailId = jwtService.extractEmailId(token);
                System.out.println("JwtAuthFilter: Extracted Email: " + emailId);
            } catch (Exception e) {
                System.out.println("JwtAuthFilter: Token extraction failed: " + e.getMessage());
            }
        } else {
            System.out.println("JwtAuthFilter: No valid Bearer token found.");
        }

        if (emailId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtService.validateToken(token)) {
                var user = userService.getUserByEmailId(emailId);
                if (user != null) {
                    // Extract roles and create authorities
                    // Assuming roles are stored as a comma-separated string, e.g., "Farmer,Admin"
                    // or just "Farmer"
                    String roles = user.getRoles();
                    java.util.List<org.springframework.security.core.authority.SimpleGrantedAuthority> authorities = new java.util.ArrayList<>();

                    if (roles != null && !roles.isEmpty()) {
                        String[] roleArray = roles.split(",");
                        for (String role : roleArray) {
                            authorities.add(new org.springframework.security.core.authority.SimpleGrantedAuthority(
                                    role.trim()));
                        }
                    }

                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            user, null, authorities); // Pass authorities here
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
