import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { Api } from '../providers/api';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
@Component({
  templateUrl: 'app.html',
  providers:  [
    Api
  ]

})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild(Nav) nav: Nav;

  isOnApp: boolean = false;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private http: Http,
    private storage: Storage,
    private api: Api,
    private network: Network,
    private file: File,
    private toastCtrl: ToastController
    ) {
    platform.ready().then(() => {
      
      this.api.imageDirectory = this.file.dataDirectory;

      if(this.isConnected()){
        console.log('Hay internet');
        this.api.update();
      }
     

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  isConnected(): boolean {
    let conntype = this.network.type;
    return conntype && conntype !== 'unknown' && conntype !== 'none';
  }
}
