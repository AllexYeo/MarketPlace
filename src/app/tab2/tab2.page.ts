import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor(private nav: NavController) {

  }

  products = [
    { name: 'Women', Image: 'assets/Woman_Clothing/woman_category.jpg', brand: 'H&M', discounted_price: '$295.00', ori_price: '$550.00', rating: 4.9, rating_count: 125, describe: 'Elevate your casual wardrobe with our Loose Fit Printed T-shirt. Crafted from premium cotton for maximum comfort, this relaxed-hit tee features.' },
  ]

  viewCart() {
    this.nav.navigateForward('cart')
  }
  
  goBack() {
    window.history.back();
  }

}
