package com.cropdeal.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UserDto {
    @NotBlank(message = "Please enter your name")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;

    @NotNull(message = "Password is required")
    private Integer password;

    @NotBlank(message = "Please enter contact number")
    private String contact;

    @NotBlank(message = "Please enter your email id")
    @Email(message = "Please enter a valid email address")
    private String emailId;

    @NotBlank(message = "Please enter your Address")
    private String address;

    private String roles = "";

    private Boolean isSubscribe = false;

    // Constructors
    public UserDto() {
    }

    public UserDto(String name, Integer password, String contact, String emailId, String address, String roles, Boolean isSubscribe) {
        this.name = name;
        this.password = password;
        this.contact = contact;
        this.emailId = emailId;
        this.address = address;
        this.roles = roles;
        this.isSubscribe = isSubscribe;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPassword() {
        return password;
    }

    public void setPassword(Integer password) {
        this.password = password;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
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

    public Boolean getIsSubscribe() {
        return isSubscribe;
    }

    public void setIsSubscribe(Boolean isSubscribe) {
        this.isSubscribe = isSubscribe;
    }
}
