import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form: FormGroup;

  availableFrom = '';
  availableTo = '';

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      from: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      to: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form);
  }

}
