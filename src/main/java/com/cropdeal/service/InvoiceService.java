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
        com.cropdeal.model.User farmer = userRepository.findByEmailId(username);
        if (farmer != null) {
            return invoiceRepository.findByFarmeridInItems(farmer.getUserid());
        }
        return java.util.Collections.emptyList();
    }

    public List<Invoice> getInvoicesForDealer(String username) {
        com.cropdeal.model.User dealer = userRepository.findByEmailId(username);
        if (dealer != null) {
            return invoiceRepository.findByDealerid(dealer.getUserid());
        }
        return java.util.Collections.emptyList();
    }

    public Invoice createInvoice(Invoice invoice) {
        invoice.setDateCreated(LocalDateTime.now());
        if (invoice.getStatus() == null) {
            invoice.setStatus("Paid");
        }

        // Populate dealerid (the buyer)
        if (invoice.getDealerid() == null) {
            invoice.setDealerid(invoice.getUserid());
        }

        double totalAmount = 0;
        int totalItems = 0;

        if (invoice.getItems() != null) {
            for (com.cropdeal.model.InvoiceItem item : invoice.getItems()) {
                item.setInvoice(invoice); // Set parent reference
                // Resolve farmerid for each item
                if (item.getCropDetailid() != null) {
                    List<com.cropdeal.model.CropOwnership> ownerships = cropOwnershipRepository
                            .findByCropDetailId(item.getCropDetailid());
                    if (!ownerships.isEmpty()) {
                        String farmerUsername = ownerships.get(0).getUsername();
                        com.cropdeal.model.User farmer = userRepository.findByEmailId(farmerUsername);
                        if (farmer != null) {
                            item.setFarmerid(farmer.getUserid());
                        }
                    }
                }
                // Calculate item subtotal if not present
                if (item.getPrice() != null && item.getQuantity() != null) {
                    totalAmount += (double) item.getPrice() * item.getQuantity();
                    totalItems += item.getQuantity();
                }
            }
        }

        invoice.setTotalAmount(totalAmount);
        invoice.setTotalItems(totalItems);

        return invoiceRepository.save(invoice);
    }

}
