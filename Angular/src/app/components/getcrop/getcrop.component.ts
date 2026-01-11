import { Component, OnInit } from '@angular/core';
import { crop } from 'src/app/models/crop.model';
import { CropService } from 'src/app/services/crop.service';

@Component({
  selector: 'app-getcrop',
  templateUrl: './getcrop.component.html',
  styleUrls: ['./getcrop.component.scss']
})
export class GetcropComponent implements OnInit {
  crops: crop[] = [];
  isLoading = true;

  constructor(private cropService: CropService) {}

  ngOnInit(): void {
    this.loadCrops();
  }

  loadCrops() {
    this.isLoading = true;
    this.cropService.getAllCrops().subscribe({
      next: (data) => {
        this.crops = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching crops', err);
        this.isLoading = false;
      }
    });
  }

  getImageUrl(cropName: string): string {
    // Use Unsplash Source for random images based on keywords
    // Fallback to 'agriculture' if name is missing
    const keyword = cropName ? cropName.split(' ')[0] : 'agriculture';
    return `https://source.unsplash.com/random/400x300/?${keyword},vegetable,fruit`;
  }
}
