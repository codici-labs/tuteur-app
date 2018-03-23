import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
	product: any;
	image: any;
	dataurl: string;
	cordova: any;
	portadaDataUrl: string;
	title: string = '';
	
	constructor(
		public navCtrl: NavController, 
		public params: NavParams,
		public api: Api,
		public file: File,
		public toast: ToastController
		) {
		this.product = this.params.get('product');
		this.title = this.params.get('title');
		//this.image = this.cordova.file.dataDirectory+this.product.imagen+ '&date=' + new Date().getTime();
		this.transformarDataUrl(this.product.imagen);
		this.transformarPortadaDataUrl(this.product.portada);

		this.toast.create({
		    message: this.product.imagen,
		    duration: 3000,
		    position: 'top'
		  });
		console.log(this.dataurl);
		//console.log(this.api.imageDirectory+this.product.imagen);
	}


	transformarDataUrl(imageName)
	  {
	  	
	    this.file.readAsDataURL(this.file.dataDirectory, imageName).then(dataurl => {
	      this.dataurl = dataurl;
	    },
	  (error) =>{
	  	console.log(error);	    
	  });
	}
	
	transformarPortadaDataUrl(imageName)
	  {
	  	
	    this.file.readAsDataURL(this.file.dataDirectory, imageName).then(dataurl => {
	      this.portadaDataUrl = dataurl;
	    },
	  (error) =>{
	  	console.log(error);	    
	  });
	}

}
