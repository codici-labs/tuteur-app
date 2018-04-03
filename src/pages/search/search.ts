import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
	products: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams
		) {


		this.products = this.navParams.get('products');
		
	}

	viewProduct(product){
      this.navCtrl.push(ProductPage, {product: product, title: product.titulo});
    }

}
