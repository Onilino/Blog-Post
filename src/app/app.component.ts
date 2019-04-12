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
      apiKey: "AIzaSyA3IsaT_8CTTKVGuXkiAXAjEzFWNvQZHTs",
      authDomain: "myocproject.firebaseapp.com",
      databaseURL: "https://myocproject.firebaseio.com",
      projectId: "myocproject",
      storageBucket: "myocproject.appspot.com",
      messagingSenderId: "400434845430"
    };
    firebase.initializeApp(config);
  }

}
