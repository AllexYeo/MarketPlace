import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { registerDispatcher } from '@angular/core/event_dispatcher.d-DlbccpYq';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: false,

})
export class CheckoutPage implements OnInit {

  cartItem: any;
  personalInfo: { name?: string, email?: string, address?: string, phoneNum?: number } = {};
  placed_order: { productID?: String, quantity?: number }[] = [];
  checkoutSuccess: boolean = false;


  constructor(private location: Location, private route: NavController) { }

  ngOnInit() {

    const navigationState = history.state;
    if (navigationState && navigationState.cartItem) {
      this.cartItem = [...navigationState.cartItem]
    }
    this.fetchUserInfo();
  }

  getOriginalPrice(price: number): string {
    if (!price) return '';
    return (price * 1.33).toFixed(2);
  }

  fetchUserInfo() {
    firebase.
      database().
      ref('mkUsers/' + (localStorage.getItem("test_uid") || "") + "/personalInfo/").
      once("value")
      .then(snapshot => {
        const data = snapshot.val() || {};
        this.personalInfo = data
      })
      .catch((error) => {
        console.error("error while fetching user Info" + error)
      })
  }

  goBack() {
    window.history.back();
  }

  getMerchandiseTotal() {
    return (this.cartItem || []).reduce((a: number, b: { [x: string]: number; }) => (a + (b['price'] * b['quantity'])), 0)
  }

  getTotal() {
    return this.getMerchandiseTotal() + 18 + 1.08
  }

  placeOrder() {
    let current = Date.now();
    let now = new Date(current);
    let formatted = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes()
        .toString()
        .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    // this.placed_order = this.cartItem.reduce((acc: any, item: { id: any; quantity: any }) => {
    //   acc[item.id] = {
    //     quantity: item.quantity
    //   };
    //   return acc;
    // }, {});

    // console.log(this.placed_order);

    let newPurchaseRef = firebase.database().ref("purchase/" + localStorage.getItem("test_uid") + "/").push();
    newPurchaseRef.set({
      date: formatted,
      productList: this.cartItem,
      personalInfo: this.personalInfo
    }).then(() => {
      this.checkoutSuccess = true;
      this.cartItem.forEach((item:any) => {
        this.removeFromCart(item.id);
      });
      setTimeout(() => {
        this.checkoutSuccess = false;
        this.route.navigateForward('')
      }, 2000);
    }
    )
  }

  removeFromCart(id: number) {
    firebase.database().ref("mkUsers/" + localStorage.getItem("test_uid") + "/cart/" + id).remove()
      .then(() => {
        console.log(`item ${id} has been deleted`);
      })
      .catch(error => 
      {
        console.error("error while removing cart Item from firebase", error);
      }
      )
  }
}
