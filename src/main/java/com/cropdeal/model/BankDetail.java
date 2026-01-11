package com.cropdeal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bank_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BankDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bank_detailid")
    private Integer bankDetailid;

    @NotBlank(message = "Please enter your Bank Name")
    @Column(name = "bank_name")
    private String bankName;

    @NotBlank(message = "Please enter your Bank Account number")
    @Column(name = "account_no")
    private String accountNo;

    @NotBlank(message = "Please enter IFSC code")
    @Column(name = "ifsc")
    private String ifsc;

    @Column(name = "userid")
    private Integer userid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", insertable = false, updatable = false)
    @JsonIgnore
    private User user;
}
