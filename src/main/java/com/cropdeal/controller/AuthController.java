package com.cropdeal.controller;

import com.cropdeal.dto.LoginDto;
import com.cropdeal.dto.RegisterDto;
import com.cropdeal.dto.UserDto;
import com.cropdeal.model.User;
import com.cropdeal.service.JwtService;
import com.cropdeal.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/Auth")
@Tag(name = "Auth Controller", description = "APIs for authentication")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Registers a new user with the provided details")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto registerDto) {
        if (registerDto == null) {
            return ResponseEntity.badRequest().body("Invalid request");
        }
        
        // Check if user already exists
        User existingUser = userService.getUserByEmailId(registerDto.getEmail_id());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this email already exists");
        }
        
        // Convert RegisterDto to UserDto
        UserDto userDto = new UserDto();
        userDto.setName(registerDto.getName());
        userDto.setContact(registerDto.getContact());
        userDto.setEmailId(registerDto.getEmail_id());
        userDto.setAddress(registerDto.getAddress());
        userDto.setRoles(registerDto.getRoles());
        
        // Convert password from String to Integer (keeping existing password format)
        // Note: In production, you should hash passwords properly
        try {
            Integer password = Integer.parseInt(registerDto.getPassword());
            userDto.setPassword(password);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Password must be a valid number");
        }
        
        User user = userService.convertDtoToEntity(userDto);
        user = userService.createUser(user);
        
        // Generate JWT token for the newly registered user
        String token = jwtService.generateToken(user.getEmailId(), user.getUserid(), user.getRoles());
        
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticates a user with email and password")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            // Validate request
            if (loginDto == null) {
                return ResponseEntity.badRequest().body("Request body is required");
            }
            
            if (loginDto.getEmailId() == null || loginDto.getEmailId().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            
            if (loginDto.getPassword() == null || loginDto.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Password is required");
            }
            
            // Find user by email
            User user = userService.getUserByEmailId(loginDto.getEmailId().trim());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
            }
            
            // Compare password (keeping existing password format as Integer)
            // Note: In production, use passwordEncoder.matches() for hashed passwords
            String passwordStr = loginDto.getPassword().trim();
            try {
                Integer passwordInt = Integer.parseInt(passwordStr);
                if (!user.getPassword().equals(passwordInt)) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
                }
            } catch (NumberFormatException e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password format");
            }
            
            // Generate JWT token
            String token = jwtService.generateToken(user.getEmailId(), user.getUserid(), user.getRoles());
            
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("token", token);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during login: " + e.getMessage());
        }
    }

    @GetMapping("/GetUserByToken")
    @Operation(summary = "Get user by token", description = "Retrieves user information from JWT token")
    public ResponseEntity<?> getUserByToken(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid authorization header");
        }
        
        String token = authHeader.substring(7);
        
        if (!jwtService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }
        
        try {
            String emailId = jwtService.extractEmailId(token);
            User user = userService.getUserByEmailId(emailId);
            
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }
            
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error processing token");
        }
    }
}
