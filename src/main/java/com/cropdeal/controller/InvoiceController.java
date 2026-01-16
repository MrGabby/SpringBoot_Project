package com.cropdeal.controller;

import com.cropdeal.model.Invoice;
import com.cropdeal.service.InvoiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Invoice")
@Tag(name = "Invoice Controller", description = "APIs for managing invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    @Operation(summary = "Get all invoices", description = "Retrieves a list of invoices based on user role")
    public ResponseEntity<List<Invoice>> getInvoices(java.security.Principal principal) {
        String username = principal.getName();
        // Get roles from authentication context
        org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder
                .getContext().getAuthentication();
        boolean isAdmin = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("Admin"));
        boolean isFarmer = auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("Farmer"));

        if (isAdmin) {
            return ResponseEntity.ok(invoiceService.getAllInvoices());
        } else if (isFarmer) {
            return ResponseEntity.ok(invoiceService.getInvoicesForFarmer(username));
        } else {
            // Default assumes Dealer/User
            return ResponseEntity.ok(invoiceService.getInvoicesForDealer(username));
        }
    }

    @PostMapping
    @Operation(summary = "Create invoice", description = "Creates a new invoice (Buy operation)")
    public ResponseEntity<Invoice> postInvoice(@RequestBody Invoice invoice) {
        if (invoice == null) {
            return ResponseEntity.badRequest().build();
        }
        Invoice created = invoiceService.createInvoice(invoice);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
