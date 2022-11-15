import { Component } from '@angular/core';
import { AlertController, RefresherCustomEvent, ToastController } from '@ionic/angular';

import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  shoppingList = JSON.parse(localStorage.getItem('items')) || [];
  constructor(private alertController: AlertController,
    private toastController: ToastController) {}

  async addItem(){
    const alert = await this.alertController.create({
      header: 'Neues Element hinzufügen',
      buttons: [{
        text: 'Hinzufügen',
        handler: (textfields) => {
          this.shoppingList.push(textfields[0]);
          this.save();
        }
      }],
      inputs: [
        {
          placeholder: 'Neues Element',
        }
      ],
    });

    await alert.present();
  }


  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  deleteItem(i) {
    this.shoppingList.splice(i, 1);
    this.save();
    this.presentToast('Element gelöscht!'); 
  }

  save(){
    this.presentToast('Das Element wurde hinzugefügt!');
    let itemsAsText = JSON.stringify(this.shoppingList);
    localStorage.setItem('items', itemsAsText);
  }

}
