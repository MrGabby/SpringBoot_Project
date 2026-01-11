package com.cropdeal.service;

import com.cropdeal.model.BankDetail;
import com.cropdeal.repository.BankDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankDetailService {
    @Autowired
    private BankDetailRepository bankDetailRepository;

    public List<BankDetail> getAllBankDetails() {
        return bankDetailRepository.findAll();
    }

    public BankDetail getBankDetailById(Integer id) {
        return bankDetailRepository.findById(id).orElse(null);
    }

    public BankDetail createBankDetail(BankDetail bankDetail) {
        return bankDetailRepository.save(bankDetail);
    }

    public void deleteBankDetail(Integer id) {
        bankDetailRepository.deleteById(id);
    }
}
