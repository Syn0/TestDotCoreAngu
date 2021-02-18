import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword(input: any, icon: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    icon.name = input.type === 'password' ? 'eye-off-outline' : 'eye-outline';
  }

  login: LoginModel;

  constructor(
    private authService: AuthService,
     private toastController: ToastController,
     private navController: NavController
     ) {

  }

  ngOnInit() {
    this.login = { email: "login@contoso.com",role: "ROLE_USER" } as LoginModel;
  }

  logme() {
    console.log("try login with:");
    console.log(this.login);
    this.authService.login(this.login)
      .subscribe(async (x) => {
        const toast = await this.toastController.create({
          message: `Authentication : ${x.success ? 'SUCCESS' : 'FAILED'}`,
          position: 'bottom',
          duration: 3000,
          cssClass: "text-center",
          color: x.success ? 'success' : 'danger'
        });
        toast.present();
        this.navController.navigateForward('tabs').then(x=>console.log(x));
      });
  }

}

export interface LoginModel {
  email: string;
  password: string;
  role: string;
}