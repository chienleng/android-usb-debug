import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Serial } from '@ionic-native/serial';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private serial: Serial) {
  }

  open() {
    this.serial.requestPermission().then(() => {
      this.serial.open({
        baudRate: 9800,
        dataBits: 4,
        stopBits: 1,
        parity: 0,
        dtr: true,
        rts: true,
        sleepOnPause: false
      }).then(() => {
        this.presentToast('Serial connection opened');
      });
    }).catch((error: any) => this.presentToast(error));
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
