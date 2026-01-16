import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { crop } from 'src/app/models/crop.model';
import { CropService } from 'src/app/services/crop.service';

@Component({
    selector: 'app-edit-crop',
    templateUrl: './edit-crop.component.html',
    styleUrls: ['./edit-crop.component.scss']
})
export class EditcropComponent implements OnInit {
    id!: number;
    c: crop = {
        crop_name: '',
        crop_family: '',
        crop_type: '',
        cropDetailid: 0,
        quantity: 0,
        price: 0,
        cropDetail_description: '',
        location: ''
    };
    croptype: string[] = ['Fruits', 'Vegetables', 'Pulses', 'Grains', 'Others'];
    selectedFile?: File;
    imagePreview: string | null = null;
    isLoading = true;

    constructor(
        private route: ActivatedRoute,
        private cropService: CropService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.loadCropDetails();
    }

    loadCropDetails() {
        this.cropService.getCropById(this.id).subscribe({
            next: (data) => {
                this.c = data;
                if (this.c.imageUrl) {
                    this.imagePreview = `http://localhost:8080${this.c.imageUrl}`;
                }
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.router.navigate(['/Farmer/ManageCrops']);
            }
        });
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    onSubmit() {
        this.cropService.updateCrop(this.id, this.c, this.selectedFile).subscribe({
            next: (res) => {
                console.log('Update successful', res);
                this.router.navigate(['/Farmer/ManageCrops']);
            },
            error: (err) => {
                console.error('Update failed', err);
                alert('Failed to update crop details.');
            }
        });
    }
}
