import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	version: number;
	text: string;
	categorias: any;

  constructor(
  	public navCtrl: NavController,
  	private http: Http,
  	public plt: Platform,
  	private storage: Storage,
  	public loadingCtrl: LoadingController
  	) {

  	let loader = this.loadingCtrl.create({
      content: "Comprobando actualizacion...",
      duration: 3000
    });
    loader.present();
  	
        
  	this.storage.get('categorias').then((val) => {
	   	/*if(val.version < this.version){
	   		this.text = 'Hay disponible una version nueva.';
	   		this.version = this.version++;
	   		this.categorias = val;
	   	}*/
	   	this.categorias = val;
	   });
       
    }
  }