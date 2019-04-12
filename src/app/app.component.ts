import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'my-blog-app';

  constructor() {
    var config = {
      apiKey: "AIzaSyCitY--DaULyiZpwToPVLujWJpzgDbCrMw",
      authDomain: "blog-post-f25bc.firebaseapp.com",
      databaseURL: "https://blog-post-f25bc.firebaseio.com",
      projectId: "blog-post-f25bc",
      storageBucket: "blog-post-f25bc.appspot.com",
      messagingSenderId: "1022127828862"
    };
    firebase.initializeApp(config);
  }

}
