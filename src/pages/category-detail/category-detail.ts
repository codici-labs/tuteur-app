import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {

	products: any;
	title: string = '';

	constructor(
		public navCtrl: NavController, 
		public params: NavParams
		) {

		this.title = this.params.get('title');
		this.products = this.params.get('products');
	}

	

}
