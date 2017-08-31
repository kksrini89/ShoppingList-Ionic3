import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  shoppingItem = {} as ShoppingItem;

  shoppingRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private ngFirebasedb: AngularFireDatabase) {
    this.shoppingRef$ = this.ngFirebasedb.list('shopping-list');
  }

  addShoppingItem(item: ShoppingItem) {
    if (item !== null && item !== undefined) {
      if (item.itemName !== '' && item.itemName !== null && item.itemName !== undefined &&
        item.itemNumber !== null && item.itemNumber !== undefined) {
        this.shoppingRef$.push({
          itemName: item.itemName,
          itemNumber: Number(item.itemNumber)
        });
      }
      this.shoppingItem = {} as ShoppingItem;
      this.navCtrl.pop();
    }
  }

}
