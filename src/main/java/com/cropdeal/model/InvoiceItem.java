package com.cropdeal.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "invoice_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Invoice invoice;

    @NotNull
    @Column(name = "crop_detailid")
    @JsonProperty("crop_detailid")
    private Integer cropDetailid;

    @NotNull
    @Column(name = "quantity")
    private Integer quantity;

    @NotNull
    @Column(name = "price")
    private Integer price;

    @Column(name = "farmerid")
    @JsonProperty("farmerid")
    private Integer farmerid;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "crop_detailid", insertable = false, updatable = false)
    @JsonProperty(value = "crop_Detail", access = JsonProperty.Access.READ_ONLY)
    private CropDetail cropDetail;
}
