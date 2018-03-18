import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class Api {

  url: string = 'http://codicilabs.com/trabajos/tuteur/api/';
  
  constructor(
    private http: Http,
    public plt: Platform,
    private storage: Storage,
    public loadingCtrl: LoadingController
    ) {
    
  }

  
  getJson(){
    this.http.get(this.url).map(res => res.json()).subscribe(data => {
        console.log('Recibiendo json');
        this.storage.set('categorias', data); 
    });
  }
 
}