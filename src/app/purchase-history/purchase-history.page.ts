import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.page.html',
  styleUrls: ['./purchase-history.page.scss'],
  standalone: false,
})
export class PurchaseHistoryPage implements OnInit {

  constructor() { }

  orderHistory: any[] = [];

  ngOnInit() {

    this.fetchOrderHistory();

  }

  goBack() {
    window.history.back();
  }

  fetchOrderHistory() {
    firebase.database().ref(`purchase/${localStorage.getItem("test_uid")}/`).once("value")
      .then(snapshot => {
        const data = snapshot.val()
        if (data) {
          this.orderHistory = Object.entries(data).map(([key, data]: any) =>
          ({
            orderId: key,
            ...data
          }))
        } else {
          this.orderHistory = []
        }
        console.log(this.orderHistory);

      }).catch(Error => {
        console.error("error while fetch Order History" + Error)
      })
  }

  getOriginalPrice(price: number): string {
    if (!price) return '';
    return (price * 1.33).toFixed(2);
  }

  getTotal(order: any) {
    return order.productList.reduce((total: number, item: any) => (total + parseFloat(item['price']) * item['quantity']), 19.08)
  }

  getItemCount(order: any) {
    return order.productList.length
    // console.log();
    
  }

}
