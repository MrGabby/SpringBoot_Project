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

    @Autowired
    private com.cropdeal.repository.CropRepository cropRepository;

    @Autowired
    private com.cropdeal.repository.UserRepository userRepository;

    @Autowired
    private com.cropdeal.repository.CropOwnershipRepository cropOwnershipRepository;

    private final java.nio.file.Path rootLocation = java.nio.file.Paths.get("uploads");

    public List<CropDetail> getAllCropDetails() {
        return cropDetailRepository.findAll();
    }

    public CropDetail getCropDetailById(Integer id) {
        return cropDetailRepository.findById(id).orElse(null);
    }

    public CropDetail createCropDetail(CropDetail cropDetail, org.springframework.web.multipart.MultipartFile image,
            String username) {
        try {
            if (image != null && !image.isEmpty()) {
                if (!java.nio.file.Files.exists(rootLocation)) {
                    java.nio.file.Files.createDirectories(rootLocation);
                }
                String filename = java.util.UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                java.nio.file.Files.copy(image.getInputStream(), rootLocation.resolve(filename));
                cropDetail.setImageUrl("/images/" + filename);
            }
        } catch (java.io.IOException e) {
            throw new RuntimeException("Failed to store file " + e.getMessage());
        }

        CropDetail savedCropDetail = cropDetailRepository.save(cropDetail);

        if (username != null) {
            // Save ownership mapping
            com.cropdeal.model.CropOwnership ownership = new com.cropdeal.model.CropOwnership();
            ownership.setUsername(username);
            ownership.setCropDetailId(savedCropDetail.getCropDetailid());
            cropOwnershipRepository.save(ownership);

            // Sync with crops table
            com.cropdeal.model.User user = userRepository.findByEmailId(username);
            if (user != null) {
                com.cropdeal.model.Crop crop = new com.cropdeal.model.Crop();
                crop.setCropName(savedCropDetail.getCropName());
                crop.setCropImage(savedCropDetail.getImageUrl());
                crop.setCropDetailid(savedCropDetail.getCropDetailid());
                crop.setUserid(user.getUserid());
                cropRepository.save(crop);
            }
        }

        return savedCropDetail;
    }

    public CropDetail createCropDetail(CropDetail cropDetail) {
        return cropDetailRepository.save(cropDetail);
    }

    public CropDetail updateCropDetail(Integer id, CropDetail cropDetail,
            org.springframework.web.multipart.MultipartFile image) {
        Optional<CropDetail> existingOptional = cropDetailRepository.findById(id);
        if (existingOptional.isPresent()) {
            CropDetail existing = existingOptional.get();

            // Handle image update if provided
            if (image != null && !image.isEmpty()) {
                try {
                    String filename = java.util.UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                    java.nio.file.Files.copy(image.getInputStream(), rootLocation.resolve(filename));
                    cropDetail.setImageUrl("/images/" + filename);
                } catch (java.io.IOException e) {
                    throw new RuntimeException("Failed to store file " + e.getMessage());
                }
            } else {
                cropDetail.setImageUrl(existing.getImageUrl());
            }

            cropDetail.setCropDetailid(id);
            CropDetail updatedCropDetail = cropDetailRepository.save(cropDetail);

            // Sync with crops table
            List<com.cropdeal.model.Crop> matchingCrops = cropRepository.findAll(); // Simple approach, filter manually
            for (com.cropdeal.model.Crop c : matchingCrops) {
                if (updatedCropDetail.getCropDetailid().equals(c.getCropDetailid())) {
                    c.setCropName(updatedCropDetail.getCropName());
                    c.setCropImage(updatedCropDetail.getImageUrl());
                    cropRepository.save(c);
                }
            }

            return updatedCropDetail;
        }
        return null;
    }

    public CropDetail updateCropDetail(Integer id, CropDetail cropDetail) {
        return updateCropDetail(id, cropDetail, null);
    }

    public void deleteCropDetail(Integer id) {
        // Sync delete
        List<com.cropdeal.model.Crop> matchingCrops = cropRepository.findAll();
        for (com.cropdeal.model.Crop c : matchingCrops) {
            if (id.equals(c.getCropDetailid())) {
                cropRepository.delete(c);
            }
        }
        cropDetailRepository.deleteById(id);
    }

    public boolean cropDetailExists(Integer id) {
        return cropDetailRepository.existsById(id);
    }
}
