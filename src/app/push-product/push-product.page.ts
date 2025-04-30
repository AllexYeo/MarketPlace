import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-push-product',
  templateUrl: './push-product.page.html',
  styleUrls: ['./push-product.page.scss'],
  standalone:false,
})
export class PushProductPage implements OnInit {
  productID: string = ''
  name: string = '';
  category: string = '';
  price: string = '';
  rating: string = '';
  brand: string = '';
  ratingCount: string = '';
  picture: string = '';

  product =
    [
      {
        productID: '4',
        name: 'Classic White T-Shirt',
        category: 'clothes',
        price: '$29.99',
        rating: '4.5',
        brand: 'SimpleWear',
        ratingCount: '124',
        picture: 'https://www.net-a-porter.com/variants/images/20346390235440631/in/w920_q80.jpg'
      },
      {
        productID: '5',
        name: 'Blue Denim Jacket',
        category: 'clothes',
        price: '$79.90',
        rating: '4.7',
        brand: 'DenimVibe',
        ratingCount: '87',
        picture: 'https://www.net-a-porter.com/variants/images/1647597357418036/in/w920_q60.jpg'
      },
      {
        productID: '6',
        name: 'Slim Fit Chinos',
        category: 'clothes',
        price: '$49.50',
        rating: '4.3',
        brand: 'UrbanFlex',
        ratingCount: '62',
        picture: 'https://www.net-a-porter.com/variants/images/1647597359660893/in/w920_q60.jpg'
      }
    ]

  constructor() { }

  ngOnInit() {
    this.product.forEach((item) => {
      firebase.database().ref('product/' + item.productID).set(item)
        .then(() => {
          console.log(`Product ${item.productID} uploaded successfully.`);
        })
        .catch((error) => {
          console.error(`Error uploading product ${item.productID}:`, error);
        });
    });
  }

}
