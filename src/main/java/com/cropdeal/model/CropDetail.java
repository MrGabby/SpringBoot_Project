package com.cropdeal.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "crop_details")
public class CropDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crop_detailid")
    @JsonProperty("cropDetailid")
    private Integer cropDetailid;

    @NotNull
    @Column(name = "crop_name")
    @JsonProperty("crop_name")
    private String cropName;

    @Column(name = "crop_family")
    @JsonProperty("crop_family")
    private String cropFamily;

    @NotNull
    @Column(name = "crop_detail_description")
    @JsonProperty("cropDetail_description")
    private String cropDetailDescription;

    @NotNull
    @Column(name = "crop_type")
    @JsonProperty("crop_type")
    private String cropType;

    @NotNull
    @Column(name = "quantity")
    @JsonProperty("quantity")
    private Integer quantity;

    @NotNull
    @Column(name = "price")
    @JsonProperty("price")
    private Integer price;

    @NotNull
    @Column(name = "location")
    @JsonProperty("location")
    private String location;

    @Column(name = "image_url")
    @JsonProperty("imageUrl")
    private String imageUrl;

    // Constructors
    public CropDetail() {
    }

    public CropDetail(Integer cropDetailid, String cropName, String cropFamily, String cropDetailDescription,
            String cropType,
            Integer quantity, Integer price, String location) {
        this.cropDetailid = cropDetailid;
        this.cropName = cropName;
        this.cropFamily = cropFamily;
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

    public String getCropFamily() {
        return cropFamily;
    }

    public void setCropFamily(String cropFamily) {
        this.cropFamily = cropFamily;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
