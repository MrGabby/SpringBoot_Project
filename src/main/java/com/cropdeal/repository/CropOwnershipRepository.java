package com.cropdeal.repository;

import com.cropdeal.model.CropOwnership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropOwnershipRepository extends JpaRepository<CropOwnership, Integer> {
    List<CropOwnership> findByUsername(String username);

    List<CropOwnership> findByCropDetailId(Integer cropDetailId);
}
