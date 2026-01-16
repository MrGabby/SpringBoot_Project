package com.cropdeal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @Column(name = "total_amount")
    @JsonProperty("total_amount")
    private Double totalAmount;

    @NotNull
    @Column(name = "total_items")
    @JsonProperty("total_items")
    private Integer totalItems;

    @NotNull
    @Column(name = "payment_mode")
    @JsonProperty("payment_mode")
    private String paymentMode;

    @NotNull
    @Column(name = "status")
    private String status;

    @NotNull
    @Column(name = "date_created")
    @JsonProperty("date_created")
    private LocalDateTime dateCreated;

    @Column(name = "userid")
    private Integer userid;

    @Column(name = "farmerid")
    @JsonProperty("farmerid")
    private Integer farmerid;

    @Column(name = "dealerid")
    @JsonProperty("dealerid")
    private Integer dealerid;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "invoice")
    private java.util.List<InvoiceItem> items;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", insertable = false, updatable = false)
    @JsonIgnore
    private User user;
}
