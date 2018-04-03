import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CategoryDetailPage } from '../category-detail/category-detail';
import { SearchPage } from '../search/search';
import { Api } from '../../providers/api';


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
  	private api: Api,
  	public loadingCtrl: LoadingController
  	) {

  	
        
  	this.storage.get('categorias').then((val) => {
      
	   	/*if(val.version < this.version){
	   		this.text = 'Hay disponible una version nueva.';
	   		this.version = this.version++;
	   		this.categorias = val;
	   	}*/
	   	this.categorias = val;
	   });
       
    }


    getItems(event){
      var products = [];
      var filterProducts = [];
      var val = event.target.value;

      for (let category of this.categorias) {
          for (let product of category.products) {
            products.push(product.droga);
            products.push(product.marca);
            
          }
          
        }
     

      if (val && val.trim() != '') {

        for(var i=0; i < products.length; i++){
          console.log(products[i]);
            if(products[i].match('/'+val+'/') > -1){
              console.log(products[i]);
               filterProducts.push(products[i]); 
            }
        }

        

        this.navCtrl.push(SearchPage, {products: filterProducts});
      }



    }

    viewProducts(products, title){
      this.navCtrl.push(CategoryDetailPage, {products: products, title: title});
    }

  }