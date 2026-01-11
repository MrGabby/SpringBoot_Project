package com.cropdeal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "crops")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Crop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cropid")
    private Integer cropid;

    @NotNull
    @Column(name = "crop_name")
    private String cropName;

    @NotNull
    @Column(name = "crop_image")
    private String cropImage;

    @Column(name = "crop_detailid")
    private Integer cropDetailid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_detailid", insertable = false, updatable = false)
    @JsonIgnore
    private CropDetail cropDetail;

    @Column(name = "userid")
    private Integer userid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", insertable = false, updatable = false)
    @JsonIgnore
    private User user;
}
