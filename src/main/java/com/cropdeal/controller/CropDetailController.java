package com.cropdeal.controller;

import com.cropdeal.model.CropDetail;
import com.cropdeal.service.CropDetailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Crop_detail")
@Tag(name = "Crop Detail Controller", description = "APIs for managing crop details")
public class CropDetailController {

    @Autowired
    private CropDetailService cropDetailService;

    @GetMapping
    @Operation(summary = "Get all crop details", description = "Retrieves a list of all crop details")
    public ResponseEntity<List<CropDetail>> getCropDetails() {
        List<CropDetail> cropDetails = cropDetailService.getAllCropDetails();
        if (cropDetails == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cropDetails);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get crop detail by ID", description = "Retrieves a crop detail by its ID")
    public ResponseEntity<CropDetail> getCropDetail(@PathVariable Integer id) {
        CropDetail cropDetail = cropDetailService.getCropDetailById(id);
        if (cropDetail == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cropDetail);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update crop detail", description = "Updates an existing crop detail")
    public ResponseEntity<CropDetail> putCropDetail(@PathVariable Integer id, @RequestBody CropDetail cropDetail) {
        CropDetail updated = cropDetailService.updateCropDetail(id, cropDetail);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/{id}/update")
    @Operation(summary = "Update crop detail with image", description = "Updates an existing crop detail including optional image")
    public ResponseEntity<CropDetail> updateCropDetail(
            @PathVariable Integer id,
            @RequestPart("cropDetail") String cropDetailJson,
            @RequestPart(value = "image", required = false) org.springframework.web.multipart.MultipartFile image)
            throws com.fasterxml.jackson.core.JsonProcessingException {

        com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
        CropDetail cropDetail = mapper.readValue(cropDetailJson, CropDetail.class);

        CropDetail updated = cropDetailService.updateCropDetail(id, cropDetail, image);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @PostMapping(consumes = { org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE })
    @Operation(summary = "Create crop detail", description = "Creates a new crop detail with image")
    public ResponseEntity<CropDetail> postCropDetail(
            @RequestPart("cropDetail") String cropDetailJson,
            @RequestPart(value = "image", required = false) org.springframework.web.multipart.MultipartFile image,
            java.security.Principal principal) throws com.fasterxml.jackson.core.JsonProcessingException {

        com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
        CropDetail cropDetail = mapper.readValue(cropDetailJson, CropDetail.class);

        if (cropDetail == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        String username = (principal != null) ? principal.getName() : "Anonymous"; // In a real app, principal.getName()
                                                                                   // is the username/email

        // If the principal name is an email (JWT usually has email as subject), we
        // might want to fetch User to get the actual username if needed,
        // but CropOwnership stores 'username'. If your app treats email as username,
        // this is fine.
        // Assuming email is used as username for now as per AuthController login logic.

        CropDetail created = cropDetailService.createCropDetail(cropDetail, image, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete crop detail", description = "Deletes a crop detail by its ID")
    public ResponseEntity<Void> deleteCropDetail(@PathVariable Integer id) {
        if (!cropDetailService.cropDetailExists(id)) {
            return ResponseEntity.notFound().build();
        }
        cropDetailService.deleteCropDetail(id);
        return ResponseEntity.noContent().build();
    }
}
