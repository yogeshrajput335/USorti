import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {

  createSuccess = false;
  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController, private auth: AuthService, private alertController: AlertController) { }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup('Success', 'Account created.');
      } else {
        this.showPopup('Error', 'Problem creating account.');
      }
    },
      error => {
        this.showPopup('Error', error);
      });
  }

  async showPopup(title, text) {

    const alert = await this.alertController.create({
      header: title,
      message: text,
      buttons: [{
        text: 'OK',
        handler: data => {
          if (this.createSuccess) {
            this.nav.navigateForward('/login');
          }
        }
      }]
    });
    return await alert.present();
  }

}
