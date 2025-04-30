import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {

  searchQuery: string = "";
  products: any[] = [];
  fullProductList: any[] = [];

  shoes = [
    { name: "Nike", color: ["white", "black"], size: [8, 9, 10, 11, 12], price: 700 },
    { name: "Adidas", color: ["blue", "red", "white"], size: [10, 11, 12], price: 500 },
    { name: "NewBalance", color: ["white", "black", "blue"], size: [10, 11, 12, 13], price: 600 },
  ];

  testing = [1, 2, 3, 4, 5, 6]

  pants = [
    { name: "x", pair: ["red", "white"], price: 200 },
    { name: "y", pair: ["black"], price: 100 },
    { name: "z", pair: ["red", "white", "black", "blue"], price: 150 }
  ]


  categories = [
    { username: 'pants', avatar: 'assets/pants.jpg' },
    { username: 'clothes', avatar: 'assets/cloth.jpg' },
    { username: 'jacket', avatar: 'assets/jacket.jpg' },
    { username: 'skirt', avatar: 'assets/skirt.jpg' },
  ];


  findshoe() {

    let quota = 800;
    let selectedPairs: { shoe: string; pant: string; pantColor: string; }[]= [];


    for (let selectedShoe of this.shoes) {
      let remaining_Quota = quota - selectedShoe.price
      let selectedpant = [];
      let selected: string[] = [];
      for (let pant of this.pants) {
        if (pant.price <= remaining_Quota) {
          for (let paircolor of pant.pair) {
            for (let shoecolor of selectedShoe.color) {
              // if (paircolor == shoecolor && !selected.includes(pant.name)) {
              if (paircolor == shoecolor) {
                selectedpant.push({ name: pant.name, color: paircolor });
                // remaining_Quota -= pant.price
                // selected.push(pant.name)
                // console.log(selectedpant)
              }
            }
          }
        }
      }
      selectedpant.forEach(pant => {
        selectedPairs.push({
          shoe: selectedShoe.name,
          pant: pant.name,
          pantColor: pant.color
        });
      });
    }
    console.log(selectedPairs)
  }



  constructor() {
    this.findshoe()
  }

  ngOnInit() {
    this.fetchProductsFromFirebase();
  }

  goBack() {
    window.history.back();
  }

  fetchProductsFromFirebase() {
    firebase.database().ref('product/').once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          this.fullProductList = Object.values(data);
          this.products = [...this.fullProductList];
          console.log(this.products);
        } else {
          console.log('No product data found.');
        }
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }

  searchProducts() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.products = [...this.fullProductList];
      return;
    }

    this.products = this.fullProductList.filter(product =>
      product.name?.toLowerCase().includes(query)
    );
  }

  searchProductsBasedCategory(category: string) {
    const trimmedCategory = category.trim().toLowerCase();
    if (!trimmedCategory) {
      this.products = [...this.fullProductList];
      return;
    }

    this.products = this.fullProductList.filter(product =>
      product.category?.toLowerCase().includes(trimmedCategory)
    );

  }


}
