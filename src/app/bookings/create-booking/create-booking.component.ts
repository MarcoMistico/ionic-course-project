import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f') form: NgForm;

  availableFrom = '';
  availableTo = '';
  availableFromDate: Date;


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if (this.selectedMode === 'random') {
      this.availableFrom = this.formatDate(
        new Date(
          availableFrom.getTime() +
          Math.random() *
          (availableTo.getTime() - 7 *24 * 60 * 60 * 1000 - availableFrom.getTime())
        ).toISOString()
      );

      this.availableTo = this.formatDate(
        new Date(
          new Date(this.availableFrom).getTime() +
          Math.random() *
          (new Date(this.availableFrom).getTime() + 6 * 24 * 60 * 60 * 1000 - new Date(this.availableFrom).getTime())
        ).toISOString()
      );
      }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  formatDate(value: string) {
    if (value.length === 0) {
      return;
    }
    return format(parseISO(value), 'MMM dd yyyy');
  }

  onAvailableFromChange(value: string) {
    this.availableFrom = this.formatDate(value);
    this.availableFromDate = parseISO(value);
  }

  onBookPlace() {
    if (!this.form.valid || !this.datesValid()) {
      return;
    }

    this.modalCtrl.dismiss({
      bookingData: {
        firstName: this.form.value['first-name'],
        lastName: this.form.value['last-name'],
        guestNumber: this.form.value['guest-number'],
        startDate: this.availableFrom,
        endDate: this.availableTo
      }
    }, 'confirm');
  }

  datesValid() {
    const startDate = new Date(this.availableFrom);
    const endDate = new Date(this.availableTo);
    return endDate > startDate;
  }
}
