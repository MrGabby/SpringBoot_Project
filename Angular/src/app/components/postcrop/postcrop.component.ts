import { Component, OnInit } from '@angular/core';
import { crop } from 'src/app/models/crop.model';
import { CropService } from 'src/app/services/crop.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postcrop',
  templateUrl: './postcrop.component.html',
  styleUrls: ['./postcrop.component.scss']
})
export class PostcropComponent implements OnInit {

  croptype: any = ['Fruits', 'Vegetables', 'Pulses']

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

  selectedFile?: File;

  constructor(
    private cropService: CropService,
    private notification: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  CropPost() {
    this.cropService.addCrop(this.c, this.selectedFile).subscribe({
      next: (res) => {
        this.notification.success('Crop published successfully!', 'Harvest Shared!');
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        this.notification.error('Failed to publish crop. Please check your data.', 'Retry?');
      }
    })
  }

  resetForm() {
    this.c = {
      crop_name: '',
      crop_family: '',
      crop_type: '',
      cropDetailid: 0,
      quantity: 0,
      price: 0,
      cropDetail_description: '',
      location: ''
    };
    this.selectedFile = undefined;
    // For the file input, we might need a template reference if we want to clear it physically, 
    // but resetting the property is usually enough for the logic.
  }
}
