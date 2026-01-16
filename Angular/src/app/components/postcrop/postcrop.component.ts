import { Component } from '@angular/core';
import { crop } from 'src/app/models/crop.model';
import { CropService } from 'src/app/services/crop.service';

import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-postcrop',
  templateUrl: './postcrop.component.html',
  styleUrls: ['./postcrop.component.scss']
})
export class PostcropComponent {



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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  CropPost() {
    this.cropService.addCrop(this.c, this.selectedFile).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        alert("Failed to add crop");
      }
    })
  }

  constructor(private cropService: CropService) { }

  ngOnInit(): void {

  }



}
