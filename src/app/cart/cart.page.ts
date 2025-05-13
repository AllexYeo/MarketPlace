import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, TitleStrategy } from '@angular/router';
import { ProductService } from '../product.service';
import { EventInfoWrapper } from '@angular/core/event_dispatcher.d-DlbccpYq';
import { __addDisposableResource } from 'tslib';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})

export class CartPage implements OnInit {



  constructor(private nav: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, private productService: ProductService) { }

  ngOnInit() {

    this.firebasePath = 'mkUsers/' + (localStorage.getItem("test_uid") || "") + "/cart/";
    this.fetchItem(this.firebasePath);
    // this.displayAlluserCart();


  }


  cart_item_list: { id: string; quantity: number }[] = [];
  display_item: any[] = [];
  isAllSelected: boolean = false;
  tempCartList: any[] = [];
  firebasePath = "";
  commulative_price = 0;


  goBack() {
    window.history.back();
  }

  fetchItem(path: string) {
    firebase
      .database()
      .ref(path)
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val() || {};
        Object.entries(data).forEach(([id, item]: any) => {
          this.cart_item_list.push({ id: id, quantity: item.quantity });
        });

        console.log(this.cart_item_list);
        this.displayCartItem();
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }

  displayCartItem() {
    this.cart_item_list.forEach((item) => {
      const product = this.productService.product_list.find(product => product.id === item.id);

      if (product) {
        const productWithQuantity = { ...product, quantity: item.quantity };
        this.display_item.push(productWithQuantity);
      }
    });
    console.log(this.display_item);

  }

  getOriginalPrice(price: number): string {
    if (!price) return '';
    return (price * 1.33).toFixed(2);
  }

  addtoCheckOut(item: any) {
    const existingItemIndex = this.tempCartList.findIndex(tempItem => tempItem.id === item.id);

    if (existingItemIndex !== -1) {
      this.tempCartList.splice(existingItemIndex, 1);
      this.commulative_price -= parseFloat(item.price) * item.quantity;
    } else {
      this.tempCartList.push(item);
      this.commulative_price += parseFloat(item.price) * item.quantity;
    }

    // console.log('Selected items:', this.tempCartList);
    // console.log('Cumulative price:', this.commulative_price);
    this.isAllSelected = this.tempCartList.length === this.display_item.length;
  }

  getTotal() {
    return (this.tempCartList || []).reduce((a, b) => (a + (b['quantity'] * parseFloat(b['price']))), 0)
  }

  QuantityManipulating(item: any, number: number, event: Event) {
    event.stopPropagation();

    let newQuantity = item.quantity + number;
    item.quantity = newQuantity >= 0 ? newQuantity : 0;
  }

  check(item: any) {
    return this.tempCartList.some(tempItem => tempItem.id === item.id)
  }

  toggleAllSelection(event: any) {
    const checked = event.detail.checked;

    // console.log(this.isAllSelected)
    if (checked) {
      this.display_item.forEach(item => {
        if (!this.tempCartList.some(tempItem => tempItem.id === item.id)) {
          this.tempCartList.push(item);
        }
      });
    } else {
      this.tempCartList = [];
    }
    this.commulative_price = this.getTotal();
    this.isAllSelected = this.tempCartList.length === this.display_item.length;
  }

  deleteItem(id: any, event: Event) {
    event.stopPropagation();

    this.tempCartList = this.tempCartList.filter(temp => temp.id !== id);
    this.display_item = this.display_item.filter(disp => disp.id !== id);

    this.commulative_price = this.getTotal();

    firebase
      .database()
      .ref(this.firebasePath + id)
      .remove()
      .then(() => {
        console.log('Deleted from Firebase:');
        // this.reloadDisplayItems();
      })
      .catch(error => {
        console.log("Error deletig:", error);
      })
  }

  NavigateToCheckOut() {
    this.nav.navigate(['/checkout'], {
      state: { cartItem: this.tempCartList }
    });

    //add event handler when user select nothing

  }

  AllCartId: any = []


  displayAlluserCart() {
    firebase.database().ref("mkUsers").once("value").then((snapshot) => {
      Object.values(snapshot.val()).forEach((row: any) => {
        console.log(Object.values(row.cart));

        Object.entries(row.cart).forEach(([id, value]: any) => {

          let exist = this.AllCartId.find((item: any) => item[0] === id) 
          if (exist) {
            exist[1] += value.quantity;
          } else {
            this.AllCartId.push([id, value.quantity]);
          }
        })  

      })
    })
    console.log("allCartID:", this.AllCartId)
  }
}


