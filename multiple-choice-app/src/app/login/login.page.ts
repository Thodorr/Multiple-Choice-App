import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {IonInput} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
  }

  logIn(email: IonInput, password: IonInput) {
    this.authService.login(email.value as string, password.value as string)
    .then(() => {
      this.router.navigate(['collections'])
    }).catch((error) => {
      window.alert(error.message)
    })
  }
}
