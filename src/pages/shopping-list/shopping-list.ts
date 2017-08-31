import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, private actionsheetCtrl: ActionSheetController,
    public navParams: NavParams, private database: AngularFireDatabase) {
    this.shoppingListRef$ = this.database.list('shopping-list');
  }

  selectedItem(shoppingItem: ShoppingItem) {
    this.actionsheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            console.log('You clicked on Edit button');
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.shoppingListRef$.remove(shoppingItem.$key);
            // console.log('Destructive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).present();
  }

  addShopping() {
    this.navCtrl.push('AddShoppingPage');
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ShoppingListPage');
  // }

}
