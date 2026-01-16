import { Component, OnInit } from '@angular/core';
import { crop } from 'src/app/models/crop.model';
import { CropService } from 'src/app/services/crop.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import { invoice } from 'src/app/models/invoice.model';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-getcrop',
  templateUrl: './getcrop.component.html',
  styleUrls: ['./getcrop.component.scss']
})
export class GetcropComponent implements OnInit {
  crops: crop[] = [];
  isLoading = true;
  currentUser: any;
  searchTerm: string = '';
  sortBy: string = 'name'; // Default sort

  constructor(
    private cropService: CropService,
    private authService: AuthService,
    private router: Router,
    private invoiceService: InvoiceService,
    private cartService: CartService,
    private notification: NotificationService
  ) { }


  ngOnInit(): void {
    this.loadCrops();
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  get filteredAndSortedCrops(): crop[] {
    let result = this.crops.filter(c =>
      c.crop_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'name') {
      result.sort((a, b) => a.crop_name.localeCompare(b.crop_name));
    }

    return result;
  }

  get categories(): string[] {
    const types = this.filteredAndSortedCrops
      .map(c => c.crop_type)
      .filter((type): type is string => !!type);
    return Array.from(new Set(types)).sort();
  }

  getCropsByCategory(category: string): crop[] {
    return this.filteredAndSortedCrops.filter(c =>
      c.crop_type === category
    );
  }

  get otherCrops(): crop[] {
    const allCategories = this.categories; // Use the new categories getter
    return this.filteredAndSortedCrops.filter(c =>
      !c.crop_type || !allCategories.includes(c.crop_type)
    );
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

  getImageUrl(crop: crop): string {
    if (crop.imageUrl) {
      return `http://localhost:8080${crop.imageUrl}`;
    }
    // Reliable static images for common crops
    const imageMap: { [key: string]: string } = {
      'wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
      'rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
      'corn': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=80',
      'maize': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=80',
      'potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80',
      'tomato': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80',
      'onion': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&q=80',
      'apple': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80',
      'mango': 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80',
      'banana': 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&q=80',
      'grape': 'https://images.unsplash.com/photo-1537640538965-1756e9e43ea9?w=400&q=80',
      'fruit': 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80',
      'vegetable': 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&q=80'
    };

    const cropName = crop.crop_name.toLowerCase();

    for (const key in imageMap) {
      if (cropName.includes(key)) {
        return imageMap[key];
      }
    }

    if (crop.crop_type) {
      const typeLower = crop.crop_type.toLowerCase();
      if (imageMap[typeLower]) return imageMap[typeLower];
    }

    return 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80'; // Fallback
  }

  addToCart(crop: crop) {
    if (!this.currentUser) {
      this.router.navigate(['/Login']);
      return;
    }
    this.cartService.addToCart(crop);
  }

  buyCrop(crop: crop) {
    if (!this.currentUser) {
      this.router.navigate(['/Login']);
      return;
    }

    const newInvoice: invoice = {
      invoiceid: 0,
      userid: this.currentUser.userid,
      dealerid: this.currentUser.userid,
      total_amount: crop.price,
      total_items: 1,
      payment_mode: 'COD',
      status: 'Paid',
      date_created: new Date().toISOString(),
      items: [{
        id: 0,
        invoiceId: 0,
        crop_detailid: crop.cropDetailid,
        quantity: 1,
        price: crop.price,
        farmerid: 0, // Backend resolves this
        crop_Detail: {
          crop_detailid: crop.cropDetailid,
          crop_name: crop.crop_name,
          cropDetail_description: crop.cropDetail_description,
          crop_type: crop.crop_type,
          quantity: crop.quantity,
          price: crop.price,
          location: crop.location
        }
      }]
    };

    this.invoiceService.createInvoice(newInvoice).subscribe({
      next: (res) => {
        this.notification.success('Purchase successful! Your harvest is on its way.', 'Done!');
        this.router.navigate(['/Invoice']);
      },
      error: (err) => {
        console.error(err);
        this.notification.error('Something went wrong during the purchase.', 'Oops!');
      }
    });
  }
}


