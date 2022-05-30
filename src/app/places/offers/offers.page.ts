import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  offers: Place[] = [];

  constructor(
    private placesService: PlacesService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getOffers();
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['./', 'places', 'tabs', 'offers', 'edit-offer', offerId]);
  }

  onDelete(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.placesService.deletePlace(offerId);
    this.getOffers();
  }

  private getOffers() {
    this.offers = this.placesService.places;
  }
}
