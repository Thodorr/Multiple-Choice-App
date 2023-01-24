import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {IonInput, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
  }

  logIn(email: IonInput, password: IonInput) {
    this.authService.login(email.value as string, password.value as string)
    .then(async (message: any) => {
      let errorMessage = message.code
      switch (message.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email adresse!'
          break
        case 'auth/weak-password':
          errorMessage = 'The Password must be at least 6 characters long'
          break
        case 'auth/internal-error':
          errorMessage = 'Invalid input'
          break
        case 'auth/wrong-password':
          errorMessage = 'Wrong input'
          break
        case 'auth/user-not-found':
          errorMessage = 'Wrong input'
          break
      }
      if (errorMessage !== null) {
        const toast = await this.toastController.create({
          message: errorMessage,
          duration: 1500,
          position: "bottom"
        });
        await toast.present();
      } else {
        this.router.navigate(['collections'])
      }
    }).catch((error) => {
      window.alert(error.message)
    })
  }
}
