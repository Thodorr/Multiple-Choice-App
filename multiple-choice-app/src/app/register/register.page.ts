import { Component, OnInit } from '@angular/core';
import {IonInput, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  register(email: IonInput, password: IonInput) {
    this.authService.register(email.value as string, password.value as string)
      .then(async (message: any) => {
        let errorMessage = message.code
        switch (message.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid email adresse'
            break
          case 'auth/weak-password':
            errorMessage = 'The Password must be at least 6 characters long'
            break
          case 'auth/internal-error':
            errorMessage = 'Invalid input'
            break
        }
        if (errorMessage !== null && errorMessage !== undefined) {
          const toast = await this.toastController.create({
            message: errorMessage,
            duration: 1500,
            position: "bottom"
          });
          await toast.present();
        } else {
          this.router.navigate(['collections'])
        }
      }).catch(async (error) => {
        window.alert(error.message)
    })
  }

  goBack() {
    this.router.navigate(['login'])
  }
}
