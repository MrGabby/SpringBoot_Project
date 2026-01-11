package com.cropdeal.service;

import com.cropdeal.model.CropDetail;
import com.cropdeal.repository.CropDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CropDetailService {
    @Autowired
    private CropDetailRepository cropDetailRepository;

    public List<CropDetail> getAllCropDetails() {
        return cropDetailRepository.findAll();
    }

    public CropDetail getCropDetailById(Integer id) {
        return cropDetailRepository.findById(id).orElse(null);
    }

    public CropDetail createCropDetail(CropDetail cropDetail) {
        return cropDetailRepository.save(cropDetail);
    }

    public CropDetail updateCropDetail(Integer id, CropDetail cropDetail) {
        Optional<CropDetail> existingCropDetail = cropDetailRepository.findById(id);
        if (existingCropDetail.isPresent()) {
            cropDetail.setCropDetailid(id);
            return cropDetailRepository.save(cropDetail);
        }
        return null;
    }

    public void deleteCropDetail(Integer id) {
        cropDetailRepository.deleteById(id);
    }

    public boolean cropDetailExists(Integer id) {
        return cropDetailRepository.existsById(id);
    }
}
