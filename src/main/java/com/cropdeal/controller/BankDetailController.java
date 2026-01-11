package com.cropdeal.controller;

import com.cropdeal.model.BankDetail;
import com.cropdeal.service.BankDetailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Bank_detail")
@Tag(name = "Bank Detail Controller", description = "APIs for managing bank details")
public class BankDetailController {

    @Autowired
    private BankDetailService bankDetailService;

    @GetMapping
    @Operation(summary = "Get all bank details", description = "Retrieves a list of all bank details")
    public ResponseEntity<List<BankDetail>> getBankDetails() {
        List<BankDetail> bankDetails = bankDetailService.getAllBankDetails();
        if (bankDetails == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(bankDetails);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get bank detail by ID", description = "Retrieves a bank detail by its ID")
    public ResponseEntity<BankDetail> getBankDetail(@PathVariable Integer id) {
        BankDetail bankDetail = bankDetailService.getBankDetailById(id);
        if (bankDetail == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(bankDetail);
    }

    @PostMapping
    @Operation(summary = "Create bank detail", description = "Creates a new bank detail")
    public ResponseEntity<BankDetail> postBankDetail(@RequestBody BankDetail bankDetail) {
        if (bankDetail == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        BankDetail created = bankDetailService.createBankDetail(bankDetail);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete bank detail", description = "Deletes a bank detail by its ID")
    public ResponseEntity<Void> deleteBankDetail(@PathVariable Integer id) {
        BankDetail bankDetail = bankDetailService.getBankDetailById(id);
        if (bankDetail == null) {
            return ResponseEntity.notFound().build();
        }
        bankDetailService.deleteBankDetail(id);
        return ResponseEntity.noContent().build();
    }
}
