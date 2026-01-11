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
    public ResponseEntity<Void> putCropDetail(@PathVariable Integer id, @RequestBody CropDetail cropDetail) {
        if (id != cropDetail.getCropDetailid()) {
            return ResponseEntity.badRequest().build();
        }

        CropDetail updated = cropDetailService.updateCropDetail(id, cropDetail);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @PostMapping
    @Operation(summary = "Create crop detail", description = "Creates a new crop detail")
    public ResponseEntity<CropDetail> postCropDetail(@RequestBody CropDetail cropDetail) {
        if (cropDetail == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        CropDetail created = cropDetailService.createCropDetail(cropDetail);
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
