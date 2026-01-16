import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.scss']
})
export class WelcomepageComponent implements OnInit, OnDestroy {

  // Slider configuration
  currentSlide = 0;
  autoSlideInterval: any;

  slides = [
    {
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80',
      title: 'Fresh Organic Produce',
      subtitle: 'Connect directly with farmers for the freshest crops',
      cta: 'Start Shopping',
      ctaAction: 'buy'
    },
    {
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=80',
      title: 'Farm to Table Excellence',
      subtitle: 'Quality crops delivered with transparency and trust',
      cta: 'Join Us',
      ctaAction: 'register'
    },
    {
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1600&q=80',
      title: 'Empowering Farmers',
      subtitle: 'Get the best prices for your harvest',
      cta: 'Join as Farmer',
      ctaAction: 'register'
    },
    {
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1600&q=80',
      title: 'Premium Quality Crops',
      subtitle: 'Browse thousands of fresh agricultural products',
      cta: 'Explore Now',
      ctaAction: 'buy'
    }
  ];

  // Statistics data
  stats = [
    { number: '5000+', label: 'Active Farmers', icon: 'bi-people-fill' },
    { number: '10000+', label: 'Happy Dealers', icon: 'bi-shop' },
    { number: '50000+', label: 'Transactions', icon: 'bi-graph-up-arrow' },
    { number: '99%', label: 'Satisfaction', icon: 'bi-star-fill' }
  ];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  handleNavigation(action: string): void {
    if (localStorage.getItem('token')) {
      // User is logged in
      switch (action) {
        case 'sell':
          this.router.navigate(['/Farmer/PostCrop']);
          break;
        case 'buy':
          this.router.navigate(['/Farmer/GetCrop']);
          break;
        case 'invoice':
          this.router.navigate(['/Invoice']);
          break;
        case 'register':
          this.router.navigate(['/Dealer/GetCrop']);
          break;
        default:
          break;
      }
    } else {
      // User is not logged in, redirect to login unless action is register
      if (action === 'register') {
        this.router.navigate(['/Register']);
      } else {
        this.router.navigate(['/Login']);
      }
    }
  }

  // ... rest of the component ...

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.stopAutoSlide();
    this.startAutoSlide(); // Restart auto-slide after manual navigation
  }
}

