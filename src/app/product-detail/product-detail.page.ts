import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false,
})
export class ProductDetailPage implements OnInit {
  id = "";
  modalPurpose: 'cart' | 'buy' = 'cart'

  products: any[] = [{ describe: 'Elevate your casual wardrobe with our Loose Fit Printed T-shirt. Crafted from premium cotton for maximum comfort, this relaxed-hit tee features.' }];
  isModalOpen: boolean = false;
  quantity:number = 0;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private nav: NavController) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(res => {
      this.id = res['productid']
      this.fetchProductsFromFirebase()
    })
  }

  fetchProductsFromFirebase() {
    firebase.database().ref('product/' + this.id).once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          this.products = [{ ...data, describe: this.products[0].describe }];
          // Object.entries(snapshot.val() || {}).filter((a: any) => {
          //   this.products.push({ ...a[1], id: a[0] })
          // })
          console.log(this.products);
        } else {
          console.log('No product data found.');
        }
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }
  goBack() {
    window.history.back();
  }

  viewCart() {
    this.nav.navigateForward("cart")
  }

  openModal(purpose: 'cart' | 'buy') {
    this.quantity = 1;
    this.modalPurpose = purpose;
    this.isModalOpen = true;
  }

  handleAction() {
    if (this.modalPurpose === "cart") {
      // this.addToCart();
      this.isModalOpen = false;
      console.log('cart');
      
    }
    else {
      this.isModalOpen = false;
      console.log('buy');
      
    }
  }

  quantityManipulating(number:number)
  {
    let newQuantity = this.quantity + number
    this.quantity = newQuantity>=1? newQuantity:0
  }

  addToCart() {
    let firebasePath = 'mkUsers/' + (localStorage.getItem("test_uid") || "") + "/cart/" + this.id;
    firebase
      .database()
      .ref(firebasePath)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          const existingQuantity = snapshot.val().quantity || 0;
          firebase.
            database()
            .ref(firebasePath)
            .update(
              ({ quantity: existingQuantity + 1 })
            )
        }
        else {
          firebase
            .database()
            .ref(firebasePath)
            .set({ quantity: 1 })
          // .then((data) => { console.log(data) }
        }
      })

  }




}