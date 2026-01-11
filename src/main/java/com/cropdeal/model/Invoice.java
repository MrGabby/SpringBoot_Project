package com.cropdeal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "invoices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoiceid")
    private Integer invoiceid;

    @NotNull
    @Column(name = "quantity")
    private Integer quantity;

    @NotNull
    @Column(name = "payment_mode")
    private String paymentMode;

    @NotNull
    @Column(name = "status")
    private String status;

    @NotNull
    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @Column(name = "userid")
    private Integer userid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", insertable = false, updatable = false)
    @JsonIgnore
    private User user;

    @Column(name = "crop_detailid")
    private Integer cropDetailid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_detailid", insertable = false, updatable = false)
    @JsonIgnore
    private CropDetail cropDetail;
}
