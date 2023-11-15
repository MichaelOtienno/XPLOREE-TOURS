import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Subscription } from 'rxjs';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy{

private scrollSubscription : Subscription | undefined

constructor(private scrollToService: ScrollService) {}


  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
scrollToFooter() {
  const footerElement = document.getElementById('footer');
  if (footerElement) {
    window.scrollTo({
      top: footerElement.offsetTop,
      behavior: 'smooth', 
    });
  }
}

ngOnInit() {
  this.selectRandomImage(this.imagePaths, 'ImagePath');
  this.selectRandomImage(this.maindestinationimagePaths, 'maindestinationImagePath');
  this.selectRandomImage(this.minordestinationimagePaths, 'minordestinationImagePath');
  this.selectRandomImage(this.recommendedimagePaths, 'recommendedImagePath');
  this.selectRandomImage(this.specialminorimagePaths, 'specialminorImagePath');
  this.selectRandomImage(this.specialmainimagePaths, 'specialmainImagePath');
  this.selectRandomImage(this.internationalimagePaths, 'internationalImagePath');

  this.scrollSubscription = this.scrollToService.getScrollObservable().subscribe(() => {
    this.scrollToFooter();
  });
}

selectRandomImage(imagePaths: string[], propertyName: string) {
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  (this as any)[propertyName] = imagePaths[randomIndex];
}



  ImagePath!: string;
  imagePaths: string[] =
   ['/assets/xploralanding.jpg',
  '/assets/xploralanding.jpg',
  '/assets/xploralanding.jpg',
  '/assets/xploralanding.jpg'];

  // Popular destination
  maindestinationImagePath!: string;
  maindestinationimagePaths: string[] =
  ['/assets/nakuru.jpg',
  '/assets/naivasha.jpg',
   '/assets/samburu.jpg',
    '/assets/leopard.jpg'];

  // Minor destination
  minordestinationImagePath!: string;
  minordestinationimagePaths: string[] =
  ['/assets/nakuru.jpg',
  '/assets/naivasha.jpg',
  '/assets/samburu.jpg',
  '/assets/leopard.jpg'];

  // Recommended packages
  recommendedImagePath!: string;
  recommendedimagePaths: string[] =
  ['/assets/nakuru.jpg',
  '/assets/naivasha.jpg',
   '/assets/samburu.jpg',
   '/assets/leopard.jpg'];


  // Special offers
  // Minor special offers
  specialminorImagePath!: string;
  specialminorimagePaths: string[] =
   ['/assets/.jpg',
   '/assets/chrismas.jpg',
    '/assets/chrismasg.jpg',
     '/assets/leopard.jpg'];

  // Main special offers
  specialmainImagePath!: string;
  specialmainimagePaths: string[] =
  ['/assets/chrismas.jpg',
  '/assets/chrismasg.jpg',
  '/assets/samburu.jpg',
   '/assets/leopard.jpg'];

  // International destination
  internationalImagePath!: string;
  internationalimagePaths: string[] =
  ['/assets/seychells.jpg',
  '/assets/mauritius.jpg',
  '/assets/southafrica.jpg',
  '/assets/dubai.jpg'];




}
