package com.cropdeal.service;

import com.cropdeal.model.Invoice;
import com.cropdeal.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private com.cropdeal.repository.CropOwnershipRepository cropOwnershipRepository;

    @Autowired
    private com.cropdeal.repository.UserRepository userRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public List<Invoice> getInvoicesByUserId(Integer userid) {
        return invoiceRepository.findByUserid(userid);
    }

    public List<Invoice> getInvoicesForFarmer(String username) {
        List<com.cropdeal.model.CropOwnership> ownerships = cropOwnershipRepository.findByUsername(username);
        List<Integer> cropIds = ownerships.stream()
                .map(com.cropdeal.model.CropOwnership::getCropDetailId)
                .toList();

        return invoiceRepository.findAll().stream()
                .filter(invoice -> cropIds.contains(invoice.getCropDetailid()))
                .toList();
    }

    public List<Invoice> getInvoicesForDealer(String username) {
        com.cropdeal.model.User user = userRepository.findByEmailId(username);
        if (user != null) {
            return invoiceRepository.findByUserid(user.getUserid());
        }
        return java.util.Collections.emptyList();
    }

    public Invoice createInvoice(Invoice invoice) {
        invoice.setDateCreated(LocalDateTime.now());
        if (invoice.getStatus() == null) {
            invoice.setStatus("Paid"); // Default to Paid for simplicity since buy operation is immediate
        }
        return invoiceRepository.save(invoice);
    }
}
