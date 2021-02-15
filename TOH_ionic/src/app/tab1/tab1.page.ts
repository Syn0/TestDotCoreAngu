import { Component } from '@angular/core';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  NgInit(){
  }
  constructor(public loadingController: LoadingController, public toastController: ToastController, private menu: MenuController) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentToastWithOptions(message: string) {
    const toast = await this.toastController.create({
      message: message,
      position: 'middle',
      duration: 3000,
      buttons: [
        {
          side: 'start',
          icon: 'trash',
          text: 'CONFIRM',
          handler: () => {
            console.log('Confirm clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
