import { Component, OnInit } from '@angular/core';
import {IonInput} from "@ionic/angular";
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
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register(email: IonInput, password: IonInput) {
    this.authService.register(email.value as string, password.value as string)
      .then(() => {
        this.router.navigate(['collections'])
      }).catch((error) => {
      window.alert(error.message)
    })
  }

  goBack() {
    this.router.navigate(['login'])
  }
}
