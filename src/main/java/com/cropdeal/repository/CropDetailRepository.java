package com.cropdeal.repository;

import com.cropdeal.model.CropDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CropDetailRepository extends JpaRepository<CropDetail, Integer> {
}
