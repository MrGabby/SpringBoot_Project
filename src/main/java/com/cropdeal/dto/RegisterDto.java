package com.cropdeal.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterDto {
    @NotBlank(message = "Please enter your name")
    private String name;

    @NotBlank(message = "Please enter contact number")
    private String contact;

    @NotBlank(message = "Please enter your email id")
    @Email(message = "Please enter a valid email address")
    private String email_id;

    @NotBlank(message = "Please enter your Address")
    private String address;

    private String roles = "";

    @NotBlank(message = "Password is required")
    private String password;

    // Constructors
    public RegisterDto() {
    }

    public RegisterDto(String name, String contact, String email_id, String address, String roles, String password) {
        this.name = name;
        this.contact = contact;
        this.email_id = email_id;
        this.address = address;
        this.roles = roles;
        this.password = password;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getEmail_id() {
        return email_id;
    }

    public void setEmail_id(String email_id) {
        this.email_id = email_id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
