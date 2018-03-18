import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { Api } from '../providers/api';
@Component({
  templateUrl: 'app.html',
  providers:  [
    Api
  ]

})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild(Nav) nav: Nav;


  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private http: Http,
    private storage: Storage,
    private api: Api
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.api.getJson();

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
