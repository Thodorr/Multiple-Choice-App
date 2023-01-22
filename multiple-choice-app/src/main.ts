import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from "firebase/app";

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvJPzHgga6mMcXZWkXyAYZkABDP26xctc",
  authDomain: "multiple-choice-app-2a46f.firebaseapp.com",
  projectId: "multiple-choice-app-2a46f",
  storageBucket: "multiple-choice-app-2a46f.appspot.com",
  messagingSenderId: "653265941362",
  appId: "1:653265941362:web:656bee2b48f403882523eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
