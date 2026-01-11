package com.cropdeal.repository;

import com.cropdeal.model.BankDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankDetailRepository extends JpaRepository<BankDetail, Integer> {
}
