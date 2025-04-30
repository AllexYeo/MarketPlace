import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import firebase from 'firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  searchQuery: string = "";
  products: any[] = [];
  fullProductList: any[] = [];

  constructor(private nav: NavController, private authService:AuthService) { }

  ngOnInit() {
    this.fetchProductsFromFirebase();
  }

  fetchProductsFromFirebase() {
    firebase.database().ref('product/').once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          // const data = snapshot.val();
          // this.fullProductList = Object.values({ ...data });
          // this.products = [...this.fullProductList];

          Object.entries(snapshot.val() || {}).filter((a: any) => {
            this.products.push({ ...a[1], id: a[0] })
          })
          console.log(this.products);
        } else {
          console.log('No product data found.');
        }
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }

  getOriginalPrice(price: number): string {
    if (!price) return '';
    return (price * 1.33).toFixed(2);
  }

  stories = [
    { username: 'pants', avatar: 'assets/pants.jpg' },
    { username: 'clothes', avatar: 'assets/cloth.jpg' },
    { username: 'jacket', avatar: 'assets/jacket.jpg' },
    { username: 'skirt', avatar: 'assets/skirt.jpg' },

  ]

  viewProduct( key: any) {

    this.nav.navigateForward(`product-detail?productid=${key}`)
    // similar to this.nav.navigateForward('product-detail?id=' + key)
  }

  viewCart()
  {
    this.nav.navigateForward('cart')  
  }

}

// filterProducts() {
//   console.log(this.priceD)
//   console.log(this.priceD?.['min'])
//   let holder = JSON.parse(JSON.stringify(this.Products))
//   let x = (holder || []).filter((a: any) => (a['name'].toLowerCase().includes(this.searchText.toLowerCase()) &&
//     a['category'].toLowerCase().includes((this.categoryC || "").toLowerCase())
//     && (this.lengthof(this.priceD) ? (parseFloat(a['price']) <= this.priceD?.['max'] && parseFloat(a['price']) > this.priceD?.['min']) : true)
//   ))

//   this.filteredProducts = x
//   console.log(x)
//   }
