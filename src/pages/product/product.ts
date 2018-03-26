import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
	product: any;
	image: any;
	dataurl: string = 'assets/imgs/loader.gif';
	cordova: any;
	portadaDataUrl: string = 'assets/imgs/header-seccion.png';
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
		
		this.transformarDataUrl(this.product.imagen);
		this.transformarPortadaDataUrl(this.product.portada);

		this.toast.create({
		    message: this.product.imagen,
		    duration: 3000,
		    position: 'top'
		  });
		
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
	  	var portada = '';

	  	if(imageName != ''){
	  		portada = imageName;
	  	}else{
	  		portada = this.title.toLowerCase()+'.png';
	  	}
	  	
	    this.file.readAsDataURL(this.file.dataDirectory, portada).then(dataurl => {
	      this.portadaDataUrl = dataurl;
	    },
		(error) =>{
		  	console.log(error);	    
		});
	}

}
