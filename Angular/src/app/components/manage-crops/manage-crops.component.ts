import { Component, OnInit } from '@angular/core';
import { crop } from 'src/app/models/crop.model';
import { CropService } from 'src/app/services/crop.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-manage-crops',
    templateUrl: './manage-crops.component.html',
    styleUrls: ['./manage-crops.component.scss']
})
export class ManageCropsComponent implements OnInit {
    crops: crop[] = [];
    categories: string[] = ['Fruits', 'Vegetables', 'Pulses', 'Grains', 'Others'];
    groupedCrops: { [key: string]: crop[] } = {};
    isLoading = true;

    constructor(private cropService: CropService, private router: Router) { }

    ngOnInit(): void {
        this.loadCrops();
    }

    loadCrops() {
        this.isLoading = true;
        this.cropService.getAllCrops().subscribe({
            next: (data) => {
                this.crops = data;
                this.groupCrops();
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    groupCrops() {
        this.groupedCrops = {};
        this.categories.forEach(cat => this.groupedCrops[cat] = []);

        this.crops.forEach(c => {
            const cat = c.crop_type || 'Others';
            if (this.groupedCrops[cat]) {
                this.groupedCrops[cat].push(c);
            } else {
                if (!this.groupedCrops['Others']) this.groupedCrops['Others'] = [];
                this.groupedCrops['Others'].push(c);
            }
        });
    }

    editCrop(id: number) {
        this.router.navigate(['/Farmer/EditCrop', id]);
    }

    deleteCrop(id: number) {
        if (confirm('Are you sure you want to delete this crop?')) {
            this.cropService.deleteCrop(id).subscribe({
                next: () => {
                    this.loadCrops();
                },
                error: (err) => console.error(err)
            });
        }
    }

    getImageUrl(crop: crop): string {
        if (crop.imageUrl) {
            return `http://localhost:8080${crop.imageUrl}`;
        }
        return 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80';
    }
}
