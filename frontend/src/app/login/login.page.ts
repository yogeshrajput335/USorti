import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  loading: LoadingController;
  registerCredentials = { email: '', password: '' };
  constructor(private nav: NavController, private auth: AuthService,
     private alertController: AlertController, private loadingCtrl: LoadingController) { }

  public createAccount() {
    this.nav.navigateForward('/register');
  }

  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        this.nav.navigateForward('/home');
      } else {
        this.showError('Access Denied');
      }
    },
      error => {
        this.showError(error);
      });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }

  async showError(text) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }
}
