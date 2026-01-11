package com.cropdeal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "crop_details")
public class CropDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crop_detailid")
    private Integer cropDetailid;

    @NotNull
    @Column(name = "crop_name")
    private String cropName;

    @NotNull
    @Column(name = "crop_detail_description")
    private String cropDetailDescription;

    @NotNull
    @Column(name = "crop_type")
    private String cropType;

    @NotNull
    @Column(name = "quantity")
    private Integer quantity;

    @NotNull
    @Column(name = "price")
    private Integer price;

    @NotNull
    @Column(name = "location")
    private String location;

    // Constructors
    public CropDetail() {
    }

    public CropDetail(Integer cropDetailid, String cropName, String cropDetailDescription, String cropType, Integer quantity, Integer price, String location) {
        this.cropDetailid = cropDetailid;
        this.cropName = cropName;
        this.cropDetailDescription = cropDetailDescription;
        this.cropType = cropType;
        this.quantity = quantity;
        this.price = price;
        this.location = location;
    }

    // Getters and Setters
    public Integer getCropDetailid() {
        return cropDetailid;
    }

    public void setCropDetailid(Integer cropDetailid) {
        this.cropDetailid = cropDetailid;
    }

    public String getCropName() {
        return cropName;
    }

    public void setCropName(String cropName) {
        this.cropName = cropName;
    }

    public String getCropDetailDescription() {
        return cropDetailDescription;
    }

    public void setCropDetailDescription(String cropDetailDescription) {
        this.cropDetailDescription = cropDetailDescription;
    }

    public String getCropType() {
        return cropType;
    }

    public void setCropType(String cropType) {
        this.cropType = cropType;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
