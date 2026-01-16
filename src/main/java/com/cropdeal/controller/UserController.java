package com.cropdeal.controller;

import com.cropdeal.dto.UserDto;
import com.cropdeal.model.User;
import com.cropdeal.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/User")
@Tag(name = "User Controller", description = "APIs for managing users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    @Operation(summary = "Create a new user", description = "Creates a new user with the provided details")
    public ResponseEntity<User> postUser(@Valid @RequestBody UserDto userDto) {
        if (userDto == null) {
            return ResponseEntity.badRequest().build();
        }
        User user = userService.convertDtoToEntity(userDto);
        user = userService.createUser(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    @Operation(summary = "Get all users", description = "Retrieves a list of all users")
    public ResponseEntity<List<UserDto>> getUsers() {
        List<User> users = userService.getUsers();
        if (users == null || users.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        List<UserDto> userList = users.stream()
                .map(user -> {
                    UserDto dto = new UserDto();
                    dto.setUserid(user.getUserid());
                    dto.setName(user.getName());
                    dto.setPassword(user.getPassword());
                    dto.setEmailId(user.getEmailId());
                    dto.setContact(user.getContact());
                    dto.setAddress(user.getAddress());
                    dto.setRoles(user.getRoles());
                    dto.setIsSubscribe(user.getIsSubscribe());
                    dto.setIsActive(user.getIsActive());
                    return dto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(userList);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID", description = "Retrieves a user by their ID")
    public ResponseEntity<User> getUser(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user", description = "Deletes a user by their ID")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
