import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { Subscription } from 'rxjs/Subscription';

import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';

@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  private shoppingItemId: string;
  private shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  public shoppingItem = {} as ShoppingItem;

  private shoppingItemSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase) {
    this.shoppingItemId = this.navParams.get('shoppingItemId');
    console.log(this.shoppingItemId);
    this.shoppingItemRef$ = this.database.object(`shopping-list/${this.shoppingItemId}`);
    this.shoppingItemSubscription = this.shoppingItemRef$.subscribe((item) => this.shoppingItem = item);
  }

  UpdateItem(item: ShoppingItem) {
    if (item != null && item != undefined) {
      this.shoppingItemRef$.update(item);
      this.shoppingItem = {} as ShoppingItem;
      this.navCtrl.pop();
    }
  }

  ionViewWillLeave() {
    this.shoppingItemSubscription.unsubscribe();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad EditShoppingItemPage');
  // }

}
