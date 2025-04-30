import { Component } from '@angular/core';
import firebase from 'firebase'
import { firebaseConfig } from './app.firebase.config';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  constructor(private authService: AuthService, private productService: ProductService) {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user?.uid)
      localStorage.setItem("test_uid", user?.['uid'] || "")
    })

    // this.fetchUserId();
    this.fetchProductsFromFirebase();
  }
  uid = localStorage.getItem("test_uid") || ""
  async fetchUserId() {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(
        "allex8213416@gmail.com",
        "123123"
      );
      const uid = userCredential.user?.uid;
      console.log("User UID:", uid);
      this.authService.uid = uid ?? '';
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  fetchProductsFromFirebase() {
    firebase.database().ref('product/').once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          // const data = snapshot.val();
          // this.fullProductList = Object.values({ ...data });
          // this.products = [...this.fullProductList];

          Object.entries(snapshot.val() || {}).filter((a: any) => {
            this.productService.product_list.push({ ...a[1], id: a[0] })
          })
          console.log(this.productService.product_list);
        } else {
          console.log('No product data found.');
        }
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }
}


