package com.cropdeal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    private Integer userid;

    @Column(name = "name")
    private String name;

    @NotBlank(message = "Please enter contact number")
    @Column(name = "contact")
    private String contact;

    @Column(name = "roles")
    private String roles = "";

    @Email(message = "Please enter a valid email address")
    @Column(name = "email_id")
    private String emailId;

    @NotNull(message = "Password is required")
    @Column(name = "password")
    private Integer password;

    @NotBlank(message = "Please enter your Address")
    @Column(name = "address")
    private String address;

    @Column(name = "is_subscribe")
    private Boolean isSubscribe = false;

    @Column(name = "is_active")
    private Boolean isActive = false;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Crop> crops;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Invoice> invoices;

    // Constructors
    public User() {
    }

    public User(Integer userid, String name, String contact, String roles, String emailId, Integer password, String address, Boolean isSubscribe, Boolean isActive, List<Crop> crops, List<Invoice> invoices) {
        this.userid = userid;
        this.name = name;
        this.contact = contact;
        this.roles = roles;
        this.emailId = emailId;
        this.password = password;
        this.address = address;
        this.isSubscribe = isSubscribe;
        this.isActive = isActive;
        this.crops = crops;
        this.invoices = invoices;
    }

    // Getters and Setters
    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

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

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public Integer getPassword() {
        return password;
    }

    public void setPassword(Integer password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean getIsSubscribe() {
        return isSubscribe;
    }

    public void setIsSubscribe(Boolean isSubscribe) {
        this.isSubscribe = isSubscribe;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public List<Crop> getCrops() {
        return crops;
    }

    public void setCrops(List<Crop> crops) {
        this.crops = crops;
    }

    public List<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(List<Invoice> invoices) {
        this.invoices = invoices;
    }
}
